async function listTables() {
  const url = 'https://zduinbfmxqddquedobqr.supabase.co/rest/v1/';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM'
  };

  try {
    const response = await fetch(url, { headers });
    const spec = await response.json();
    console.log("Tables available:", Object.keys(spec.definitions));
  } catch (e) {
    console.error(e);
  }
}
listTables();
