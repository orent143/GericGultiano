# 🚀 Quick Setup Checklist

Follow these steps in order to set up the complete automation.

---

## Phase 1: EmailJS Setup (Vue.js → Gmail) ⏱️ 10 mins

### Step 1: Install EmailJS Package
```bash
npm install @emailjs/browser
```

### Step 2: Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up (free)
- Note: You'll need your Gmail password

### Step 3: Connect Gmail Service
1. In EmailJS Dashboard → **Email Services**
2. Click **Add Service** → Select **Gmail**
3. Click **Connect** and authorize your Gmail account
4. Copy and save:
   - **Service ID** (e.g., `service_a1b2c3d4`)
   - **Public Key** (e.g., `1a2b3c4d5e6f7g8h`)

### Step 4: Create Email Template
1. Go to **Email Templates** → **Create New Template**
2. Set:
   - **To Email**: `{{to_email}}`
   - **Subject**: `New Message from {{from_name}}`
3. Copy and save:
   - **Template ID** (e.g., `template_9i8j7k6l`)

### Step 5: Update App.vue (3 replacements)

In `src/App.vue`, find lines 8-10 and update:

```javascript
// Before:
const EMAILJS_SERVICE_ID = 'service_YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'template_YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

// After (example):
const EMAILJS_SERVICE_ID = 'service_a1b2c3d4e5f6g7h8'
const EMAILJS_TEMPLATE_ID = 'template_9i8j7k6l5m4n3o2p'
const EMAILJS_PUBLIC_KEY = '1a2b3c4d5e6f7g8h9i0j'
```

### Step 6: Test Contact Form
1. Run: `npm run dev`
2. Fill out contact form
3. Click "Send Message"
4. Check Gmail inbox ✅ Email received?

---

## Phase 2: Google Apps Script Setup (Gmail → AI → Reply) ⏱️ 15 mins

### Step 1: Create Google Apps Script Project
1. Go to https://script.google.com/
2. Click **New Project**
3. Name it: `AI Auto Reply Bot`

### Step 2: Copy Code.gs Script
1. Replace all code in `Code.gs` with content from: `Code.gs` file
2. Update line 5:
   ```javascript
   const SENDER_EMAIL = 'orentgultiano11@gmail.com';
   ```

### Step 3: Get Gemini API Key
1. In Google Apps Script → **Project Settings** (⚙️)
2. Click **Google Cloud Console** link
3. Search for **"Generative Language API"** → Enable
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the API Key

### Step 4: Store API Key Securely
1. In Google Apps Script, run this ONE TIME:
   ```
   Line: setApiKey()
   Click: ▶ Run
   ```
2. When prompted for code:
   ```javascript
   const YOUR_API_KEY = 'AIzaSy_PASTE_YOUR_KEY_HERE';
   ```
3. Authorize when prompted

### Step 5: Test the Script
1. Click ▶ **Run** (select `testAutoReply`)
2. Check the Execution log
3. Should see: `✅ Test successful!` with an AI-generated response

### Step 6: Create Automatic Trigger
1. Click **Triggers** (⏰ icon on left)
2. Click **Create new trigger**
3. Set:
   - **Function**: `autoReplyAI`
   - **Deployment**: Head
   - **Event type**: Time-driven
   - **Frequency**: Every 5 minutes
4. Click **Save**
5. Authorize when prompted ✅

---

## Phase 3: Full System Test ⏱️ 5 mins

### Test Scenario:
1. Fill out your portfolio contact form
2. Send a test message
3. Check Gmail (wait up to 5 minutes)
4. You should see:
   - ✉️ Original message received
   - ✉️ AI auto-reply sent back
   - 📝 Original email labeled "AI Auto-Replied"

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| EmailJS: "Invalid credentials" | Check Service ID, Template ID, Public Key are correct |
| EmailJS: "Email not sending" | Verify Gmail service is connected in EmailJS dashboard |
| Apps Script: "API key not set" | Run `setApiKey()` with your actual Gemini API key |
| Apps Script: "No emails being replied" | Check Executions tab (⏱️) for errors, wait 5 minutes for trigger |
| Gemini: "API error" | Verify Generative Language API is enabled in Google Cloud |
| No replies after 5 min | Run `autoReplyAI()` manually to test immediately |

---

## Customization Ideas

### 1. Change Reply Style
Edit `generateAIReply()` function's prompt:
- Professional
- Casual/Friendly  
- Sales/Marketing

### 2. Change Auto-Reply Frequency
In Triggers, set:
- Every 1 minute (faster)
- Every 5 minutes (recommended)
- Every hour (less API usage)

### 3. Only Reply to Specific Emails
Change search filter in `autoReplyAI()`:
```javascript
// Current: all unread
const threads = GmailApp.search('is:unread -label:' + REPLY_LABEL);

// Only from specific domain
const threads = GmailApp.search('is:unread from:@example.com -label:' + REPLY_LABEL);
```

---

## Files Reference

| File | Purpose | Location |
|------|---------|----------|
| `App.vue` | Contact form with EmailJS | `src/App.vue` |
| `Code.gs` | Auto-reply script | Google Apps Script |
| `SETUP_GUIDE.md` | Detailed guide | Project folder |
| `QUICK_CHECKLIST.md` | This file | Project folder |

---

## Success Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created
- [ ] App.vue updated with credentials
- [ ] Contact form sends emails ✅
- [ ] Google Apps Script project created
- [ ] Code.gs copied and updated
- [ ] Gemini API key obtained
- [ ] API key stored securely
- [ ] Test confirms AI replies work ✅
- [ ] Trigger is active
- [ ] Full system test passed ✅

---

## Next Steps After Setup

1. **Customize AI responses** - Edit the prompt in `Code.gs`
2. **Monitor logs** - Check Executions in Google Apps Script
3. **Share your portfolio** - Show off the automation!
4. **Add more features** - E.g., add email subject recognition, multi-language support

---

**You're all set! Your portfolio now has 24/7 AI-powered customer support! 🎉**
