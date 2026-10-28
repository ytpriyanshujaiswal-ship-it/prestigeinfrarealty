-- Run this SQL in Neon SQL Editor before enabling database-backed CMS.
CREATE TABLE IF NOT EXISTS projects (id text PRIMARY KEY, name text NOT NULL, location text NOT NULL DEFAULT '', category text NOT NULL DEFAULT 'Residential', status text NOT NULL DEFAULT 'Under Construction', description text NOT NULL DEFAULT '', rera text, media jsonb NOT NULL DEFAULT '[]'::jsonb, amenities jsonb NOT NULL DEFAULT '[]'::jsonb, configurations jsonb NOT NULL DEFAULT '[]'::jsonb, map_url text, model_3d_url text, published boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS leads (id bigserial PRIMARY KEY, name text NOT NULL, phone text NOT NULL, email text, project_id text, configuration text, area_sqft integer, budget text, message text, source text NOT NULL DEFAULT 'website', activity jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS site_content (key text PRIMARY KEY, value jsonb NOT NULL DEFAULT '{}'::jsonb, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS admin_accounts (email text PRIMARY KEY, password_hash text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
-- Extra fields used by the admin project CRUD editor
ALTER TABLE projects ADD COLUMN IF NOT EXISTS price text NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS bsp numeric NOT NULL DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS size text NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS config text NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image text NOT NULL DEFAULT '';
