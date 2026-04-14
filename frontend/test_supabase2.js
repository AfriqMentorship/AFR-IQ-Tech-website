import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zduinbfmxqddquedobqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing insert...");
  const { data, error } = await supabase.from('academy_enrollments').insert([{
    full_name: 'Test Kuteesa moses',
    email: 'kuteesamoses27@gmail.com',
    phone: '+256704749993',
    course_title: 'Website Development',
    course_duration: '8 Weeks',
    course_price: 'UGX 450,000',
    mode_of_study: 'Physical',
    start_date: '03/17/2026',
    message: null,
    status: 'Pending'
  }]);

  console.log("Error:", error);
}

test();
