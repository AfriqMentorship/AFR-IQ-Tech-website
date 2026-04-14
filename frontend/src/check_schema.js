import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zduinbfmxqddquedobqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('orders').select('*').limit(1);
  if (error) {
    console.error('Error fetching orders:', error.message);
  } else if (data && data.length > 0) {
    console.log('Columns in "orders":', Object.keys(data[0]));
  } else {
    console.log('No data in "orders" yet.');
    // Check order_items too
    const { data: itemData } = await supabase.from('order_items').select('*').limit(1);
    if (itemData && itemData.length > 0) {
        console.log('Columns in "order_items":', Object.keys(itemData[0]));
    }
  }
}
check();
