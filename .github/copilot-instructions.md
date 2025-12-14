# Wood Store Auction System - AI Coding Agent Instructions

## Project Overview
Next.js 14 (App Router) e-commerce/auction platform with dual interfaces: frontend shopping experience and admin dashboard. Integrates ECPay and LINE Pay payment gateways with NextAuth multi-provider authentication.

## Architecture

### Dual-Layout System
- **Frontend**: `app/(frontend)/` - Customer-facing pages with Header/Footer layout
- **Admin**: `app/admin/` - Management dashboard using Ant Design Pro Layout
- Both layouts coexist via Next.js route groups; login pages (`/login`, `/admin-login`) bypass layout wrappers

### Data Layer
- **ORM**: Prisma with PostgreSQL (Neon cloud database)
- **Database**: Schema in `prisma/schema.prisma` includes User, Product, Order, Payment, Category models
- **NextAuth Integration**: Custom Account/Session/VerificationToken tables for OAuth (Google, LINE) + credentials login

### Authentication Flow
- `middleware.ts` protects `/admin/*` routes using NextAuth JWT tokens
- Unauthenticated admin access redirects to `/admin-login` with `callbackUrl` parameter
- Frontend uses `SessionProviderWrapper` + `AntdConfigProvider` in root layout
- Auth config in `lib/auth/options.ts` with Zod validation for credentials

### Payment Integration (Pages Router)
- **ECPay**: `pages/api/ecpay.ts` - Native crypto implementation for CheckMacValue generation (no SDK)
- **LINE Pay**: `pages/api/linepay/index.ts` - Request/confirm flow with HMAC-SHA256 signature
- Both use Pages Router (`pages/api/`) for Node.js runtime compatibility, NOT App Router API routes

### State Management
- **Zustand**: `lib/cartStore.ts` with persist middleware for localStorage cart sync
- Admin dashboard uses SWR for data fetching with Ant Design Pro Table components

## Critical Developer Workflows

### Database Management
```bash
npm run db:sync          # Migration + seed (快速同步)
npm run db:reset         # Reset + reseed (完整重建)
npm run prisma:migrate   # Migration only
npm run prisma:seed      # Seed only
```

### Seed Data Accounts
Located in `prisma/seed.js`:
- Admin: `admin@example.com / admin1234`
- Manager: `manager@example.com / manager1234` 
- Viewer: `viewer@example.com / viewer1234`

### Build Process
```bash
npm run build            # Runs `prisma generate` BEFORE Next.js build
```

### Environment Variables
See `.env.example` for complete list. Key patterns:
- `NEXT_PUBLIC_*` prefix required for client-side access (e.g., `NEXT_PUBLIC_LINE_CHANNEL_ID`)
- `LINE_CHANNEL_SECRET`, `ECPAY_HASH_KEY/IV` must remain server-only
- `DATABASE_URL` points to Neon PostgreSQL (see `NEON-SETUP.md`)

## Project-Specific Conventions

### File Organization
- **Components**: `components/{admin,frontend,providers,ui}` - Domain-separated UI
- **API Routes**: Mock data in `app/api/mock/*`, payment in `pages/api/*`
- **Lib**: `lib/auth/`, `lib/prisma.ts`, `lib/cartStore.ts` - Shared utilities

### React Directives
- **All admin pages**: Start with `'use client'` (Ant Design components require client rendering)
- **All frontend pages**: Use `"use client"` (interactive features like cart, forms)
- Server components limited to static content only

### Styling
- **Tailwind CSS** for frontend layouts (`globals.css`)
- **Ant Design** for admin dashboard with custom table hover styles (e.g., `orders-table-hover.css`)
- AntdConfigProvider sets `zh_TW` locale + custom theme tokens globally

### Database Patterns
- Auto-increment integer IDs for all models
- `created_at`/`updated_at` fields are optional `DateTime?`
- Use Prisma's `upsert` in seeds to avoid duplicate errors
- Foreign keys use Prisma relation syntax (e.g., `user User @relation(fields: [user_id], references: [id])`)

## Integration Points

### NextAuth Callbacks
`lib/auth/options.ts` extends JWT token with custom `role` field:
```typescript
async jwt({ token, user }) {
  if (user) token.role = (user as any).role;
  return token;
}
```

### Payment Gateway Callbacks
- ECPay `ReturnURL` receives POST notifications (verify CheckMacValue)
- LINE Pay requires `confirmUrl`/`cancelUrl` in request body
- Both gateways log full request/response to console for debugging

### LINE Login Setup
- Requires `LINE_CHANNEL_ID`, `LINE_CHANNEL_SECRET` in `.env`
- Callback URL must match LINE Developers Console exactly
- Frontend constructs OAuth URL manually with `scope=profile%20openid%20email`
- See `LINE-API-SETUP.md` for developer invitation and channel status

### Neon PostgreSQL
- Cloud-hosted PostgreSQL with automatic connection pooling
- Use Neon dashboard "Tables" for visual inspection, "SQL Editor" for queries
- Migration strategy: `prisma migrate dev` auto-syncs schema changes
- See `NEON-SETUP.md` for production deployment checklist

## Common Patterns

### Admin Table Pages
1. Use `'use client'` directive
2. Fetch data with SWR: `useSWR('/api/mock/products')`
3. Render with Ant Design `<Table>` + custom hover CSS
4. Wrap in `PageContainer` from `app/admin/components/`

### Frontend Product Display
1. Use Zustand `useCartStore()` for cart operations
2. Products fetch from `/api/mock/products` or Prisma query
3. Layout uses `<Header>` and `<Footer>` from `components/frontend/`

### Payment Flow
1. Frontend creates order → calls `POST /api/ecpay` or `/api/linepay`
2. API generates signed form/redirect URL
3. User completes payment on gateway
4. Gateway POSTs to `notify` endpoint → update Payment table
5. Redirect to `/order/success` or `/order/fail`

## Key Files Reference
- `prisma/schema.prisma` - Source of truth for data models
- `middleware.ts` - Admin route protection logic
- `lib/auth/options.ts` - NextAuth provider + callback config
- `pages/api/ecpay.ts` - ECPay CheckMacValue algorithm
- `pages/api/linepay/index.ts` - LINE Pay request signature
- `app/layout.tsx` - Root providers (SessionProviderWrapper + AntdConfigProvider)
- `README.md` - Command reference and module overview

## Anti-Patterns to Avoid
- ❌ Don't use App Router (`app/api/`) for payment APIs (use `pages/api/`)
- ❌ Don't expose secrets with `NEXT_PUBLIC_` prefix
- ❌ Don't modify Prisma schema without running migration
- ❌ Don't skip `prisma generate` before build (automated in `npm run build`)
- ❌ Don't use SERVER components in admin dashboard (Ant Design requires client)
