ALTER TABLE tour_packages DROP COLUMN IF EXISTS price_per_couple;
ALTER TABLE tour_packages RENAME COLUMN mrp TO original_price;
