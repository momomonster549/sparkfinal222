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
- ✅ **Square Payments Integration** 🆕

## Quickstart
```bash
npm i
npm run dev
```

Populate env from `.env.example` as you add analytics/SaaS.

Swap donate URLs, impact numbers, agenda, and partners in `src/app/page.tsx`.

## 💳 Square Integration

This project includes a complete Square payments integration. See the dedicated documentation:

- **[Square Setup Guide](SQUARE_SETUP.md)** - Complete setup instructions
- **[Integration Summary](SQUARE_INTEGRATION_SUMMARY.md)** - Quick overview
- **[Setup Checklist](SQUARE_CHECKLIST.md)** - Step-by-step checklist

### Quick Square Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get your Square credentials from [developer.squareup.com](https://developer.squareup.com/apps)

3. Update `.env.local` with your credentials:
   ```env
   SQUARE_ACCESS_TOKEN=your_sandbox_token
   SQUARE_APPLICATION_ID=your_app_id
   SQUARE_LOCATION_ID=your_location_id
   SQUARE_ENVIRONMENT=sandbox
   ```

4. Test the integration:
   ```bash
   npm run dev
   # Visit http://localhost:3000/api/square/catalog
   ```

### Square Features Included

- ✅ Payment processing API
- ✅ Catalog management
- ✅ Customer management
- ✅ Order creation
- ✅ Refund processing
- ✅ Type-safe TypeScript integration
- ✅ Sample React payment form
- ✅ Comprehensive examples and documentation

### Square API Routes

- `POST /api/square/payment` - Process payments
- `GET /api/square/catalog` - List catalog items

For more details, see [SQUARE_SETUP.md](SQUARE_SETUP.md).
