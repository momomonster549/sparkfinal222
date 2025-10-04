# Square Integration Troubleshooting Guide

## Common Issues and Solutions

### ❌ Error: "Module not found: Can't resolve 'square'"

**Problem:** The Square SDK package is not installed.

**Solution:**
```bash
cd C:\Users\kylel\Downloads\sparkcreatives-universe-starter-v2
npm install square
```

**Verify installation:**
```bash
npm list square
# Should show: square@40.1.0 (or similar version)
```

---

### ❌ Error: "SQUARE_ACCESS_TOKEN is not defined"

**Problem:** Environment variables are not configured.

**Solution:**
1. Make sure `.env.local` exists in your project root
2. Add your Square credentials:
   ```env
   SQUARE_ACCESS_TOKEN=your_sandbox_token_here
   SQUARE_APPLICATION_ID=your_app_id_here
   SQUARE_LOCATION_ID=your_location_id_here
   SQUARE_ENVIRONMENT=sandbox
   ```
3. Restart your dev server

---

### ❌ Error: "Invalid access token"

**Problem:** Access token is incorrect or expired.

**Solutions:**
- Double-check you copied the entire token from Square Dashboard
- Make sure there are no extra spaces before/after the token
- Verify you're using the Sandbox token for testing
- Check token hasn't been revoked
- Try regenerating the token in Square Dashboard

---

### ❌ Error: "Location ID not found"

**Problem:** Location ID is invalid or doesn't belong to your account.

**Solutions:**
1. Go to https://developer.squareup.com/apps
2. Select your application
3. Go to "Locations" tab
4. Copy the exact Location ID
5. Update `.env.local` with the correct ID

---

### ❌ Build errors after adding Square

**Problem:** TypeScript or build configuration issues.

**Solutions:**

1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check TypeScript paths:**
   Verify `tsconfig.json` includes:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

---

### ❌ Payment fails with "Invalid source ID"

**Problem:** Card nonce is invalid or expired.

**Solutions:**
- Card nonces expire quickly (typically within minutes)
- Generate a new nonce before each payment attempt
- Make sure you're using the Web Payments SDK correctly
- Test with Square's test card: 4111 1111 1111 1111

---

### ❌ CORS errors when testing payments

**Problem:** Cross-origin request issues.

**Solutions:**
- Make sure API calls are made to `/api/square/*` (same origin)
- Don't call Square API directly from client-side
- All Square calls should go through your Next.js API routes

---

### ❌ "Cannot find module '@/lib/square'"

**Problem:** Path alias not configured correctly.

**Solutions:**

1. Check `tsconfig.json` has paths configured:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. Restart your IDE/editor
3. Restart TypeScript server (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

---

### ❌ Environment variables not loading

**Problem:** `.env.local` not being read.

**Solutions:**

1. **Verify file location:**
   - File must be in project root (same level as `package.json`)
   - File must be named exactly `.env.local` (not `.env.local.txt`)

2. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

3. **Check for syntax errors:**
   - No spaces around `=`
   - No quotes needed for values
   - Example: `SQUARE_ACCESS_TOKEN=EAAAl...` not `SQUARE_ACCESS_TOKEN = "EAAAl..."`

---

### ❌ BigInt errors

**Problem:** Issues with amount conversion to BigInt.

**Solution:**
```typescript
// ✅ Correct
amount: BigInt(1000)

// ❌ Wrong
amount: 1000
amount: "1000"
```

---

### ❌ "Payment amount must be greater than 0"

**Problem:** Amount is not in cents or is invalid.

**Solutions:**
- Amounts should be in cents: $10.00 = 1000
- Amount must be a positive integer
- Example:
  ```typescript
  // For $25.50
  const amountInCents = 2550; // not 25.50
  ```

---

### ❌ TypeScript errors in square.ts

**Problem:** Type mismatches or missing types.

**Solutions:**

1. **Install type definitions:**
   ```bash
   npm install --save-dev @types/node
   ```

2. **Update imports:**
   ```typescript
   import { Client, Environment } from 'square';
   import { randomUUID } from 'crypto';
   ```

---

### ❌ API route returns 500 error

**Problem:** Server-side error in API route.

**Debugging steps:**

1. **Check server logs:**
   - Look at terminal where `npm run dev` is running
   - Error details will be shown there

2. **Add logging:**
   ```typescript
   export async function POST(request: NextRequest) {
     try {
       const body = await request.json();
       console.log('Request body:', body); // Add this
       // ... rest of code
     } catch (error) {
       console.error('Detailed error:', error); // Add this
       // ... error handling
     }
   }
   ```

3. **Test with curl:**
   ```bash
   curl -X POST http://localhost:3000/api/square/payment \
     -H "Content-Type: application/json" \
     -d '{"sourceId":"test","amount":1000}'
   ```

---

### ❌ Sandbox mode not working

**Problem:** Transactions not processing in sandbox.

**Solutions:**
- Verify `SQUARE_ENVIRONMENT=sandbox` in `.env.local`
- Use sandbox access token (not production)
- Use test card numbers provided by Square
- Check Square Sandbox Dashboard for transactions

---

## 🔍 Debugging Checklist

When something isn't working:

1. [ ] Check terminal for error messages
2. [ ] Verify all environment variables are set
3. [ ] Confirm Square SDK is installed (`npm list square`)
4. [ ] Restart dev server
5. [ ] Clear Next.js cache (delete `.next` folder)
6. [ ] Check browser console for client-side errors
7. [ ] Verify API route is correct (`/api/square/...`)
8. [ ] Test API endpoint with curl or Postman
9. [ ] Review Square Dashboard for transaction logs
10. [ ] Check network tab in browser DevTools

---

## 📞 Getting Help

If you're still stuck:

1. **Check Square Documentation:**
   - https://developer.squareup.com/docs

2. **Square Developer Forums:**
   - https://developer.squareup.com/forums

3. **Review example code:**
   - Check `src/lib/square-examples.ts`
   - Review API route implementations

4. **Contact Square Support:**
   - From Square Developer Dashboard
   - Include error messages and request IDs

---

## 🛠️ Useful Commands

```bash
# Install Square SDK
npm install square

# Check if Square is installed
npm list square

# Clear cache and restart
rm -rf .next
npm run dev

# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Test API endpoint
curl http://localhost:3000/api/square/catalog

# View environment variables (be careful - don't share output!)
echo $SQUARE_ACCESS_TOKEN  # Mac/Linux
echo %SQUARE_ACCESS_TOKEN% # Windows
```

---

## ✅ Health Check

Run these checks to verify everything is working:

1. **Dependencies installed:**
   ```bash
   npm list square
   # Should show installed version
   ```

2. **Environment configured:**
   ```bash
   # Check .env.local exists
   ls -la .env.local  # Mac/Linux
   dir .env.local     # Windows
   ```

3. **Server starts:**
   ```bash
   npm run dev
   # Should start without errors
   ```

4. **API accessible:**
   - Visit: http://localhost:3000/api/square/catalog
   - Should return JSON (even if empty)

5. **Types working:**
   ```bash
   npm run typecheck
   # Should complete without errors
   ```

If all checks pass, your Square integration is ready! 🎉
