-- 1. Tour Packages
CREATE TABLE tour_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    price_label TEXT DEFAULT 'per person',
    duration TEXT NOT NULL,
    people TEXT NOT NULL,
    badge TEXT,
    highlights TEXT[],
    includes TEXT[],
    excludes TEXT[],
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- 2. Hotels & Resorts
CREATE TABLE hotels_resorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    category TEXT NOT NULL,
    rating NUMERIC,
    reviews INTEGER,
    location TEXT NOT NULL,
    latitude NUMERIC,
    longitude NUMERIC,
    price_per_night NUMERIC,
    whatsapp_link TEXT,
    cover_image_url TEXT NOT NULL,
    highlights TEXT[],
    amenities TEXT[],
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image_url TEXT,
    nearby_places JSONB
);

-- 2a. Resort Room Types
CREATE TABLE resort_room_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resort_id UUID NOT NULL REFERENCES hotels_resorts(id) ON DELETE CASCADE,
    room_type TEXT NOT NULL,
    price NUMERIC NOT NULL,
    has_ac BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true
);

-- 3. Top Destinations
CREATE TABLE top_destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    name TEXT NOT NULL,
    location TEXT,
    price TEXT,
    description TEXT,
    distance_km TEXT,
    duration TEXT,
    image_url TEXT NOT NULL
);

-- 4. Places to Visit
CREATE TABLE places_to_visit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    location TEXT,
    image_url TEXT NOT NULL
);

-- 5. Hill Station Escapes
CREATE TABLE hill_station_escapes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    location TEXT,
    image_url TEXT NOT NULL
);

-- 6. Travel Guides
CREATE TABLE travel_guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    items TEXT[],
    image_url TEXT NOT NULL
);

-- 7. Upcoming Events
CREATE TABLE upcoming_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    date TEXT,
    image_url TEXT NOT NULL
);

-- 8. Latest Updates & Offers
CREATE TABLE latest_updates_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    badge_text TEXT,
    date TEXT,
    image_url TEXT NOT NULL,
    link_text TEXT,
    href TEXT
);

-- 9. FAQs
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels_resorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE top_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE places_to_visit ENABLE ROW LEVEL SECURITY;
ALTER TABLE hill_station_escapes ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE upcoming_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE latest_updates_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resort_room_types ENABLE ROW LEVEL SECURITY;

-- 1. Public can read ONLY published items
CREATE POLICY "Public view published" ON tour_packages FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON hotels_resorts FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON top_destinations FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON places_to_visit FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON hill_station_escapes FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON travel_guides FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON upcoming_events FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON latest_updates_offers FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published" ON faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public view published room types" ON resort_room_types FOR SELECT USING (true);

-- 2. Authenticated Admin can do EVERYTHING
CREATE POLICY "Admin full access" ON tour_packages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON hotels_resorts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON top_destinations FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON places_to_visit FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON hill_station_escapes FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON travel_guides FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON upcoming_events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON latest_updates_offers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access" ON faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access room types" ON resort_room_types FOR ALL TO authenticated USING (true);

-- ==========================================
-- STORAGE SETUP
-- ==========================================

-- Create Bucket (requires superuser privileges in some environments, or create manually in UI)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view site-images
CREATE POLICY "Public view site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');

-- Admin can upload, update, delete
CREATE POLICY "Admin upload site-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images');
CREATE POLICY "Admin update site-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images');
CREATE POLICY "Admin delete site-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images');
