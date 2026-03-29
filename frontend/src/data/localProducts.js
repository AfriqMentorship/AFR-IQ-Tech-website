function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// All prices are stored directly in UGX
export const localProducts = [
  // ─────────── LAPTOPS ───────────
  {
    id: uuidv4(), name: 'MacBook Air M2', category: 'Laptops', price: 4_286_100, stock: 15,
    specs: ['8-Core CPU', 'M2 Chip', '8GB RAM', '256GB SSD', '13.6" Liquid Retina'],
    recommended_for: ['Coding', 'Web Development'],
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'MacBook Pro 16" M3 Max', category: 'Laptops', price: 13_646_100, stock: 8, badge: 'Premium',
    specs: ['14-Core CPU', 'M3 Max Chip', '36GB RAM', '1TB SSD', '16" Liquid Retina XDR'],
    recommended_for: ['Graphic Design', 'Video Editing'],
    image_url: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Dell XPS 13', category: 'Laptops', price: 4_676_100, stock: 20,
    specs: ['12-Core CPU', 'Core i7 13th Gen', '16GB RAM', '512GB NVMe', '13.4" FHD+'],
    image_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Dell XPS 15', category: 'Laptops', price: 5_846_100, stock: 12,
    specs: ['14-Core CPU', 'Core i7 13th Gen', '16GB RAM', '1TB NVMe', '15.6" OLED'],
    recommended_for: ['Data Science', 'Graphic Design'],
    image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'HP Spectre x360', category: 'Laptops', price: 5_066_100, stock: 18,
    specs: ['10-Core CPU', 'Core i7', '16GB RAM', '512GB SSD', '14" Touch OLED'],
    image_url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'HP Envy 16', category: 'Laptops', price: 5_456_100, stock: 10,
    specs: ['14-Core CPU', 'Core i7', '16GB RAM', '1TB SSD', '16" WQXGA'],
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Lenovo Legion Pro 5', category: 'Laptops', price: 5_655_000, stock: 15, badge: 'Gaming',
    specs: ['8-Core CPU', 'Ryzen 7', 'RTX 4060', '16GB RAM', '1TB SSD'],
    image_url: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Asus ROG Zephyrus G14', category: 'Laptops', price: 6_045_000, stock: 14,
    specs: ['8-Core CPU', 'Ryzen 9', 'RTX 4070', '16GB RAM', '1TB SSD'],
    image_url: 'https://images.unsplash.com/photo-1603481546238-487240415921?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Asus ZenBook 14X', category: 'Laptops', price: 4_485_000, stock: 22,
    specs: ['12-Core CPU', 'Core i7', '16GB RAM', '512GB SSD', '14.5" OLED'],
    image_url: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=600&auto=format&fit=crop'
  },

  // ─────────── MONITORS ───────────
  {
    id: uuidv4(), name: 'HP Pavilion 27" QHD', category: 'Monitors', price: 1_166_100, stock: 30,
    specs: ['27" QHD', 'IPS Panel', '75Hz', 'USB Type-C'],
    image_url: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Lenovo ThinkVision 24"', category: 'Monitors', price: 776_100, stock: 45,
    specs: ['23.8" FHD', 'IPS Panel', '60Hz', 'Ergonomic Stand'],
    image_url: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Apple Studio Display', category: 'Monitors', price: 6_236_100, stock: 5, badge: 'Premium',
    specs: ['27" 5K Retina', '12MP Camera', 'A13 Bionic', 'Nano-texture'],
    image_url: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Hisense 32" Curved', category: 'Monitors', price: 971_100, stock: 15,
    specs: ['32" 1500R Curved', 'QHD', '165Hz', '1ms Response'],
    image_url: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Samsung Odyssey G5', category: 'Monitors', price: 1_556_100, stock: 25, badge: 'Gaming',
    specs: ['32" WQHD', '1000R Curved', '144Hz', 'FreeSync'],
    image_url: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=600&auto=format&fit=crop'
  },

  // ─────────── NETWORKING ───────────
  {
    id: uuidv4(), name: 'Cat6 Ethernet Cable (50m)', category: 'Networking', price: 117_000, stock: 100,
    specs: ['50 Meters', 'RJ45 Connectors', 'Gigabit Ready'],
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'TP-Link WiFi 6 Router', category: 'Networking', price: 503_100, stock: 50,
    specs: ['AX3000', 'Dual Band', 'Gigabit Ports', 'WPA3'],
    image_url: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: '12U Network Rack Cabinet', category: 'Networking', price: 854_100, stock: 10,
    specs: ['12U Capacity', 'Wall Mount', 'Glass Door', 'Steel Frame'],
    image_url: '/products/network_rack_12u.png'
  },
  {
    id: uuidv4(), name: 'Cisco Catalyst 24-Port Switch', category: 'Networking', price: 1_755_000, stock: 12, badge: 'Enterprise',
    specs: ['24x Gigabit', '4x 10G SFP+', 'Layer 2/3', 'Managed'],
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop'
  },

  // ─────────── ACCESSORIES ───────────
  {
    id: uuidv4(), name: 'Seagate 2TB HDD', category: 'Accessories', price: 253_500, stock: 80,
    specs: ['2TB Capacity', 'USB 3.0', 'Portable', 'PC/Mac'],
    image_url: '/products/seagate_2tb_hdd.png'
  },
  {
    id: uuidv4(), name: 'Samsung 980 Pro 1TB SSD', category: 'Accessories', price: 468_000, stock: 65,
    specs: ['1TB NVMe', 'PCIe 4.0', '7000MB/s Read', 'M.2 2280'],
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Corsair Vengeance 32GB RAM', category: 'Accessories', price: 546_000, stock: 40,
    specs: ['32GB (2x16GB)', 'DDR5 5200MHz', 'Desktop Memory', 'Aluminum Heatspreader'],
    image_url: '/products/corsair_ram_32gb.png'
  },
  {
    id: uuidv4(), name: 'Logitech MX Keys Keyboard', category: 'Accessories', price: 429_000, stock: 35,
    specs: ['Wireless', 'Illuminated', 'Multi-Device', 'USB-C'],
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'SanDisk Ultra 128GB USB', category: 'Accessories', price: 78_000, stock: 150,
    specs: ['128GB', 'USB 3.0', 'Up to 130MB/s', 'Compact'],
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop'
  },
  {
    // Renamed from "Logitech MX Master 3S Mouse" — price set to exactly UGX 250,000
    id: uuidv4(), name: 'Mouse', category: 'Accessories', price: 30_000, stock: 50,
    specs: ['Wireless', 'Ergonomic', 'USB-C', '8000 DPI'],
    image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Apple 96W USB-C Adapter', category: 'Accessories', price: 308_100, stock: 25,
    specs: ['96W Power', 'USB-C', 'Fast Charging', 'MacBook Pro Compatible'],
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: uuidv4(), name: 'Dell 130W USB-C Charger', category: 'Accessories', price: 253_500, stock: 30,
    specs: ['130W Power', 'USB-C', 'XPS Compatible', '3-Prong'],
    image_url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600&auto=format&fit=crop'
  }
];
