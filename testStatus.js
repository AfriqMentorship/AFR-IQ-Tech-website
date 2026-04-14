const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const envContent = fs.readFileSync('./frontend/.env', 'utf-8');
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.*)/)?.[1];
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('orders').select('status').limit(10);
  console.log("Existing statuses:", data, error);

  // Try to update one to rejected (which fails for the user)
  if (data && data.length > 0) {
      const failTest = await supabase.from('orders').update({status: 'rejected'}).eq('id', 'some-fake-id');
      console.log("Rejected test:", failTest.error);
      const failTest2 = await supabase.from('orders').update({status: 'cancelled'}).eq('id', 'some-fake-id');
      console.log("Cancelled test:", failTest2.error);
  }
}
test();
