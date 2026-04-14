import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkConstraints() {
  const { data, error } = await supabase.rpc('get_table_info', { t_name: 'order_items' }); 
  console.log(data, error);
}
// Actually, easier is just querying information_schema if I can, but I can't via JS SDK directly easily without a custom function.
// I'll just try to fetch some order items to confirm it's working.
async function checkOrderItems() {
  const { data, error } = await supabase.from('order_items').select('*').limit(1);
  console.log(data, error);
}
checkOrderItems();
