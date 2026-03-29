import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zduinbfmxqddquedobqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDB() {
  console.log("Checking if users table has RLS...");
  const { data, error } = await supabase.from('users').select('*');
  console.log("Existing users:", data?.length, "Error:", error);
  
  if (data?.length === 0) {
      console.log("Trying to insert a dummy user to see if it allows inserts...");
      const { data: insData, error: insErr } = await supabase.from('users').insert({
          id: '00000000-0000-0000-0000-000000000000',
          email: 'dummy@test.com',
          full_name: 'Dummy User',
          phone: "123456",
          role: 'student'
      }).select();
      
      console.log("Insert Result:", insData, "Insert Error:", insErr);
  }
}
testDB();
