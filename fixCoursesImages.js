const fs = require('fs');
const path = require('path');

const dir = 'frontend/public/courses';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const downloads = [
  { name: 'course_8', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_16', url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf660ae?q=80&w=800&auto=format&fit=crop' }
];

async function download() {
  for (const d of downloads) {
    const res = await fetch(d.url);
    const buffer = await res.arrayBuffer();
    const filename = d.name + '.jpg';
    fs.writeFileSync(path.join(dir, filename), Buffer.from(buffer));
    console.log('Saved', filename);
  }
}
download();
