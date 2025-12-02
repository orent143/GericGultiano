# 🤖 AI Auto-Reply Email System Setup Guide

## Complete Automation Workflow
User submits contact form → Email goes to Gmail → AI bot reads it → AI generates reply → Gmail sends automatically

---

## ✅ STEP 1: EmailJS Setup (Contact Form → Gmail)

### 1.1 Install EmailJS Package

Your `package.json` has been configured. Now install EmailJS:

```bash
npm install @emailjs/browser
```

### 1.2 Get EmailJS Credentials

1. **Create Account**: Go to https://www.emailjs.com/
2. **Sign Up** (free tier available)
3. **Connect Gmail Service**:
   - Dashboard → **Email Services** → **Add Service**
   - Select **Gmail**
   - Click **Connect with Google**
   - Authorize EmailJS to access your Gmail
4. **Get Credentials** (needed for `App.vue`):
   - Go to **Email Services** → Find your Gmail service
   - Copy **Service ID** (format: `service_xxxxx`)
   - Go to **Account** → Settings
   - Copy **Public Key** (format: `xxxxxx`)

### 1.3 Create Email Template

1. Go to **Email Templates** → **Create New Template**
2. Configure as follows:

```
To Email: {{to_email}}
Subject: New Contact Form Submission - {{subject}}

HTML Body:
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2>New Message from Your Portfolio</h2>
  <p><strong>Name:</strong> {{from_name}}</p>
  <p><strong>Email:</strong> {{from_email}}</p>
  <p><strong>Subject:</strong> {{subject}}</p>
  <hr>
  <p><strong>Message:</strong></p>
  <p>{{message}}</p>
</div>
```

3. Copy the **Template ID** (format: `template_xxxxx`)

### 1.4 Update App.vue with Credentials

In `src/App.vue`, replace these values:

```javascript
// Line 8-10 in App.vue
const EMAILJS_SERVICE_ID = 'service_YOUR_SERVICE_ID'      // ← Paste your Service ID
const EMAILJS_TEMPLATE_ID = 'template_YOUR_TEMPLATE_ID'    // ← Paste your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'               // ← Paste your Public Key
```

**Example:**
```javascript
const EMAILJS_SERVICE_ID = 'service_a1b2c3d4e5f6g7h8'
const EMAILJS_TEMPLATE_ID = 'template_9i8j7k6l5m4n3o2p'
const EMAILJS_PUBLIC_KEY = '1a2b3c4d5e6f7g8h9i0j'
```

### 1.5 Test Your Contact Form

1. Save `App.vue`
2. Run your dev server: `npm run dev`
3. Fill out the contact form
4. Click "Send Message"
5. Check your Gmail inbox for the message

✅ **If you see an email in Gmail, Step 1 is complete!**

---

## 🤖 STEP 2: Google Apps Script Setup (AI Auto-Reply)

### 2.1 Create a Google Apps Script Project

1. Go to https://script.google.com/
2. Click **New Project** (top left)
3. Name it: `AI Auto Reply Bot`

### 2.2 Prepare Your Files

In your project structure, create these files:

**File 1: `Code.gs`** (Main automation script)
**File 2: `appsscript.json`** (Configuration file)

Copy the complete scripts from the sections below.

---

## 🔑 STEP 3: Get Gemini API Key

### 3.1 Enable Gemini API

1. In **Google Apps Script** → **Project Settings** (gear icon)
2. Click **Google Cloud Console** link
3. In Google Cloud Console:
   - Search for **"Generative Language API"**
   - Click **Enable**
4. Go to **Credentials** (left sidebar)
5. Click **Create Credentials** → **API Key**
6. Copy the API Key (format: `AIzaSy...`)

### 3.2 Set Up Apps Script Secrets

In Google Apps Script editor:

1. Create a new file → `ScriptProperties.gs`
2. Add this code:

```javascript
function setApiKey() {
  PropertiesService.getScriptProperties().setProperty('GEMINI_API_KEY', 'AIzaSy_YOUR_API_KEY_HERE');
}
```

3. Run `setApiKey()` function (click ▶ Run)
4. Authorize the script when prompted
5. Delete the `ScriptProperties.gs` file afterward (cleanup)

Now your API key is securely stored!

---

## 📝 STEP 4: Add the Auto-Reply Script

### 4.1 Copy `Code.gs` Script

In your Google Apps Script editor, replace everything in `Code.gs` with:

