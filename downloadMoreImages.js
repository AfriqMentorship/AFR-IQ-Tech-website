const fs = require('fs');
const path = require('path');

const dir = 'frontend/public/products';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// We just map the queries to unsplash URLs
const items = [
  // Laptops
  { name: 'MacBook Air M2', v: 'macbook air' },
  { name: 'MacBook Pro 16" M3 Max', v: 'macbook pro' },
  { name: 'Dell XPS 13', v: 'dell xps laptop' },
  { name: 'Dell XPS 15', v: 'dell xps' },
  { name: 'HP Spectre x360', v: 'hp spectre laptop' },
  { name: 'HP Envy 16', v: 'hp laptop' },
  { name: 'Lenovo Legion Pro 5', v: 'gaming laptop lenovo' },
  { name: 'Asus ROG Zephyrus G14', v: 'asus rog gaming laptop' },
  { name: 'Asus ZenBook 14X', v: 'asus zenbook laptop' },
  
  // Monitors
  { name: 'HP Pavilion 27" QHD', v: 'hp monitor' },
  { name: 'Lenovo ThinkVision 24"', v: 'lenovo monitor' },
  { name: 'Apple Studio Display', v: 'apple display monitor' },
  { name: 'Hisense 32" Curved', v: 'hisense monitor' },
  { name: 'Samsung Odyssey G5', v: 'samsung odyssey monitor' },
  
  // Networking
  { name: 'Cat6 Ethernet Cable (50m)', v: 'ethernet cable' },
  { name: 'TP-Link WiFi 6 Router', v: 'wifi router' },
  { name: '12U Network Rack Server Cabinet', v: 'server rack' },
  { name: 'Cisco Catalyst 24-Port Switch', v: 'network switch' },
  
  // Accessories
  { name: 'Seagate Portable 2TB HDD', v: 'external hard drive' },
  { name: 'Samsung 980 Pro 1TB SSD', v: 'nvme ssd' },
  { name: 'Corsair Vengeance 32GB RAM', v: 'computer ram' },
  { name: 'Logitech MX Keys Keyboard', v: 'logitech keyboard' },
  { name: 'SanDisk Ultra 128GB Flash Drive', v: 'usb flash drive' },
  { name: 'Apple 96W Adapter', v: 'macbook charger' },
  { name: 'Dell 130W Charger', v: 'laptop charger' }
];

async function download() {
  for (const d of items) {
    const filename = d.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
    if (fs.existsSync(path.join(dir, filename))) {
        console.log('Skipping', filename);
        continue;
    }
    const safeQuery = encodeURIComponent(d.v);
    const url = `https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop`; // fallback URL
    
    // Use an actual random unsplash source by search
    const actualUrl = `https://source.unsplash.com/800x800/?${safeQuery}`;
    try {
        const res = await fetch(actualUrl);
        let finalUrl = res.url;
        // If source.unsplash falls back or redirects to a standard 404, we can just use an ID or fetch normally
        const fallbackRes = await fetch(finalUrl);
        const buffer = await fallbackRes.arrayBuffer();
        fs.writeFileSync(path.join(dir, filename), Buffer.from(buffer));
        console.log('Saved', filename);
    } catch(e) {
        console.error("error with", filename, e);
    }
  }
}
download();
