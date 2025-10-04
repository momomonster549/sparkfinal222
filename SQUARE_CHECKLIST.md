# Square Integration Checklist ✅

Use this checklist to ensure your Square integration is properly set up.

## 📋 Setup Checklist

### 1. Dependencies
- [ ] Run `npm install` to install the Square SDK
- [ ] Verify `square` package is in `package.json` dependencies
- [ ] Check that all other dependencies are installed

### 2. Square Developer Account
- [ ] Create account at https://developer.squareup.com
- [ ] Create a new application (or use existing)
- [ ] Access the application dashboard
- [ ] Navigate to Credentials section

### 3. Get Credentials
- [ ] Copy Sandbox Access Token
- [ ] Copy Application ID
- [ ] Navigate to Locations tab
- [ ] Copy your Location ID
- [ ] Keep these credentials secure

### 4. Environment Configuration
- [ ] Open `.env.local` file
- [ ] Replace `SQUARE_ACCESS_TOKEN` with your Sandbox token
- [ ] Replace `SQUARE_APPLICATION_ID` with your App ID
- [ ] Replace `SQUARE_LOCATION_ID` with your Location ID
- [ ] Verify `SQUARE_ENVIRONMENT=sandbox`
- [ ] Save the file

### 5. Test Basic Setup
- [ ] Start dev server: `npm run dev`
- [ ] Server starts without errors
- [ ] Visit http://localhost:3000
- [ ] No console errors related to Square

### 6. Test Catalog API
- [ ] Visit http://localhost:3000/api/square/catalog
- [ ] Should return JSON response (may be empty if no catalog items)
- [ ] No error messages in response
- [ ] Check terminal/console for any errors

### 7. Test Payment API (Optional)
- [ ] Use API testing tool (Postman, Insomnia, or curl)
- [ ] POST to http://localhost:3000/api/square/payment
- [ ] Use test card nonce (see documentation)
- [ ] Verify payment processes successfully

### 8. Web Payments SDK (If Needed)
- [ ] Decide if you need card input forms
- [ ] Add Square.js script to layout
- [ ] Add `NEXT_PUBLIC_SQUARE_APPLICATION_ID` to env
- [ ] Test card form initialization
- [ ] Verify card tokenization works

### 9. Code Review
- [ ] Review `src/lib/square.ts` - client initialization
- [ ] Review `src/lib/square-examples.ts` - example functions
- [ ] Review `src/app/api/square/payment/route.ts` - payment endpoint
- [ ] Review `src/app/api/square/catalog/route.ts` - catalog endpoint
- [ ] Review `src/types/square.ts` - TypeScript types

### 10. Security Check
- [ ] `.env.local` is in `.gitignore`
- [ ] No credentials committed to git
- [ ] Access tokens kept secure
- [ ] Using sandbox environment for testing
- [ ] Server-side validation in place

## 🧪 Testing Checklist

### Sandbox Testing
- [ ] Use test card: 4111 1111 1111 1111
- [ ] Test successful payment
- [ ] Test failed payment (use CVV 000)
- [ ] Test refund functionality
- [ ] Verify webhooks (if configured)

### Error Handling
- [ ] Test with invalid credentials
- [ ] Test with missing parameters
- [ ] Test with invalid card data
- [ ] Verify error messages are helpful
- [ ] Check error logging

### Integration Points
- [ ] Payment processing works
- [ ] Order creation works
- [ ] Customer creation works
- [ ] Catalog listing works
- [ ] Refunds work (if implemented)

## 🚀 Pre-Production Checklist

### Before Going Live
- [ ] All sandbox tests passing
- [ ] Error handling comprehensive
- [ ] Logging configured properly
- [ ] Security review completed
- [ ] PCI compliance reviewed
- [ ] Get production credentials
- [ ] Update `.env.production` with production tokens
- [ ] Change `SQUARE_ENVIRONMENT=production`
- [ ] Test in production sandbox first
- [ ] Monitor first real transactions closely

### Production Verification
- [ ] Production credentials working
- [ ] Payments processing correctly
- [ ] Webhooks receiving events (if configured)
- [ ] Error monitoring in place
- [ ] Customer notifications working
- [ ] Receipt emails sending (if configured)

## 📝 Documentation Review

- [ ] Read `SQUARE_SETUP.md` completely
- [ ] Review `SQUARE_INTEGRATION_SUMMARY.md`
- [ ] Understand `square-examples.ts` functions
- [ ] Check Square official documentation
- [ ] Review API reference for needed features

## 🆘 Troubleshooting

If you encounter issues:

### Common Problems
- **"Access token is invalid"**
  - [ ] Check token is copied correctly
  - [ ] Verify environment (sandbox vs production)
  - [ ] Token hasn't expired
  - [ ] Token has required permissions

- **"Location ID not found"**
  - [ ] Verify location ID is correct
  - [ ] Check location is active
  - [ ] Ensure location belongs to your account

- **"Payment failed"**
  - [ ] Check amount format (cents, not dollars)
  - [ ] Verify card nonce is valid
  - [ ] Ensure idempotency key is unique
  - [ ] Check network connectivity

- **TypeScript errors**
  - [ ] Run `npm install` again
  - [ ] Check `tsconfig.json` paths configuration
  - [ ] Verify all imports are correct
  - [ ] Restart TypeScript server

## 📞 Get Help

- [ ] Check Square Developer Forums
- [ ] Review API Reference
- [ ] Contact Square Developer Support
- [ ] Check project documentation

## ✨ Optional Enhancements

Consider adding:
- [ ] Webhook handlers for payment events
- [ ] Customer portal for managing subscriptions
- [ ] Receipt email integration
- [ ] Analytics and reporting
- [ ] Loyalty program integration
- [ ] Gift card support
- [ ] Invoice generation
- [ ] Recurring payments/subscriptions

---

**Status:** [ ] Setup Complete ✅

**Date Completed:** _________________

**Notes:**
_________________________________
_________________________________
_________________________________
