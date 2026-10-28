# Prestige Infra Realty

## Admin project CRUD + Neon setup

1. In Neon SQL Editor, run the entire `db/schema.sql` file. It creates the CMS tables and adds the fields required by project management.
2. Add these environment variables to **both Vercel and Render** if the app is deployed to both: `DATABASE_URL` (Neon pooled connection string), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a long random `SESSION_SECRET`.
3. Set `ADMIN_EMAIL=Prestigeinfrearealty@login.com`. Set `ADMIN_PASSWORD` to a strong password you control. Do not commit `.env` files or database credentials to GitHub.
4. Deploy the latest code. Open `/admin`, sign in, then use **Add project**, **Edit**, or **Delete**. Project changes are stored in Neon, not localStorage.
5. In project editor, image/video entries are currently entered as URL strings in the Media JSON array. Direct file uploads need a cloud storage provider such as Cloudinary or S3 and its credentials; this package does not pretend URL fields are direct uploads.

## Render
- Runtime: Node
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Root directory: repository root (or the directory containing this package.json)

## Important status
The admin project CRUD endpoints use server-side signed session cookies and Neon SQL. The current homepage/property catalogue is still partly sourced from `lib/properties.ts`; publishing CRUD records does not yet automatically replace every public listing or connect every CMS section. Do not treat the whole requested CMS as complete. Test a deployment and database connection before using it with live customer data.
