# SparkCreatives – Universe-style Starter (v2)

Improvements applied per code audit:
- ✅ Next.js **15** (App Router)
- ✅ `@/*` alias with TS paths
- ✅ React Hooks lint rules enabled
- ✅ Error boundaries (`/app/error.tsx`, `/app/global-error.tsx`)
- ✅ Web Vitals reporting (client + `/api/vitals`)
- ✅ Security headers + baseline CSP in `next.config.ts`
- ✅ Jest + React Testing Library scaffolding
- ✅ CI workflow (lint, typecheck, test, build)
- ✅ **Stripe Payments Integration** 🆕

## Quickstart
```bash
npm i
npm run dev
```

Populate env from `.env.example` as you add analytics/SaaS.

Swap donate URLs, impact numbers, agenda, and partners in `src/app/page.tsx`.

## 💳 Stripe Integration

This project includes a complete Stripe payments integration. See the dedicated documentation:

- **[Stripe Setup Guide](STRIPE_SETUP.md)** - Complete setup instructions
- **[Quick Start Guide](STRIPE_QUICK_START.md)** - 2-minute setup

### Quick Stripe Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get your Stripe API keys from [dashboard.stripe.com](https://dashboard.stripe.com/)

3. Update `.env.local` with your credentials:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

4. Test the integration:
   ```bash
   npm run dev
   # Test: POST http://localhost:3000/api/stripe/checkout
   ```

### Stripe Features Included

- ✅ Checkout sessions
- ✅ Payment intents
- ✅ Webhook handling
- ✅ React payment forms
- ✅ Success/cancel pages
- ✅ Type-safe TypeScript integration
- ✅ Comprehensive examples and documentation

### Stripe API Routes

- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/create-payment-intent` - Create payment intent
- `POST /api/stripe/webhook` - Handle webhooks

For more details, see [STRIPE_SETUP.md](STRIPE_SETUP.md).
