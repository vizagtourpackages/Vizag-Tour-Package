const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    await client.query(`ALTER TABLE hotels_resorts RENAME COLUMN show_in_araku TO show_on_araku`);
    await client.query(`ALTER TABLE hotels_resorts RENAME COLUMN show_in_lambasingi TO show_on_lambasingi`);
    await client.query(`ALTER TABLE hotels_resorts RENAME COLUMN show_in_vanjangi TO show_on_vanjangi`);
    await client.query(`ALTER TABLE tour_packages DROP COLUMN IF EXISTS show_in_araku`);
    await client.query(`ALTER TABLE tour_packages DROP COLUMN IF EXISTS show_in_lambasingi`);
    await client.query(`ALTER TABLE tour_packages DROP COLUMN IF EXISTS show_in_vanjangi`);
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    console.log("Success");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}
run();
