-- Create promo_banner table
CREATE TABLE IF NOT EXISTS promo_banner (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge_text TEXT NOT NULL,
    headline TEXT NOT NULL,
    description TEXT,
    offer_end_datetime TIMESTAMPTZ,
    cta_text TEXT NOT NULL,
    cta_link TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create promo_banner_images table
CREATE TABLE IF NOT EXISTS promo_banner_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    banner_id UUID REFERENCES promo_banner(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE promo_banner ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_banner_images ENABLE ROW LEVEL SECURITY;

-- Policies for promo_banner
CREATE POLICY "Public can view active promo banners"
    ON promo_banner FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admin can manage promo banners"
    ON promo_banner FOR ALL
    USING (true); -- Replace with proper admin check if needed

-- Policies for promo_banner_images
CREATE POLICY "Public can view images of active promo banners"
    ON promo_banner_images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM promo_banner
            WHERE promo_banner.id = promo_banner_images.banner_id
            AND promo_banner.is_active = true
        )
    );

CREATE POLICY "Admin can manage promo banner images"
    ON promo_banner_images FOR ALL
    USING (true); -- Replace with proper admin check if needed

-- Insert a sample banner
INSERT INTO promo_banner (badge_text, headline, description, offer_end_datetime, cta_text, cta_link, is_active)
VALUES (
    '🔥 FLAT 20% OFF',
    'Araku 1 Day Trip – Just ₹4,999/- for 4 Persons',
    'Borra Caves, Katiki Waterfalls, Pets & Wings, Wooden Bridge & More',
    NOW() + INTERVAL '2 days',
    'Book Now',
    '/tour-packages/araku-valley',
    true
);

-- Insert sample images for the banner
WITH new_banner AS (
    SELECT id FROM promo_banner LIMIT 1
)
INSERT INTO promo_banner_images (banner_id, image_url, display_order)
SELECT id, 'https://images.unsplash.com/photo-1542319630-55fb7f7c944a', 0 FROM new_banner
UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1506461883276-594543eb36b2', 1 FROM new_banner;
