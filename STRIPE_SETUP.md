# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing in your Next.js application.

## Prerequisites

1. A Stripe account (sign up at https://dashboard.stripe.com/)
2. Node.js and npm installed
3. Your Stripe API keys

## Step 1: Install Stripe Dependencies

The required dependencies are already added to `package.json`:

```bash
npm install
```

This will install:
- `stripe` - Server-side Stripe SDK
- `@stripe/stripe-js` - Client-side Stripe SDK
- `@stripe/react-stripe-js` - React components for Stripe

## Step 2: Get Your Stripe API Keys

1. Go to https://dashboard.stripe.com/
2. Sign in or create a new account
3. Navigate to the "Developers" section
4. Click on "API keys"
5. Copy the following keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Stripe credentials:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Environment
NODE_ENV=development
```

**Important:** 
- Use test keys for development (`pk_test_` and `sk_test_`)
- Never commit your `.env.local` file to version control
- Keep your secret keys secure

## Step 4: Test the Integration

### Start the Development Server

```bash
npm run dev
```

### Test Checkout Session

You can test the checkout functionality by making a POST request to:
```
http://localhost:3000/api/stripe/checkout
```

With the following body:
```json
{
  "amount": 2000,
  "currency": "usd",
  "metadata": {
    "donation_type": "emergency_fund"
  }
}
```

### Test Payment Intent

You can test the payment intent functionality by making a POST request to:
```
http://localhost:3000/api/stripe/create-payment-intent
```

With the following body:
```json
{
  "amount": 2000,
  "currency": "usd",
  "metadata": {
    "donation_type": "emergency_fund"
  }
}
```

## Step 5: Set Up Webhooks (Optional)

For production applications, you should set up webhooks to handle payment events:

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and add it to your `.env.local`

## Available API Routes

The following API routes have been created:

### 1. Create Checkout Session
- **Endpoint:** `POST /api/stripe/checkout`
- **Body:**
  ```json
  {
    "amount": 2000,
    "currency": "usd",
    "metadata": {}
  }
  ```
- **Response:**
  ```json
  {
    "sessionId": "cs_test_..."
  }
  ```

### 2. Create Payment Intent
- **Endpoint:** `POST /api/stripe/create-payment-intent`
- **Body:**
  ```json
  {
    "amount": 2000,
    "currency": "usd",
    "metadata": {}
  }
  ```
- **Response:**
  ```json
  {
    "clientSecret": "pi_..._secret_..."
  }
  ```

### 3. Webhook Handler
- **Endpoint:** `POST /api/stripe/webhook`
- Handles Stripe webhook events

## React Components

### StripePaymentForm

A ready-to-use React component for collecting payments:

```tsx
import StripePaymentForm from '@/components/StripePaymentForm';

function DonationPage() {
  const handleSuccess = (paymentIntent: any) => {
    console.log('Payment succeeded:', paymentIntent);
  };

  const handleError = (error: any) => {
    console.error('Payment failed:', error);
  };

  return (
    <StripePaymentForm
      amount={25.00}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}
```

## Files Created

- `src/lib/stripe.ts` - Stripe client initialization and utilities
- `src/app/api/stripe/checkout/route.ts` - Checkout session endpoint
- `src/app/api/stripe/create-payment-intent/route.ts` - Payment intent endpoint
- `src/app/api/stripe/webhook/route.ts` - Webhook handler
- `src/components/StripePaymentForm.tsx` - React payment form component
- `src/app/success/page.tsx` - Payment success page
- `src/app/cancel/page.tsx` - Payment cancellation page
- `.env.example` - Environment variables template

## Test Card Numbers

Use these test card numbers in development:

- **Successful payment:** 4242 4242 4242 4242
- **Declined payment:** 4000 0000 0000 0002
- **Requires authentication:** 4000 0025 0000 3155

Use any future expiration date and any 3-digit CVC.

## Next Steps

1. Install dependencies: `npm install`
2. Add your Stripe credentials to `.env.local`
3. Test the integration in test mode
4. Set up webhooks for production
5. Switch to live keys when ready to go live

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Components](https://stripe.com/docs/stripe-js/react)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Webhooks Guide](https://stripe.com/docs/webhooks)

## Security Notes

- Always validate and sanitize input on the server side
- Never expose your secret keys in client-side code
- Use HTTPS in production
- Implement proper error handling
- Follow PCI compliance guidelines for handling payment data

## Support

For issues with Stripe integration:
- Check the [Stripe Documentation](https://stripe.com/docs)
- Review the [API Reference](https://stripe.com/docs/api)
- Contact Stripe Support

---

Created for SparkCreatives Universe Starter v2
