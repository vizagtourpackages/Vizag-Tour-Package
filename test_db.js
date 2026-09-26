require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ key: 'test', value: 'test' });
  console.log('Error:', error);
  console.log('Data:', data);
}
test();
