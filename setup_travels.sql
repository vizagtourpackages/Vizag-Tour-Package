-- Create travels table
CREATE TABLE public.travels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model TEXT NOT NULL,
    price_per_km TEXT NOT NULL,
    pax INTEGER NOT NULL,
    amenities TEXT[] NOT NULL DEFAULT '{}',
    image TEXT NOT NULL,
    min_km_note TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.travels ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.travels
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.travels
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.travels
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON public.travels
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert initial data
INSERT INTO public.travels (model, price_per_km, pax, amenities, image, min_km_note, display_order) VALUES
('New Baleno', '₹14', 4, '{"AC", "Music System"}', '/images/fleet/swift-dzire.jpg', 'Applies for min 300 km during outstation round trip', 1),
('Swift Dzire', '₹14', 4, '{"AC", "Music System"}', '/images/fleet/swift-dzire.jpg', 'Applies for min 300 km during outstation round trip', 2),
('Toyota Glanza', '₹14', 4, '{"AC", "Music System"}', '/images/fleet/toyota-glanza.jpg', 'Applies for min 300 km during outstation round trip', 3),
('Ertiga', '₹18', 6, '{"AC", "Music System"}', '/images/fleet/ertiga.jpg', 'Applies for min 300 km during outstation round trip', 4),
('Kia Carens', '₹18', 6, '{"AC", "Music System"}', '/images/fleet/ertiga.jpg', 'Applies for min 300 km during outstation round trip', 5),
('Innova', '₹18', 7, '{"AC", "Music System", "Bottle Water"}', '/images/fleet/innova.jpg', 'Applies for min 300 km during outstation round trip', 6),
('Innova Crysta', '₹20', 7, '{"AC", "Bottle Water"}', '/images/fleet/innova.jpg', 'Applies for min 300 km during outstation round trip', 7),
('Tempo Traveller 12 Seater', '₹25', 12, '{"AC", "Push-back Seats", "Music System"}', '/images/fleet/tempo-traveller.jpg', 'Applies for min 300 km during outstation round trip', 8),
('Tempo Traveller 17 Seater', '₹30', 17, '{"AC", "Push-back Seats", "Music System"}', '/images/fleet/tempo-traveller.jpg', 'Applies for min 300 km during outstation round trip', 9),
('Urbania 16+1', '₹35', 16, '{"AC", "Push-back Seats", "Charging Points"}', '/images/fleet/tempo-traveller.jpg', 'Applies for min 300 km during outstation round trip', 10),
('Bus 40 Seater', '₹65', 40, '{"AC", "Push-back Seats", "Music System", "Charging Points"}', '/images/fleet/tempo-traveller.jpg', 'Applies for min 300 km during outstation round trip', 11);
