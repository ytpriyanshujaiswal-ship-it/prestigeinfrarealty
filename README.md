# Prestige Infra Realty — Website Demo

A responsive Next.js website starter for Prestige Infra Realty. Built for GitHub upload and deployment testing.

## What is included

- Premium, responsive homepage with location/property/budget search.
- Trending, residential, villas & plots, and commercial listing sections with horizontally scrollable cards.
- Individual sample project detail pages with enquiry form, amenities, 3D viewer placeholder, and location placeholder.
- Demo contact forms. Submitted enquiries are saved **only in the current browser's local storage**.
- `/admin` demo page to view/export those local demo enquiries as CSV.
- TypeScript and Next.js App Router.

## Important before public launch

This is a first-stage frontend prototype, **not a production-ready property platform or secure CMS**.

- Listing names, images, locations, sizes, statuses, BSP rates, and prices are illustrative demo content. Verify or replace every listing before publishing.
- Replace the demo phone number (`+91 99999 99999`) with your real business number.
- Contact enquiries are not sent to your email, server, CRM, or phone. They remain in the browser that submitted the form.
- `/admin` has no authentication and must not be treated as a private admin panel. Do not collect real customer data with this demo.
- No database, CRM connector, Meta Ads/99acres/Housing.com lead connector, real map, real RERA verification, or working 3D model upload is connected yet.
- Images currently use remote Unsplash URLs and Google Fonts; an internet connection is needed to load them.
- Add privacy policy, terms, consent handling, backend validation, authenticated admin access, database, backups, spam protection and secure file upload before production.

## Run locally

Install Node.js 20 or newer, then from this folder run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To test a production build:

```bash
npm run build
npm start
```

## Upload to GitHub

1. Create a new empty repository on GitHub.
2. Extract this ZIP on your computer.
3. Upload the files and folders inside `prestige-infra-realty` to the repository root (including `package.json`).
4. Commit and push.

## Deploy for live testing (Vercel)

1. Sign in to Vercel and import the GitHub repository.
2. Let Vercel detect Next.js automatically.
3. Keep the default build command `npm run build` and output settings.
4. Deploy. Vercel will provide a temporary live URL.

You can also deploy through another host that supports Next.js. If you use static hosting only, dynamic routing and deployment support may differ.

## Updating demo listings

Edit `lib/properties.ts`. The `properties` array is the current demo data source. For the next stage, this should be replaced with a database-backed project manager and secure CMS rather than editing source code for routine updates.

## Suggested next development stage

1. Secure owner/admin login.
2. Database-backed project and content management with draft/preview/publish.
3. Media uploads, brochures, floor plans and `.glb`/`.gltf` model publishing per project.
4. Live enquiry storage, CSV export from the server, lead status/history, and CRM/webhook integration.
5. Real map/nearby-place data, SEO controls, analytics and backups.