```javascript
// Gmail Auto-Reply with Gemini AI

const REPLY_LABEL = 'AI Auto-Replied'; // Label for replied emails
const SENDER_EMAIL = 'your-email@gmail.com'; // Your Gmail address
const GEMINI_MODEL = 'gemini-pro';

function autoReplyAI() {
  try {
    // Get the API key from script properties
    const API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    
    if (!API_KEY) {
      Logger.log('ERROR: API key not set. Run setApiKey() first.');
      return;
    }

    // Search for unread emails
    const threads = GmailApp.search('is:unread -label:' + REPLY_LABEL);
    
    if (threads.length === 0) {
      Logger.log('No new unread emails');
      return;
    }

    Logger.log('Found ' + threads.length + ' unread email(s)');

    // Create or get the AI Auto-Replied label
    let label = GmailApp.getUserLabelByName(REPLY_LABEL);
    if (!label) {
      label = GmailApp.createLabel(REPLY_LABEL);
    }

    // Process each unread email
    threads.forEach((thread, index) => {
      const message = thread.getMessages()[0];
      const emailBody = message.getPlainBody();
      const sender = message.getFrom();
      const subject = message.getSubject();
      
      Logger.log('Processing email ' + (index + 1) + ' from: ' + sender);

      // Generate AI reply
      const aiReply = generateAIReply(emailBody, API_KEY);
      
      if (aiReply && aiReply.length > 0) {
        // Send auto-reply
        try {
          GmailApp.sendEmail(
            sender,
            'Re: ' + subject,
            aiReply,
            {
              from: SENDER_EMAIL,
              replyTo: SENDER_EMAIL
            }
          );
          
          Logger.log('Sent AI reply to: ' + sender);
          
          // Mark as read and add label
          thread.markRead();
          thread.addLabel(label);
          
          // Optional: Archive the original email
          // thread.archive();
          
        } catch (emailError) {
          Logger.log('ERROR sending email to ' + sender + ': ' + emailError);
        }
      } else {
        Logger.log('Failed to generate AI reply for: ' + sender);
      }
      
      // Add a small delay to avoid rate limiting
      Utilities.sleep(1000);
    });

    Logger.log('Auto-reply process completed');

  } catch (error) {
    Logger.log('ERROR in autoReplyAI: ' + error.toString());
  }
}

function generateAIReply(emailBody, apiKey) {
  try {
    // Prepare the prompt
    const prompt = `You are a professional assistant. Write a brief, friendly, and professional reply to this customer inquiry. Keep it concise (2-3 sentences). Be helpful and courteous.

Customer Message:
${emailBody}

Your Reply:`;

    // Call Gemini API
    const url = 'https://generativelanguage.googleapis.com/v1/models/' + GEMINI_MODEL + ':generateContent';
    
    const payload = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200
      }
    };

    const options = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url + '?key=' + apiKey, options);
    const result = JSON.parse(response.getContentText());

    // Extract the generated text
    if (result.candidates && result.candidates.length > 0) {
      const reply = result.candidates[0].content.parts[0].text;
      return reply;
    } else if (result.error) {
      Logger.log('Gemini API Error: ' + result.error.message);
      return 'Thank you for reaching out! I will get back to you soon.'; // Fallback response
    }

    return null;

  } catch (error) {
    Logger.log('ERROR generating AI reply: ' + error.toString());
    return 'Thank you for reaching out! I will get back to you soon.'; // Fallback response
  }
}

// Test function - run this to verify everything works
function testAutoReply() {
  Logger.log('Testing auto-reply system...');
  
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ API key not set');
    return;
  }

  // Test Gemini API
  const testReply = generateAIReply('Hi, I am interested in your services. Can you tell me more?', apiKey);
  Logger.log('✅ Test reply: ' + testReply);
}
```

### 4.2 Update SENDER_EMAIL

Find this line in the script:
```javascript
const SENDER_EMAIL = 'your-email@gmail.com'; // Line 5
```

Replace with your Gmail address:
```javascript
const SENDER_EMAIL = 'orentgultiano11@gmail.com';
```

---

## ⏰ STEP 5: Create Automatic Triggers

### 5.1 Set Up Time-Based Trigger

1. In Google Apps Script, click the **Triggers** icon (⏰ clock icon on left)
2. Click **Create new trigger** (bottom right)
3. Configure:

| Setting | Value |
|---------|-------|
| Function | `autoReplyAI` |
| Deployment | Head |
| Event type | Time-driven |
| Frequency | Every 5 minutes (or Every 1 minute) |

