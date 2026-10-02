ALTER TABLE hotels_resorts RENAME COLUMN show_in_araku TO show_on_araku;
ALTER TABLE hotels_resorts RENAME COLUMN show_in_lambasingi TO show_on_lambasingi;
ALTER TABLE hotels_resorts RENAME COLUMN show_in_vanjangi TO show_on_vanjangi;

-- We should also drop the duplicate show_in_ columns from tour_packages if they exist
ALTER TABLE tour_packages DROP COLUMN IF EXISTS show_in_araku;
ALTER TABLE tour_packages DROP COLUMN IF EXISTS show_in_lambasingi;
ALTER TABLE tour_packages DROP COLUMN IF EXISTS show_in_vanjangi;

-- Also reload the schema cache so postgREST recognizes the rename
NOTIFY pgrst, 'reload schema';
