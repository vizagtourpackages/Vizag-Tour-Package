-- Create site_settings table to store global configurations
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT
);

-- Insert the default value for the trusted partners section
INSERT INTO site_settings (key, value)
VALUES ('show_trusted_partners', 'true')
ON CONFLICT (key) DO NOTHING;

-- Set up RLS policies (allow public read, admin write)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on site_settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to insert site_settings"
  ON site_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update site_settings"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
