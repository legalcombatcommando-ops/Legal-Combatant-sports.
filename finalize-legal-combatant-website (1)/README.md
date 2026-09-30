# Legal Combatants: Combat Sports · Security · Law

Next.js 16 (App Router) + Drizzle ORM + PostgreSQL. Pages: home, the three niches (`/divisions/*`), the Founder's Corner (`/founders-corner`), fighter onboarding (`/join`), insights (`/journal`), privacy and disclaimer.

## Environment variables

Copy `.env.example` to `.env` (local) or add the same names in your host's environment settings. Never prefix secrets with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_PASSCODE` | For portrait upload | Protects `/admin/portrait`. If empty, uploads are switched off |
| `POSTGRES_PASSWORD` | Docker Compose only | Password for the bundled database |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public https origin, for share images, `sitemap.xml` and `robots.txt` |
| `DATABASE_SSL` | If your provider needs it | `true` for most managed PostgreSQL services |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Optional | Emails each new enquiry to `NOTIFICATION_EMAIL` |
| `WHATSAPP_*` | Optional | Reference-only WhatsApp alert through Meta Cloud API |

## Deploy option 1: Docker on any server (simplest)

```bash
cp .env.example .env        # set POSTGRES_PASSWORD, ADMIN_PASSCODE, NEXT_PUBLIC_SITE_URL
docker compose up -d --build
```

This starts PostgreSQL and the site. The container runs `scripts/migrate.mjs` (creates or updates tables, safe to repeat) and then the server on port 3000. Put Caddy, Nginx or Cloudflare in front for HTTPS. Health check: `GET /api/health`.

## Deploy option 2: a Node host (Render, Railway, Fly, a VPS)

1. Provision PostgreSQL and set `DATABASE_URL` (and `DATABASE_SSL=true` if required).
2. Build command: `npm ci && npm run build`
3. Start command: `node scripts/migrate.mjs && npx next start -H 0.0.0.0`
4. Health check path: `/api/health`. Node 22 recommended.

## Deploy option 3: Vercel

Use a hosted PostgreSQL (Neon, Supabase), set `DATABASE_URL` and `DATABASE_SSL=true`, and run `DATABASE_URL=... node scripts/migrate.mjs` once from your machine (and again after schema changes). The Founder's portrait is stored in PostgreSQL, so it works on read-only serverless hosting.

## The Founder's portrait

Two ways, no code changes:

1. **Upload (recommended):** open `/admin/portrait`, choose the photo (JPG, PNG or WebP, up to 6 MB), enter `ADMIN_PASSCODE`. It is stored in PostgreSQL and appears on the homepage and the Founder's Corner immediately.
2. **File:** save it as `public/images/founder-portrait.jpg` (or `.png`, `.webp`) and rebuild.

Until a portrait exists, a neutral placeholder is shown. The founder's name and roles are in `src/lib/founder.ts`.

## Enquiry alerts

Submissions are always saved to PostgreSQL (`inquiries`, `fighter_applications`) with delivery status `sent`, `failed` or `not_configured`. For automatic alerts:

- **Email:** create a Resend API key, verify a sending domain, set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. The recipient defaults to `legalcombatant001@gmail.com`.
- **WhatsApp:** set up a WhatsApp Business Cloud API number, an approved template with one body placeholder `{{1}}` (the reference), then set `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME`. The alert carries only the reference number, never profile details.

## Local development

```bash
npm install
node scripts/migrate.mjs   # or: npx drizzle-kit push
npm run dev
```

## Before going live

- Set a long private `ADMIN_PASSCODE`, then upload the portrait.
- Set `NEXT_PUBLIC_SITE_URL` to your real https domain.
- Have a lawyer review the privacy notice and disclaimer against your actual practice, licences and data handling.
- Only state accreditation or licensing you actually hold. Course and certification wording is deliberately conditional.
