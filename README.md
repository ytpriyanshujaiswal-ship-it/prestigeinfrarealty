# Prestige Infra Realty — Next.js starter

## Render deployment
- Create a **Web Service** from this repository.
- Runtime: Node.
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Root directory: repository root (the folder containing `package.json`).
- The included `render.yaml` describes these defaults.

## Important current limitations
This ZIP improves the branded frontend and adds an owner-panel UI/login demo. It is **not yet a production CMS/backend**. Admin login and content settings are browser-local only, and the current lead list is localStorage-based. Do not use the demo credentials for a live, public admin panel or store real customer data yet. The frontend does not currently publish CMS edits to Vercel, nor does it connect lead storage/property editing to Neon. A separate authenticated API, hashed password storage, secure sessions, role checks, database schema/migrations, media storage, audit logs, and API integration still need to be implemented before production use.

## Local development
`npm install`
`npm run dev`

## Production build
`npm install && npm run build`
`npm start`
