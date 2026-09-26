-- Create custom_enquiries table
CREATE TABLE IF NOT EXISTS custom_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    adults INTEGER DEFAULT 2,
    children INTEGER DEFAULT 0,
    destinations TEXT[] DEFAULT '{}',
    special_requirements TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'closed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE custom_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public insertion
CREATE POLICY "Public can insert custom enquiries"
    ON custom_enquiries FOR INSERT
    WITH CHECK (true);

-- Allow admin management
CREATE POLICY "Admin can manage custom enquiries"
    ON custom_enquiries FOR ALL
    USING (true); -- Replace with proper admin check if needed
