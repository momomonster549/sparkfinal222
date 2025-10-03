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

## Quickstart
```bash
npm i
npm run dev
```

Populate env from `.env.example` as you add analytics/SaaS.

Swap donate URLs, impact numbers, agenda, and partners in `src/app/page.tsx`.
