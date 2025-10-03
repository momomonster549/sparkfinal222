# Deployment Guide: sparkcreativesinc.org

## Prerequisites

- Vercel account connected to your GitHub (aethereology/sparkfinal222)
- Domain access for sparkcreativesinc.org
- Node.js 20.x or later

## Step 1: Push Code to GitHub

```bash
cd C:\Users\kylel\Downloads\sparkcreatives-universe-starter-v2
git add .
git commit -m "Add Vercel deployment configuration and light/dark mode"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project directory:
```bash
cd C:\Users\kylel\Downloads\sparkcreatives-universe-starter-v2
vercel --prod
```

### Option B: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `aethereology/sparkfinal222`
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
   - **Install Command**: `npm install`
   - **Node Version**: 20.x

4. Click "Deploy"

## Step 3: Configure Custom Domain

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings** → **Domains**
3. Add domain: `sparkcreativesinc.org` (root domain)
4. Vercel will provide DNS records to add

### DNS Configuration

Add these records to your DNS provider for `sparkcreativesinc.org`:

**For Root Domain (sparkcreativesinc.org):**

**Option A - CNAME (if supported by DNS provider):**
```
Name: @
Type: CNAME
Value: cname.vercel-dns.com
TTL: 3600
```

**Option B - A Records (most common):**
```
Name: @
Type: A
Value: 76.76.21.21
TTL: 3600
```

**AAAA Record (IPv6):**
```
Name: @
Type: AAAA
Value: 2606:4700:10::6816:1515
TTL: 3600
```

**Note:** If you deploy another app to `app.sparkcreativesinc.org`, you'll add a separate CNAME record:
```
Name: app
Type: CNAME
Value: cname.vercel-dns.com
```

## Step 4: Environment Variables (Optional)

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

### Analytics (Optional)
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Set to `sparkcreativesinc.org`

### Error Monitoring (Optional)
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN
- `SENTRY_AUTH_TOKEN` - Sentry auth token

### Security (Optional)
- `NEXT_PUBLIC_HCAPTCHA_SITEKEY` - hCaptcha site key
- `HCAPTCHA_SECRET` - hCaptcha secret key

## Step 5: Verify Deployment

1. Visit https://sparkcreativesinc.org
2. Test light/dark mode toggle
3. Verify header blur effect on scroll
4. Check browser console for CSP errors (should be none)
5. Test Web Vitals in production

## Build Verification (Local)

Before deploying, test production build locally:

```bash
cd C:\Users\kylel\Downloads\sparkcreatives-universe-starter-v2
npm run build
npm run start
```

Visit http://localhost:3000 to verify production build works correctly.

## Continuous Deployment

Once connected to Vercel:
- **Main branch** → Automatic production deployments to sparkcreativesinc.org
- **Other branches** → Automatic preview deployments with unique URLs
- **Pull requests** → Automatic preview deployments for testing

## Rollback

If you need to rollback to a previous version:

1. Go to Vercel Dashboard → **Deployments**
2. Find the previous working deployment
3. Click the three dots → **Promote to Production**

## Performance Monitoring

- **Vercel Analytics**: Enabled by default
- **Web Vitals**: Tracked via /api/vitals endpoint
- **Error Boundaries**: Route-level and global error handling in place

## Security Headers

All security headers are configured in `next.config.ts`:
- CSP (Content Security Policy) - development and production modes
- X-Frame-Options, X-Content-Type-Options
- Strict-Transport-Security (HSTS)
- Referrer-Policy, Permissions-Policy

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Project Issues: https://github.com/aethereology/sparkfinal222/issues
