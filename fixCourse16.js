const fs = require('fs');
const path = require('path');

const dir = 'frontend/public/courses';

async function download() {
  const url = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop';
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(path.join(dir, 'course_16.jpg'), Buffer.from(buffer));
  console.log('Saved course_16.jpg');
}
download();
