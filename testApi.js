const SUPABASE_URL = 'https://zduinbfmxqddquedobqr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM';

async function run() {
    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };

    // Academy Enrollments test
    const acRes = await fetch(`${SUPABASE_URL}/rest/v1/academy_enrollments?status=eq.Pending&limit=1`, { headers });
    const acItems = await acRes.json();
    if (acItems && acItems.length > 0) {
        const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/academy_enrollments?id=eq.${acItems[0].id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ status: 'Rejected' })
        });
        const err = await updateRes.json();
        console.log("Academy Update to Rejected:", err);
    } else {
        console.log("No pending academy enrollments to test.");
    }

    // Orders test
    const orRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?status=eq.pending&limit=1`, { headers });
    const orItems = await orRes.json();
    if (orItems && orItems.length > 0) {
        for (let target of ['rejected', 'cancelled', 'cancelled']) {
            const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${orItems[0].id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ status: target })
            });
            const err = await updateRes.json();
            console.log(`Orders Update to ${target}:`, err);
        }
    } else {
        console.log("No pending orders to test.");
    }
}
run();
