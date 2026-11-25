-- =====================================================================
-- Hotels: area (Vizag / Araku Valley / Lambasingi / Vanjangi), Vizag is the default
-- =====================================================================
ALTER TABLE hotels_resorts
  ADD COLUMN IF NOT EXISTS area TEXT DEFAULT 'vizag';

-- Backfill from the old "show on page" flags (one area per hotel)
UPDATE hotels_resorts
SET area = CASE
  WHEN COALESCE(show_in_araku, false)      THEN 'araku-valley'
  WHEN COALESCE(show_in_lambasingi, false) THEN 'lambasingi'
  WHEN COALESCE(show_in_vanjangi, false)   THEN 'vanjangi'
  ELSE 'vizag'
END
WHERE area IS NULL OR area = 'vizag';

-- =====================================================================
-- Packages: which area each night is spent in, e.g. ["araku-valley","lambasingi"]
-- =====================================================================
ALTER TABLE tour_packages
  ADD COLUMN IF NOT EXISTS stay_plan JSONB DEFAULT '[]'::jsonb;

-- =====================================================================
-- Blog
-- =====================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,

  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  cover_alt TEXT,
  author_name TEXT DEFAULT 'Vizag Tour Packages',
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  reading_minutes INTEGER,

  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  noindex BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts (category);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public view published blog posts" ON blog_posts;
CREATE POLICY "Public view published blog posts" ON blog_posts
  FOR SELECT USING (is_published = true AND (published_at IS NULL OR published_at <= NOW()));

DROP POLICY IF EXISTS "Admin full access blog posts" ON blog_posts;
CREATE POLICY "Admin full access blog posts" ON blog_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

NOTIFY pgrst, 'reload schema';

-- Optional clean-up once you are happy (the per-package "Package Hotels" list was removed from the admin):
--   DROP TABLE IF EXISTS package_hotels;
