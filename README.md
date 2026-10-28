# Prestige Infra Realty — website + owner CMS

## Stack
Next.js 14, React, TypeScript, Neon PostgreSQL. Admin APIs use signed, HTTP-only session cookies. Website enquiries are written to Neon rather than browser localStorage.

## Required setup
1. In Neon SQL Editor, run the **entire current `db/schema.sql`**. It is safe to re-run and adds lead workflow fields and audit logging. Do not run older snippets instead of this file.
2. In Render environment variables set `DATABASE_URL` (Neon connection string), `ADMIN_EMAIL`, `ADMIN_PASSWORD` (unique strong password) or preferably `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET` (random value, minimum 32 characters). Never commit real secrets to GitHub.
3. For persistent direct uploads, configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Without these, upload API intentionally returns a clear configuration error; it does not save uploads to Render's temporary filesystem.
4. Build command: `npm install && npm run build`. Start command: `npm start`.
5. Visit `/admin` and sign in. The CMS provides project CRUD, lead tracking/status/assignment/site visit notes, CSV export, homepage and dedicated-page draft/publish content, company/social settings, media uploads when Cloudinary is configured, and an audit log.

## Admin features
- Project inventory: create/edit/delete, draft/published state, RERA, media URLs, map/3D links, amenities and configuration-wise BSP.
- Leads: search/filter, update status, assignment, site-visit datetime and notes, export to Excel-compatible CSV.
- Website CMS: homepage content drafts and published JSON records, contact/social settings, and a media library record.
- Audit trail: login and admin changes recorded in `admin_audit_log`.
- Public website contact form POSTs to `/api/leads`; published database projects are available at `/api/projects`.

## Important honest limitations
- This is a practical CMS foundation, not a substitute for production security review. Rate limiting, CAPTCHA/spam prevention, 2FA, automated backups/restore, and full audit coverage for every setting/media mutation still need production hardening.
- Homepage text/settings connect to visible hero/promo/about/contact/footer areas. Dedicated About, Contact, FAQs, Privacy and Terms pages render published page content from Neon. These editors are structured JSON editors rather than drag-and-drop visual page builders; homepage section ordering is not yet a visual block editor.
- The property rails show published database projects first and retain clearly labelled sample listings as fallback/demo content. Remove or replace sample records before public launch.
- Media uploads use Cloudinary and require the credentials above. Upload size is capped at 25 MB.
- Run and verify the build/deployment and test the Neon connection before using live customer data.
