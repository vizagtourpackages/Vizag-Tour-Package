CREATE TABLE IF NOT EXISTS travel_trust_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS travel_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data for trust points
INSERT INTO travel_trust_points (icon, label, display_order) VALUES 
('Shield', 'Verified Drivers', 1),
('Car', 'Clean Vehicles', 2),
('MapPin', 'GPS Tracking', 3),
('Clock', '24/7 Service', 4);

-- Seed data for notes
INSERT INTO travel_notes (title, description, display_order) VALUES 
('Note', 'All our vehicles are thoroughly sanitized before and after every trip. We ensure a safe and comfortable journey for all our passengers.', 1);

-- RLS for travel_trust_points
ALTER TABLE travel_trust_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on travel_trust_points" ON travel_trust_points FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users full access on travel_trust_points" ON travel_trust_points FOR ALL USING (auth.role() = 'authenticated');

-- RLS for travel_notes
ALTER TABLE travel_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on travel_notes" ON travel_notes FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users full access on travel_notes" ON travel_notes FOR ALL USING (auth.role() = 'authenticated');
