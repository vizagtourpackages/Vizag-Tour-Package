-- Accommodation types with images + price per hotel (Non AC / Deluxe AC / Premium AC)
ALTER TABLE resort_room_types
  ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Hotels attached to a tour package (list of hotels_resorts ids) + admin ordering
ALTER TABLE tour_packages
  ADD COLUMN IF NOT EXISTS resort_ids JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS home_order INTEGER DEFAULT 0;

-- Packages / hotels attached to destination pages + rich content
ALTER TABLE destination_pages
  ADD COLUMN IF NOT EXISTS package_ids JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS hotel_ids JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS content TEXT;

-- Rich text content (HTML) for detail pages
ALTER TABLE top_destinations ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE places_to_visit ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE hotels_resorts ADD COLUMN IF NOT EXISTS content TEXT;

-- Travel guides: indexed pages
ALTER TABLE travel_guides
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS content TEXT,
  ADD COLUMN IF NOT EXISTS excerpt TEXT;

-- Backfill slugs for existing guides (duplicates get a short id suffix)
UPDATE travel_guides g
SET slug = base.slug || CASE WHEN base.rn > 1 THEN '-' || substr(g.id::text, 1, 6) ELSE '' END
FROM (
  SELECT id,
         trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')) AS slug,
         row_number() OVER (
           PARTITION BY trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'))
           ORDER BY created_at
         ) AS rn
  FROM travel_guides
) base
WHERE g.id = base.id AND g.slug IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS travel_guides_slug_key ON travel_guides (slug) WHERE slug IS NOT NULL;

NOTIFY pgrst, 'reload schema';
