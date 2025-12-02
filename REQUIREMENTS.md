# 📋 Pre-Setup Checklist & Requirements

Before you start, make sure you have:

## ✅ What You Need

- [ ] **Gmail account** (for receiving and sending emails)
- [ ] **Google account** (for Google Apps Script & Gemini API)
- [ ] **EmailJS account** (free tier is fine)
- [ ] **Node.js installed** on your computer
- [ ] **Your portfolio project** open and running
- [ ] **Internet connection** (for API calls)

## ✅ Accounts to Create (Free)

1. **EmailJS** - https://www.emailjs.com/ (Free tier: 200 emails/month)
2. **Google Apps Script** - https://script.google.com/ (Built-in, no signup needed)
3. **Google Cloud Console** - https://console.cloud.google.com/ (Free tier: 60 API calls/minute)

---

## 📝 Credentials You'll Need to Gather

You'll collect these during setup. Save them in a safe place:

```
EmailJS Credentials:
├─ Service ID: ___________________
├─ Template ID: __________________
└─ Public Key: ___________________

Google API Credentials:
├─ Gemini API Key: _______________
└─ (Stored securely in Apps Script)

Your Email Address:
└─ Email: _______________________
```

---

## 🔧 System Requirements

### Node.js & npm
```powershell
# Check if installed:
node --version
npm --version

# If not installed, download from: https://nodejs.org/
```

### Your Portfolio Project
```powershell
# Navigate to your project:
cd c:\Users\ADMIN\Documents\orentPortfolio\Geric

# Install dependencies:
npm install

# Run dev server:
npm run dev
```

---

## 🚀 Setup Order (Don't Skip Steps!)

```
1. Install npm packages
2. Create EmailJS account
3. Connect Gmail to EmailJS
4. Update App.vue with credentials
5. Test contact form
6. Create Google Apps Script project
7. Get Gemini API key
8. Set up auto-reply script
9. Create trigger
10. Test full workflow
```

---

## ⏱️ Time Estimate

| Phase | Time |
|-------|------|
| EmailJS Setup | ~10 min |
| Google Apps Script Setup | ~15 min |
| Testing | ~5 min |
| **Total** | ~30 min |

---

## 🎯 What You'll Have When Done

✅ Contact form that sends emails to Gmail automatically
✅ AI bot that reads incoming emails
✅ Gemini AI that generates professional replies
✅ Gmail that sends replies automatically 24/7
✅ Zero backend server needed!

---

## ⚠️ Important Notes

### API Limits (All Free)
- **EmailJS**: 200 emails/month (free) or more with paid plans
- **Gemini API**: 60 calls/minute (free quota is generous)
- **Google Apps Script**: Unlimited triggers

### Security
- Never share your API keys publicly
- Store keys securely in Google Apps Script properties
- Don't commit API keys to GitHub

### Rate Limiting
- Apps Script adds 1-second delays between emails (to avoid rate limits)
- Adjust frequency based on your email volume

---

## 📚 Resources

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **Google Apps Script Docs**: https://developers.google.com/apps-script
- **Gemini API Docs**: https://ai.google.dev/
- **Gmail Apps Script**: https://developers.google.com/apps-script/reference/gmail

---

## 💡 Pro Tips

1. **Test locally first** before deploying to production
2. **Check logs frequently** to monitor what's happening
3. **Start with low trigger frequency** (every 5 min) then adjust
4. **Create a test Gmail folder** to keep test emails organized
5. **Save your API keys** in a password manager

---

**Ready to begin? Start with the QUICK_CHECKLIST.md file!**
