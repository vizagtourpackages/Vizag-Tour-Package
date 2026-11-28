-- Site settings: let signed-in admins save them, and drop the removed "partners" settings.
-- Safe to run more than once.
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read settings" ON site_settings;
CREATE POLICY "Public read settings" ON site_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage settings" ON site_settings;
CREATE POLICY "Admin manage settings" ON site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DELETE FROM site_settings WHERE key IN ('show_trusted_partners', 'trusted_partners_list');
