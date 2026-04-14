import { supabase } from './src/supabaseClient.js';

async function check() {
  const { data: tables, error: tableError } = await supabase.from('pg_catalog.pg_tables').select('tablename').eq('schemaname', 'public');
  if (tableError) {
    console.log("Table list error:", tableError.message);
  } else {
    console.log("Tables:", tables.map(t => t.tablename));
  }

  const { data: cols, error: colError } = await supabase.from('academy_enrollments').select('*').limit(1);
  if (colError) {
      console.log("Enrollments error:", colError.message);
  } else if (cols && cols.length > 0) {
      console.log("Enrollments columns:", Object.keys(cols[0]));
  } else {
      console.log("Enrollments table is empty.");
  }
}

check();
