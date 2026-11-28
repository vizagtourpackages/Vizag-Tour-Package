-- Maredumilli destination page. Safe to run more than once.
INSERT INTO destination_pages (id, name, tagline, description, highlights, best_time_to_visit, distance, elevation)
VALUES (
  'maredumilli',
  'Maredumilli',
  'Forest Escape in the Eastern Ghats',
  'Maredumilli is a forest getaway in the Eastern Ghats, in the Alluri Sitarama Raju district of Andhra Pradesh. Known for dense woodland, streams, waterfalls, hill viewpoints and eco-tourism, it makes a relaxed nature trip from Vizag.',
  ARRAY[
    'Jalatarangini Waterfalls — a forest waterfall reached by a short walk',
    'Amruthadhara Waterfalls — a quiet cascade surrounded by trees',
    'Rampa Waterfalls — a popular stop on the forest route',
    'Gudisa viewpoint — open grassland hilltop known for sunrise and clouds',
    'Bamboo chicken — the local speciality cooked in bamboo'
  ],
  'October to February',
  'About 200 km from Vizag',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- Let signed-in admins create and edit destination pages
DROP POLICY IF EXISTS "Admin manage destination pages" ON destination_pages;
CREATE POLICY "Admin manage destination pages" ON destination_pages
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
