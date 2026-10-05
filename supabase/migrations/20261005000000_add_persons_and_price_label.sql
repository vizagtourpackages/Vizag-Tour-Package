ALTER TABLE hotels_resorts
ADD COLUMN IF NOT EXISTS no_of_persons TEXT,
ADD COLUMN IF NOT EXISTS price_label TEXT DEFAULT 'per night';
