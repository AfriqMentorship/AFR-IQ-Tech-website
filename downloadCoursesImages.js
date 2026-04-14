const fs = require('fs');
const path = require('path');

const dir = 'frontend/public/courses';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const downloads = [
  { name: 'course_1', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_2', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_3', url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_4', url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_5', url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_6', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_7', url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_8', url: 'https://images.unsplash.com/photo-1507721999580-f1f427431e5f?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_9', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_10', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_11', url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_12', url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_13', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_14', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_15', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
  { name: 'course_16', url: 'https://images.unsplash.com/photo-1505775561242-727b7fba5792?q=80&w=800&auto=format&fit=crop' }
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
