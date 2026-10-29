-- Prestige Infra Realty CMS schema. Safe to run repeatedly in Neon.
CREATE TABLE IF NOT EXISTS projects (
 id text PRIMARY KEY, name text NOT NULL, location text NOT NULL DEFAULT '', category text NOT NULL DEFAULT 'Residential',
 status text NOT NULL DEFAULT 'Under Construction', description text NOT NULL DEFAULT '', rera text,
 media jsonb NOT NULL DEFAULT '[]'::jsonb, amenities jsonb NOT NULL DEFAULT '[]'::jsonb,
 configurations jsonb NOT NULL DEFAULT '[]'::jsonb, map_url text, model_3d_url text,
 published boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now(),
 price text NOT NULL DEFAULT '', bsp numeric NOT NULL DEFAULT 0, size text NOT NULL DEFAULT '', config text NOT NULL DEFAULT '', image text NOT NULL DEFAULT ''
);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS price text NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS bsp numeric NOT NULL DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS size text NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS config text NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image text NOT NULL DEFAULT '';
CREATE TABLE IF NOT EXISTS leads (
 id bigserial PRIMARY KEY, name text NOT NULL, phone text NOT NULL, email text, project_id text,
 configuration text, area_sqft integer, budget text, message text, source text NOT NULL DEFAULT 'website',
 activity jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(),
 status text NOT NULL DEFAULT 'New', assigned_to text, site_visit_at timestamptz, notes text
);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'New';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_to text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS site_visit_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes text;
CREATE TABLE IF NOT EXISTS site_content (key text PRIMARY KEY, value jsonb NOT NULL DEFAULT '{}'::jsonb, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS admin_accounts (email text PRIMARY KEY, password_hash text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS admin_audit_log (id bigserial PRIMARY KEY, actor text NOT NULL DEFAULT 'owner', action text NOT NULL, entity_type text NOT NULL, entity_id text, details jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS projects_published_idx ON projects(published, updated_at DESC);
CREATE INDEX IF NOT EXISTS admin_audit_created_at_idx ON admin_audit_log(created_at DESC);