4. Click **Save**
5. Authorize when prompted

**That's it!** Your script will now automatically check for new emails every 5 minutes and send AI replies.

---

## 🧪 STEP 6: Test Everything

### Test 1: Manual Test

1. In Google Apps Script, click ▶ **Run** (top)
2. Select `testAutoReply` function
3. Check **Execution log** for output

Expected output:
```
✅ Test reply: [AI generated response]
```

### Test 2: Send Test Email

1. Open your portfolio and send yourself a test message
2. Wait 1-2 minutes
3. Check your Gmail inbox for:
   - Your original email (received)
   - AI auto-reply from your account

### Test 3: Full Workflow

1. Contact form → Send message
2. Email arrives in Gmail inbox
3. Wait 5 minutes
4. AI auto-reply is sent back
5. Original email is labeled "AI Auto-Replied" and marked as read

---

## 🎯 Customization Options

### Option 1: Change Reply Frequency

In `Code.gs`, modify the trigger:
- Every 1 minute (faster, more API calls)
- Every 5 minutes (recommended)
- Every 10 minutes (less frequent)
- Every hour (minimal usage)

### Option 2: Customize AI Response Style

Edit the `prompt` in `generateAIReply()` function:

```javascript
// Current: Professional
const prompt = `You are a professional assistant...`

// Alternative: Friendly & Casual
const prompt = `You are a friendly assistant. Write a casual, warm, and helpful reply...`

// Alternative: Sales/Marketing
const prompt = `You are a sales representative. Write a persuasive, helpful reply that highlights our services...`
```

### Option 3: Add Auto-Archiving

Uncomment this line in `Code.gs` (line ~75):
```javascript
// thread.archive(); // Uncomment this
```

This will automatically archive emails after replying.

### Option 4: Only Reply to Certain Emails

Modify the search filter:
```javascript
// Current: All unread emails
const threads = GmailApp.search('is:unread -label:' + REPLY_LABEL);

// Alternative: Only from specific domain
const threads = GmailApp.search('is:unread from:@example.com -label:' + REPLY_LABEL);

// Alternative: Exclude specific keywords
const threads = GmailApp.search('is:unread -subject:"Invoice" -label:' + REPLY_LABEL);
```

---

## 🐛 Troubleshooting

### Problem: "API key not set"
**Solution**: Run the `setApiKey()` function with your actual API key

### Problem: "No new unread emails" but I sent a message
**Solution**: 
- Check your "AI Auto-Replied" label - emails may already be processed
- Wait 5 minutes for the trigger to run
- Check the Executions tab in Google Apps Script

### Problem: Emails are not being replied to
**Solution**:
1. Check Google Apps Script Executions (⏱️ icon)
2. Look for error messages
3. Verify the trigger is active (⏰ icon)
4. Run `testAutoReply()` manually to debug

### Problem: AI replies are generic/poor quality
**Solution**: Modify the `prompt` variable to better specify the reply tone:
```javascript
const prompt = `You are a [YOUR STYLE] assistant...`
```

---

## 📊 Monitoring & Logs

Check execution history:
1. Google Apps Script → **Executions** (⏱️ icon)
2. View real-time logs
3. See API usage and any errors

---

## 🚀 Next Steps

1. ✅ **Emails are sending?** Move to Step 2
2. ✅ **AI is auto-replying?** Customize responses
3. ✅ **Everything working?** Share your portfolio!

---

## 📞 Quick Reference

| Component | Purpose | Status |
|-----------|---------|--------|
| Vue.js Contact Form | Collect user messages | ✅ Integrated |
| EmailJS | Send to Gmail | ✅ Connected |
| Google Apps Script | Auto-reply automation | ⏳ Install |
| Gemini API | AI responses | ⏳ Setup |
| Triggers | Run on schedule | ⏳ Configure |

---

## 💡 Summary of Workflow

```
1. User fills contact form on portfolio
   ↓
2. EmailJS sends email to your Gmail
   ↓
3. Email arrives in your inbox (unread)
   ↓
4. Google Apps Script trigger runs (every 5 min)
   ↓
5. Script reads unread emails
   ↓
6. Gemini API generates professional reply
   ↓
7. Gmail auto-sends reply to sender
   ↓
8. Email marked as read + labeled "AI Auto-Replied"
```

---

**Happy automating! 🎉**
