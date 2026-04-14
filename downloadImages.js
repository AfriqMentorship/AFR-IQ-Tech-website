const fs = require('fs');
const path = require('path');

const dir = 'frontend/public/products';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const downloads = [
  { name: 'Logitech MX Master 3S', url: 'https://images.unsplash.com/photo-1615663245857-ac1eeb536624?q=80&w=800&auto=format&fit=crop' },
  { name: 'MacBook Pro 14" M3', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop' },
  { name: 'Cisco Meraki Go WiFi 6', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop' },
  { name: 'APC Back-UPS Pro 1500VA', url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop' },
  { name: 'ThinkPad X1 Carbon Gen 11', url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop' },
  { name: 'Dell UltraSharp 27" 4K', url: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=800&auto=format&fit=crop' }
];

async function download() {
  for (const d of downloads) {
    const res = await fetch(d.url);
    const buffer = await res.arrayBuffer();
    const filename = d.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
    fs.writeFileSync(path.join(dir, filename), Buffer.from(buffer));
    console.log('Saved', filename);
  }
}
download();
