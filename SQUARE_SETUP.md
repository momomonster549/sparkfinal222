# Square Integration Setup Guide

This guide will help you set up Square payment processing in your Next.js application.

## Prerequisites

1. A Square Developer account (sign up at https://developer.squareup.com/)
2. Node.js and npm installed
3. Your Square application credentials

## Step 1: Install Square SDK

Run the following command in your project directory:

```bash
npm install square
```

## Step 2: Get Your Square Credentials

1. Go to https://developer.squareup.com/apps
2. Create a new application or select an existing one
3. Navigate to the "Credentials" section
4. Copy the following credentials:
   - **Sandbox Access Token** (for testing)
   - **Production Access Token** (for live payments)
   - **Application ID**
   - **Location ID** (from the Locations tab)

## Step 3: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Add your Square credentials:

```env
# Square Configuration
SQUARE_ACCESS_TOKEN=your_sandbox_access_token_here
SQUARE_ENVIRONMENT=sandbox
SQUARE_APPLICATION_ID=your_application_id_here
SQUARE_LOCATION_ID=your_location_id_here
```

**Important:** 
- Use `sandbox` for testing and `production` for live payments
- Never commit your `.env.local` file to version control
- Keep your access tokens secure

## Step 4: Test the Integration

### Test the Catalog API

Start your development server:
```bash
npm run dev
```

Then visit:
```
http://localhost:3000/api/square/catalog
```

This should return your Square catalog items (or an empty array if you haven't created any items yet).

### Test Payment Processing

You can test payments using Square's test card numbers in sandbox mode:
- Card: `4111 1111 1111 1111`
- Expiration: Any future date
- CVV: Any 3 digits
- Postal Code: Any valid postal code

## Step 5: Integrate Web Payments SDK (Optional)

To enable card input forms in your React components, you need to integrate the Square Web Payments SDK:

1. Add the Square Web Payments SDK script to your layout:

```tsx
// In src/app/layout.tsx, add to the <head>:
<script
  type="text/javascript"
  src="https://sandbox.web.squarecdn.com/v1/square.js"
/>
```

2. Use the SDK in your component to create a payment form:

```tsx
import { useEffect, useState } from 'react';

function PaymentForm() {
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    async function initializePayments() {
      if (!window.Square) {
        throw new Error('Square.js failed to load');
      }

      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      );
      
      setPayments(payments);
    }

    initializePayments();
  }, []);

  // Continue with payment form implementation
}
```

## Available API Routes

The following API routes have been created for you:

### 1. Create Payment
- **Endpoint:** `POST /api/square/payment`
- **Body:**
  ```json
  {
    "sourceId": "card_nonce_from_web_payments_sdk",
    "amount": 1000,
    "currency": "USD"
  }
  ```

### 2. List Catalog Items
- **Endpoint:** `GET /api/square/catalog`
- **Response:**
  ```json
  {
    "success": true,
    "items": [...],
    "cursor": "..."
  }
  ```

## Files Created

- `src/lib/square.ts` - Square client initialization
- `src/app/api/square/payment/route.ts` - Payment processing endpoint
- `src/app/api/square/catalog/route.ts` - Catalog listing endpoint
- `src/components/SquarePaymentForm.tsx` - Sample payment form component
- `.env.local` - Environment variables (add your credentials here)

## Next Steps

1. Install the Square SDK: `npm install square`
2. Add your Square credentials to `.env.local`
3. Test the integration in sandbox mode
4. Implement the Web Payments SDK for card input
5. Switch to production credentials when ready to go live

## Resources

- [Square Developer Documentation](https://developer.squareup.com/docs)
- [Square Node.js SDK](https://github.com/square/square-nodejs-sdk)
- [Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview)
- [Testing in Sandbox](https://developer.squareup.com/docs/testing/sandbox)

## Security Notes

- Always validate and sanitize input on the server side
- Never expose your access tokens in client-side code
- Use HTTPS in production
- Implement proper error handling
- Follow PCI compliance guidelines for handling payment data

## Support

For issues with Square integration:
- Check the [Square Developer Forums](https://developer.squareup.com/forums)
- Review the [API Reference](https://developer.squareup.com/reference/square)
- Contact Square Developer Support

---

Created for SparkCreatives Universe Starter v2
