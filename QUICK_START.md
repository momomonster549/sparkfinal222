# 🎯 QUICK START - Square Integration

## ✅ Current Status
- ✅ Square SDK installed (v43.1.0)
- ✅ API routes created
- ✅ Helper functions ready
- ⏳ **Need credentials** (next step!)

---

## 🚀 GET CREDENTIALS NOW (5 minutes)

### 1. Open Square Developer Portal
🌐 **Already open in Chrome!**
https://developer.squareup.com/apps

### 2. Sign In/Create Account
- Use existing Square account OR
- Create new account (free!)

### 3. Create/Select App
- Click "Create App" OR
- Select existing app

### 4. Copy 3 Credentials

Go to **Credentials** tab:

**① Sandbox Access Token**
```
Looks like: EAAAl...
```
Click "Show" → Copy

**② Application ID**
```
Looks like: sq0idp-...
```
Click "Copy"

Go to **Locations** tab:

**③ Location ID**
```
Looks like: L...
```
Click "Copy"

---

## ✏️ UPDATE .ENV.LOCAL

Open: `C:\Users\kylel\Downloads\sparkcreatives-universe-starter-v2\.env.local`

Replace these 3 lines:
```env
SQUARE_ACCESS_TOKEN=your_actual_token_here
SQUARE_APPLICATION_ID=your_actual_app_id_here
SQUARE_LOCATION_ID=your_actual_location_id_here
```

**SAVE THE FILE!** (Ctrl+S)

---

## 🧪 TEST IT

### Start Server:
```bash
npm run dev
```

### Test URL:
```
http://localhost:3000/api/square/catalog
```

### Expected:
```json
{
  "success": true,
  "items": []
}
```

✅ **SUCCESS!** You're done!

---

## 📚 Detailed Guide

For step-by-step instructions with screenshots:
👉 **Open:** `GET_SQUARE_CREDENTIALS.md`

---

## 🆘 Problems?

Check: `SQUARE_TROUBLESHOOTING.md`

Common issues:
- Token copy incomplete → Copy entire token
- Spaces in .env.local → Remove all spaces
- Server not restarted → Restart: Ctrl+C, then `npm run dev`

---

## ⏱️ Total Time: ~5 minutes

1. Get credentials (3 min)
2. Update .env.local (1 min)
3. Test (1 min)

**LET'S DO THIS! 💪**
