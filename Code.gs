// Gmail Auto-Reply with Gemini AI
// This script automatically responds to emails using Google's Gemini AI

const REPLY_LABEL = 'AI Auto-Replied'; // Label for replied emails
const SENDER_EMAIL = 'orentgultiano11@gmail.com'; // ← UPDATE THIS WITH YOUR EMAIL
const GEMINI_MODEL = 'gemini-pro';

/**
 * Main function: Checks for unread emails and sends AI-powered replies
 * This function should be triggered every 5 minutes
 */
function autoReplyAI() {
  try {
    // Get the API key from script properties (securely stored)
    const API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    
    if (!API_KEY) {
      Logger.log('❌ ERROR: API key not set. Run setApiKey() first.');
      return;
    }

    // Search for unread emails that haven't been auto-replied yet
    const threads = GmailApp.search('is:unread -label:' + REPLY_LABEL);
    
    if (threads.length === 0) {
      Logger.log('ℹ️ No new unread emails');
      return;
    }

    Logger.log('✅ Found ' + threads.length + ' unread email(s)');

    // Create or get the AI Auto-Replied label
    let label = GmailApp.getUserLabelByName(REPLY_LABEL);
    if (!label) {
      label = GmailApp.createLabel(REPLY_LABEL);
      Logger.log('📝 Created new label: ' + REPLY_LABEL);
    }

    // Process each unread email
    threads.forEach((thread, index) => {
      const message = thread.getMessages()[0];
      const emailBody = message.getPlainBody();
      const sender = message.getFrom();
      const subject = message.getSubject();
      
      Logger.log('📧 Processing email ' + (index + 1) + ' from: ' + sender);

      // Generate AI reply using Gemini
      const aiReply = generateAIReply(emailBody, API_KEY);
      
      if (aiReply && aiReply.length > 0) {
        try {
          // Send auto-reply
          GmailApp.sendEmail(
            sender,
            'Re: ' + subject,
            aiReply,
            {
              from: SENDER_EMAIL,
              replyTo: SENDER_EMAIL
            }
          );
          
          Logger.log('✉️ Sent AI reply to: ' + sender);
          
          // Mark original email as read and add label
          thread.markRead();
          thread.addLabel(label);
          
          // Optional: Archive the original email (uncomment to enable)
          // thread.archive();
          
        } catch (emailError) {
          Logger.log('❌ ERROR sending email to ' + sender + ': ' + emailError);
        }
      } else {
        Logger.log('⚠️ Failed to generate AI reply for: ' + sender);
      }
      
      // Add a small delay (1 second) to avoid rate limiting
      Utilities.sleep(1000);
    });

    Logger.log('✅ Auto-reply process completed');

  } catch (error) {
    Logger.log('❌ ERROR in autoReplyAI: ' + error.toString());
  }
}

/**
 * Generates an AI-powered reply using Gemini API
 * @param {string} emailBody - The original email message
 * @param {string} apiKey - Gemini API key
 * @returns {string} - AI-generated reply
 */
function generateAIReply(emailBody, apiKey) {
  try {
    // Prepare the prompt for Gemini
    const prompt = `You are a professional assistant helping to respond to customer inquiries. 
Write a brief, friendly, and professional reply to this message. 
Keep your response concise (2-3 sentences maximum).
Be helpful and courteous.

Customer Message:
${emailBody}

Your Professional Reply (no greeting, just the message):`;

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

    // Extract the generated text from API response
    if (result.candidates && result.candidates.length > 0) {
      const reply = result.candidates[0].content.parts[0].text;
      return reply;
    } else if (result.error) {
      Logger.log('⚠️ Gemini API Error: ' + result.error.message);
      // Return a fallback response if API fails
      return 'Thank you for reaching out! I appreciate your message and will get back to you as soon as possible.';
    }

    return null;

  } catch (error) {
    Logger.log('❌ ERROR generating AI reply: ' + error.toString());
    // Return a fallback response in case of error
    return 'Thank you for reaching out! I appreciate your message and will get back to you as soon as possible.';
  }
}

/**
 * Securely stores your Gemini API key
 * Run this function ONCE with your actual API key
 * After running, you can delete this function
 */
function setApiKey() {
  // ⚠️ IMPORTANT: Replace with your actual Gemini API key
  const YOUR_API_KEY = 'AIzaSy_REPLACE_WITH_YOUR_ACTUAL_API_KEY';
  
  PropertiesService.getScriptProperties().setProperty('GEMINI_API_KEY', YOUR_API_KEY);
  Logger.log('✅ API key has been set securely');
}

/**
 * Test function to verify everything is working
 * Run this manually to test before setting up the trigger
 */
function testAutoReply() {
  Logger.log('🧪 Testing auto-reply system...');
  
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  
  if (!apiKey) {
    Logger.log('❌ API key not set. Please run setApiKey() first.');
    return;
  }

  Logger.log('✅ API key found');

  // Test message
  const testMessage = 'Hi, I am interested in your services and portfolio. Can you tell me more about your experience?';
  
  // Generate test reply
  const testReply = generateAIReply(testMessage, apiKey);
  
  if (testReply) {
    Logger.log('✅ Test successful!');
    Logger.log('Test Input: ' + testMessage);
    Logger.log('AI Reply: ' + testReply);
  } else {
    Logger.log('❌ Test failed - No reply generated');
  }
}

/**
 * Function to manually test sending an email (for debugging)
 */
function testSendEmail() {
  const testEmail = 'your-email@gmail.com'; // Change this
  const testSubject = 'Test Auto-Reply';
  const testBody = 'This is a test message from Google Apps Script.';
  
  try {
    GmailApp.sendEmail(testEmail, testSubject, testBody);
    Logger.log('✅ Test email sent to: ' + testEmail);
  } catch (error) {
    Logger.log('❌ Failed to send test email: ' + error);
  }
}

/**
 * Manual trigger function - call this if you want to process emails immediately
 * instead of waiting for the scheduled trigger
 */
function processEmailsNow() {
  Logger.log('🚀 Running auto-reply process manually...');
  autoReplyAI();
}
