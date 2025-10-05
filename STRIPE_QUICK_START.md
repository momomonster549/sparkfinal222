# 🚀 Stripe Quick Start Guide

## ✅ Current Status
- ✅ Stripe SDK installed
- ✅ API routes created
- ✅ React components ready
- ⏳ **Need API keys** (next step!)

---

## 🔑 GET STRIPE KEYS (2 minutes)

### 1. Open Stripe Dashboard
🌐 **Open in your browser:**
https://dashboard.stripe.com/

### 2. Sign In/Create Account
- Use existing Stripe account OR
- Create new account (free!)

### 3. Get API Keys
Go to **Developers** → **API keys**:

**① Publishable Key**
```
Looks like: pk_test_...
```
Click "Copy"

**② Secret Key**
```
Looks like: sk_test_...
```
Click "Reveal" → Copy

---

## ✏️ UPDATE .ENV.LOCAL

Create/update: `.env.local` in your project root

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Environment
NODE_ENV=development
```

**SAVE THE FILE!** (Ctrl+S)

---

## 🧪 TEST IT

### Start Server:
```bash
npm install
npm run dev
```

### Test Checkout:
```bash
curl -X POST http://localhost:3000/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -d '{"amount": 2000, "currency": "usd"}'
```

### Expected Response:
```json
{
  "sessionId": "cs_test_..."
}
```

✅ **SUCCESS!** You're done!

---

## 🎯 Test Card Numbers

Use these in development:
- **Success:** 4242 4242 4242 4242
- **Declined:** 4000 0000 0000 0002
- **Auth Required:** 4000 0025 0000 3155

Any future expiry date, any 3-digit CVC.

---

## 📚 Detailed Guide

For complete setup instructions:
👉 **Open:** `STRIPE_SETUP.md`

---

## 🆘 Problems?

Common issues:
- Keys not copied completely → Copy entire key
- Server not restarted → Restart: Ctrl+C, then `npm run dev`
- Missing .env.local → Create the file

---

## ⏱️ Total Time: ~2 minutes

1. Get keys (1 min)
2. Update .env.local (30 sec)
3. Test (30 sec)

**LET'S DO THIS! 💪**
