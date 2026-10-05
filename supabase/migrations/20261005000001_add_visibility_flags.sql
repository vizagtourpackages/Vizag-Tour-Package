ALTER TABLE tour_packages 
ADD COLUMN IF NOT EXISTS show_on_packages_page BOOLEAN DEFAULT true;

ALTER TABLE hotels_resorts 
ADD COLUMN IF NOT EXISTS show_on_resorts_page BOOLEAN DEFAULT true;
