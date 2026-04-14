import { supabase } from './src/supabaseClient.js';

async function run() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error("Error from users:", error);
    } else {
        console.log("Users fetched:", data.length);
        console.log(data);
    }
}
run();
