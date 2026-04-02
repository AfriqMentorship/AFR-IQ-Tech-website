import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zduinbfmxqddquedobqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking talented table...");
  const { error: tableError } = await supabase.from('talented').select('id').limit(1);
  if (tableError) {
    if (tableError.code === 'PGRST116' || tableError.code === '42P01') {
      console.error("Table 'talented' DOES NOT EXIST.");
    } else {
      console.error("Table 'talented' error:", tableError.message, tableError.code);
    }
  } else {
    console.log("Table 'talented' exists.");
  }

  console.log("Checking talented_cvs bucket...");
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.error("Bucket list failed:", bucketError.message);
  } else {
    const exists = buckets.find(b => b.name === 'talented_cvs');
    if (exists) {
      console.log("Bucket 'talented_cvs' exists.");
    } else {
      console.error("Bucket 'talented_cvs' DOES NOT EXIST.");
    }
  }
}

check();
