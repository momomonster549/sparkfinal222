# 🔑 Get Your Square Credentials - Step-by-Step Guide

Follow these steps to get your Square API credentials and complete the setup!

## 📍 Step 1: Access Square Developer Portal

The Square Developer Portal should now be open in your browser at:
**https://developer.squareup.com/apps**

If not, open it now in Chrome.

---

## 🔐 Step 2: Sign In or Create Account

### If you already have a Square account:
1. Click **"Sign In"** (top right)
2. Enter your Square email and password
3. Click **"Sign In"**

### If you need to create an account:
1. Click **"Get Started"** or **"Sign Up"**
2. Fill in your information:
   - Email address
   - Password
   - Business name
3. Click **"Create Account"**
4. Verify your email (check your inbox)

---

## 📱 Step 3: Create or Select Your Application

### Option A: Create a NEW Application
1. Click the **"+ Create App"** or **"Create Application"** button
2. Enter application details:
   - **Application Name**: `SparkCreatives Starter` (or your preferred name)
   - **Description**: `Payment integration for SparkCreatives website`
3. Click **"Create Application"**

### Option B: Use an EXISTING Application
1. Find your application in the list
2. Click on it to open the dashboard

---

## 🎯 Step 4: Get Your Credentials

Once you're in your application dashboard:

### A. Get Sandbox Access Token

1. Look for the **"Credentials"** tab (left sidebar or top menu)
2. Click on **"Credentials"**
3. You'll see two sections: **Sandbox** and **Production**
4. In the **Sandbox** section, find:
   - **Sandbox Access Token**
5. Click **"Show"** or the eye icon to reveal the token
6. Click **"Copy"** to copy the token

**📝 Paste it here temporarily:**
```
SQUARE_ACCESS_TOKEN=_____paste_here_____
```

### B. Get Application ID

1. Still in the **Credentials** section
2. Scroll to find **Application ID** (same for both Sandbox and Production)
3. Click **"Copy"** to copy the Application ID

**📝 Paste it here temporarily:**
```
SQUARE_APPLICATION_ID=_____paste_here_____
```

### C. Get Location ID

1. Click on the **"Locations"** tab (left sidebar or top menu)
2. You should see at least one location listed
3. Find the **Location ID** column
4. Click **"Copy"** next to your default location

**📝 Paste it here temporarily:**
```
SQUARE_LOCATION_ID=_____paste_here_____
```

---

## ✅ Step 5: Update Your .env.local File

Now let's add these credentials to your project:

### Method 1: Using File Explorer (Easier)
1. Open File Explorer
2. Navigate to: `C:\Users\kylel\Downloads\sparkcreatives-universe-starter-v2`
3. Find the file named `.env.local`
4. Right-click and select "Open with" → **Notepad** or **Cursor**
5. Replace the placeholder values with your actual credentials:

```env
# Square - Your actual credentials
SQUARE_ACCESS_TOKEN=EAAAl...your_actual_sandbox_token...
SQUARE_APPLICATION_ID=sq0idp-...your_actual_app_id...
SQUARE_LOCATION_ID=L...your_actual_location_id...
SQUARE_ENVIRONMENT=sandbox
```

6. **Save the file** (Ctrl+S)

### Method 2: Using Cursor (Alternative)
1. In Cursor, find `.env.local` in the file explorer (left sidebar)
2. Click to open it
3. Replace the placeholder values
4. Save (Ctrl+S)

---

## 🎉 Step 6: Test Your Integration

### A. Start the Development Server

In your terminal (Cursor or Command Prompt):
```bash
cd C:\Users\kylel\Downloads\sparkcreatives-universe-starter-v2
npm run dev
```

### B. Test the Catalog API

Once the server starts, open your browser to:
```
http://localhost:3000/api/square/catalog
```

**Expected Response:**
```json
{
  "success": true,
  "items": [],
  "cursor": null
}
```

✅ If you see this, **congratulations!** Your Square integration is working!

---

## 🚨 Troubleshooting

### "Access token is invalid"
- Make sure you copied the **entire** token
- No spaces before or after the token
- Using **Sandbox** token (not Production)
- Token should start with `EAAA`

### "Location ID not found"
- Copy the Location ID exactly as shown
- Should start with `L` followed by letters/numbers
- Make sure it's from your Square account

### Still not working?
1. Double-check all three credentials are correct
2. Restart your dev server (Ctrl+C, then `npm run dev` again)
3. Check the SQUARE_TROUBLESHOOTING.md file
4. Review the console for specific error messages

---

## 📋 Quick Checklist

- [ ] Signed in to Square Developer Portal
- [ ] Created or selected application
- [ ] Copied Sandbox Access Token
- [ ] Copied Application ID
- [ ] Copied Location ID
- [ ] Updated `.env.local` with all three credentials
- [ ] Saved `.env.local` file
- [ ] Started dev server (`npm run dev`)
- [ ] Tested catalog API endpoint
- [ ] Saw successful JSON response

---

## 🎯 What's Next?

Once your credentials are working:

1. **Test Payments** - Use the test card: 4111 1111 1111 1111
2. **Add Products** - Create items in Square Dashboard → Catalog
3. **Customize** - Modify the payment form in `src/components/SquarePaymentForm.tsx`
4. **Deploy** - When ready, switch to Production credentials

---

## 🔒 Security Reminder

**NEVER commit `.env.local` to git!**

It's already in `.gitignore`, but double-check:
```bash
# Check .gitignore includes .env.local
cat .gitignore | findstr ".env.local"
```

---

## 📞 Need Help?

- Square Developer Forums: https://developer.squareup.com/forums
- Square Documentation: https://developer.squareup.com/docs
- Check SQUARE_TROUBLESHOOTING.md in your project
- Review console errors in your terminal

---

**You got this! 🚀**

The Square Developer Portal is now open in your browser. Follow the steps above to get your credentials!
