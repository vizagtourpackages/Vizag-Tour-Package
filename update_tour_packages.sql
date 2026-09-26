-- Add drop_location to tour_packages
ALTER TABLE tour_packages 
ADD COLUMN IF NOT EXISTS drop_location TEXT DEFAULT 'Visakhapatnam (Vizag)';

-- Add pickup and drop location to package_bookings so it is saved
ALTER TABLE package_bookings
ADD COLUMN IF NOT EXISTS pickup_location TEXT DEFAULT 'Visakhapatnam (Vizag)',
ADD COLUMN IF NOT EXISTS drop_location TEXT DEFAULT 'Visakhapatnam (Vizag)';

-- Update existing tour packages to use 'Per Couple' instead of 'Per Person'
UPDATE tour_packages
SET price_label = 'Per Couple'
WHERE price_label ILIKE '%per person%';
