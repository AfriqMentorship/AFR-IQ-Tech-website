const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zduinbfmxqddquedobqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const { data, error } = await supabase.from('products').insert([
    {
      name: "Test Product",
      category: "Laptops",
      price: 999,
      icon: "💻",
      stock: 5,
      specs: ["Test Spec"]
    }
  ]);
  console.log({data, error});
}
testInsert();
