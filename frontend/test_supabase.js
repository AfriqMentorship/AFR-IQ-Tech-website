import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const envPath = path.resolve(__dirname, '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  let url = '';
  let key = '';
  lines.forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) url = line.split('=')[1].trim();
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
  });
  
  const supabase = createClient(url, key);

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
    console.log("Data:", data);
  }
  
  test();
} catch (e) {
  console.log("Failed reading env:", e);
}
