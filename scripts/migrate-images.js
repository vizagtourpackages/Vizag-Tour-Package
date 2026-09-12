require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// NOTE: You should use a SERVICE ROLE key for the script if RLS policies block anonymous updates.
// Since we only have the anon key in .env, ensure your RLS allows these updates or replace
// the key below with a service role key temporarily.
const supabase = createClient(supabaseUrl, supabaseKey);

const OLD_SUPABASE_URL_PREFIX = `${supabaseUrl}/storage/v1/object/public`;
const NEW_R2_URL_PREFIX = process.env.NEXT_PUBLIC_R2_PUBLIC_URL; // e.g., 'https://images.yourdomain.com'

const TABLES_TO_UPDATE = [
  'tour_packages',
  'hotels_resorts',
  'top_destinations',
  'places_to_visit',
  'hill_station_escapes',
  'travel_guides',
  'upcoming_events',
  'latest_updates_offers'
];

async function migrateImages() {
  if (!NEW_R2_URL_PREFIX) {
    console.error('Error: NEXT_PUBLIC_R2_PUBLIC_URL is not set in environment variables.');
    return;
  }

  console.log(`Starting migration...`);
  console.log(`Replacing: ${OLD_SUPABASE_URL_PREFIX}`);
  console.log(`With:      ${NEW_R2_URL_PREFIX}`);
  console.log('---');

  for (const table of TABLES_TO_UPDATE) {
    console.log(`Processing table: ${table}`);
    
    // 1. Fetch all records that have an image_url containing the old prefix
    const { data, error } = await supabase
      .from(table)
      .select('id, image_url')
      .like('image_url', `%${OLD_SUPABASE_URL_PREFIX}%`);
      
    if (error) {
      console.error(`Error fetching from ${table}:`, error.message);
      continue;
    }

    if (!data || data.length === 0) {
      console.log(`  No records found needing update in ${table}.`);
      continue;
    }

    console.log(`  Found ${data.length} records to update in ${table}.`);

    // 2. Update each record
    let updatedCount = 0;
    for (const record of data) {
      // The image_url might look like: https://[...].supabase.co/storage/v1/object/public/bucket_name/folder/image.jpg
      // We want to replace it with: https://images.yourdomain.com/folder/image.jpg
      // Note: The old URL includes the bucket name, which we might want to strip out depending on the R2 setup.
      // Usually, R2 custom domains map directly to the bucket, so the URL is just domain.com/folder/image.jpg.
      
      // Let's assume the bucket name is 'tour-images' and it's part of the old URL.
      // E.g., .../public/tour-images/folder/image.jpg -> https://images.yourdomain.com/folder/image.jpg
      
      // Simple string replace:
      const newImageUrl = record.image_url.replace(
        OLD_SUPABASE_URL_PREFIX, 
        NEW_R2_URL_PREFIX
      );

      // We might need to adjust this depending on if the bucket name is included in the new R2 path or not.
      // By default, a custom domain attached to a Cloudflare R2 bucket points directly to the root of the bucket.
      // So if the old URL was .../public/tour-images/destination/img.jpg
      // and the new URL should be https://images.domain.com/destination/img.jpg
      // we need to remove the bucket name from the path as well.

      const urlObj = new URL(record.image_url);
      const pathParts = urlObj.pathname.split('/'); 
      // e.g., ['', 'storage', 'v1', 'object', 'public', 'tour-images', 'destination', 'img.jpg']
      
      // The bucket name is usually at index 5. The rest is the folder structure.
      const bucketNameIndex = pathParts.indexOf('public') + 1;
      const objectPath = pathParts.slice(bucketNameIndex + 1).join('/'); // 'destination/img.jpg'

      const finalNewUrl = `${NEW_R2_URL_PREFIX}/${objectPath}`;

      const { error: updateError } = await supabase
        .from(table)
        .update({ image_url: finalNewUrl })
        .eq('id', record.id);

      if (updateError) {
        console.error(`  Error updating record ${record.id}:`, updateError.message);
      } else {
        updatedCount++;
      }
    }
    
    console.log(`  Successfully updated ${updatedCount} records in ${table}.`);
  }

  console.log('---');
  console.log('Migration complete!');
}

migrateImages();
