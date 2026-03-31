function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// All prices are stored directly in UGX
// Diverse Brand Collection (Dell, Lenovo, HP, Apple, Microsoft)
// Criteria: i5+, 8GB+ RAM, 750k+ UGX
export const localProducts = [
  // --- EXISTING COLLECTION (DIVERSIFIED) ---
  {
    id: uuidv4(), name: 'HP Dragonfly G4 (Premium i7)', category: 'Laptops', price: 2_999_000, stock: 5, badge: 'ELITE',
    specs: ['Intel Core i7 (13th Gen)', '16GB RAM', '1TB SSD', 'Lightweight Business Pro'],
    recommended_for: ['Advanced Website Development', 'Mobile App Development', 'Software Engineering', 'Cyber Security (Comptia Security+ Prep)'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/98/8835952/1.jpg?7820'
  },
  {
    id: uuidv4(), name: 'HP Intel Core i7 Touchscreen', category: 'Laptops', price: 3_339_000, stock: 3, badge: 'TOUCH',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', 'FHD Touchscreen'],
    recommended_for: ['Graphics Design', 'Video Editing and Photography', 'Digital Marketing'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/55/9045171/1.jpg?2742'
  },
  {
    id: uuidv4(), name: 'Lenovo ThinkPad X13 Gen 2', category: 'Laptops', price: 1_700_000, stock: 4, badge: 'MODERN',
    specs: ['Core i5 11th Gen', '8GB RAM', '512GB SSD', '13.3 Inch FHD Screen'],
    recommended_for: ['Software Engineering', 'Data Analysis', 'Web Development'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/63/745063/1.jpg'
  },
  {
    id: uuidv4(), name: 'Lenovo ThinkPad X1 Yoga 2-in-1', category: 'Laptops', price: 1_450_000, stock: 6, badge: 'FLEX',
    specs: ['Intel Core i5', '8GB RAM', '256GB SSD', 'Silver Edition convertible'],
    recommended_for: ['Digital Marketing', 'Graphics Design', 'Office Operations'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/23/6521481/1.jpg'
  },
  {
    id: uuidv4(), name: 'Lenovo ThinkPad T480S Pro', category: 'Laptops', price: 1_250_000, stock: 5, badge: 'PRO',
    specs: ['Core i5-8350U', '8GB RAM', '256GB NVMe SSD', 'UHD Graphics 620'],
    recommended_for: ['Networking (CCNA Prep)', 'Linux Systems Adminstration', 'Cyber Security (Comptia Security+ Prep)'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/71/653489/1.jpg'
  },
  {
    id: uuidv4(), name: 'DELL Latitude 7490 (Renewed)', category: 'Laptops', price: 1_220_000, stock: 8, badge: 'ELITE',
    specs: ['Core i5 8th Gen', '8GB RAM', '512GB SSD', 'Grade A+ Black'],
    recommended_for: ['Business Computing (Quick Books And Tally)', 'Website Development', 'Data Analysis'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/82/9734252/1.jpg'
  },
  {
    id: uuidv4(), name: 'HP EliteBook 840 G5 i5', category: 'Laptops', price: 990_000, stock: 12, badge: 'VALUE',
    specs: ['Intel Core i5', '8GB RAM', '256GB SSD', '14" FHD Display'],
    recommended_for: ['Website Development', 'Introduction to Programming | Coding', 'Computer Fundamentals'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/73/9835952/1.jpg?7891'
  },
  {
    id: uuidv4(), name: 'Lenovo Refurbished X260 Plus', category: 'Laptops', price: 949_000, stock: 10, badge: 'DURABLE',
    specs: ['Intel Core i5', '8GB RAM', '1TB HDD', 'Includes Bag', '13 Inch Black'],
    recommended_for: ['Computer Fundamentals', 'Computer Repair And Maintenance', 'Education'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/93/296808/1.jpg'
  },
  {
    id: uuidv4(), name: 'DELL Latitude 7490 i5 (8GB)', category: 'Laptops', price: 908_600, stock: 10, badge: 'PRO',
    specs: ['Core i5 8th Gen', '8GB RAM', '256GB SSD', 'Grade A Black'],
    recommended_for: ['Digital Marketing', 'Data Analysis', 'Business Computing (Quick Books And Tally)'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/99/7900031/1.jpg'
  },
  {
    id: uuidv4(), name: 'Lenovo ThinkPad 13.3" (Renewed)', category: 'Laptops', price: 838_600, stock: 15, badge: 'BUDGET',
    specs: ['Intel Core i5', '8GB RAM', '512GB SSD', 'Compact Black'],
    recommended_for: ['Computer Fundamentals', 'Website Development'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/04/9035342/1.jpg'
  },

  // --- NEW ADDITIONS (APPLE & MICROSOFT) ---
  {
    id: uuidv4(), name: 'Apple MacBook Pro M3 (2023)', category: 'Laptops', price: 7_920_000, stock: 2, badge: 'FLAGSHIP',
    specs: ['Apple M3 Chip', '16GB Unified RAM', '1TB SSD', '14.2" Liquid Retina XDR'],
    recommended_for: ['Advanced Website Development', 'Mobile App Development', 'Video Editing and Photography', 'Graphics Design'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/77/1014952/1.jpg?2304'
  },
  {
    id: uuidv4(), name: 'Microsoft Surface Laptop 5', category: 'Laptops', price: 4_650_000, stock: 3, badge: 'PREMIUM',
    specs: ['Intel Core i5-1235U', '8GB RAM', '256GB SSD', 'PixelSense Touchscreen'],
    recommended_for: ['Digital Marketing', 'Data Analysis', 'Business Computing (Quick Books And Tally)'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/52/4903952/1.jpg?2612'
  },
  {
    id: uuidv4(), name: 'Apple MacBook Pro (2017)', category: 'Laptops', price: 2_500_000, stock: 4, badge: 'REFURB',
    specs: ['Intel Core i5', '8GB RAM', '128GB SSD', '13-inch Retina Display'],
    recommended_for: ['Graphics Design', 'Website Development', 'Software Engineering'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/04/3487952/1.jpg?5341'
  },
  {
    id: uuidv4(), name: 'Microsoft Surface Laptop 2', category: 'Laptops', price: 2_000_000, stock: 5, badge: 'TOUCH',
    specs: ['Intel Core i7 8th Gen', '16GB RAM', '512GB SSD', 'Premium Alcantara finish'],
    recommended_for: ['Digital Marketing', 'Business Computing (Quick Books And Tally)', 'Data Analysis'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/92/7587952/1.jpg?4025'
  },
  {
    id: uuidv4(), name: 'Apple MacBook Air (2018)', category: 'Laptops', price: 1_680_000, stock: 6, badge: 'SLIM',
    specs: ['Intel Core i5 1.6GHz', '8GB RAM', '128GB SSD', 'Retina Display', 'Touch ID'],
    recommended_for: ['Digital Marketing', 'Website Development', 'Computer Fundamentals'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/3969852/1.jpg?2320'
  },
  {
    id: uuidv4(), name: 'Apple MacBook Pro (2015) 13"', category: 'Laptops', price: 1_120_000, stock: 3, badge: 'CLASSIC',
    specs: ['Intel Core i5', '8GB RAM', '256GB SSD', '13" Retina Display'],
    recommended_for: ['Graphics Design', 'Computer Fundamentals'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/4966952/1.jpg?2300'
  },
  {
    id: uuidv4(), name: 'Apple MacBook Air 13" (2017)', category: 'Laptops', price: 900_000, stock: 8, badge: 'BUDGET',
    specs: ['Intel Core i5', '8GB RAM', '256GB SSD', 'Silver Aluminum'],
    recommended_for: ['Computer Fundamentals', 'Online Learning'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/4966952/1.jpg?2300'
  },
  {
    id: uuidv4(), name: 'MacBook Pro Retina (2015)', category: 'Laptops', price: 850_000, stock: 7, badge: 'DEAL',
    specs: ['Intel Core i5', '8GB RAM', '256GB SSD', 'Grade A Refurbished'],
    recommended_for: ['Computer Fundamentals', 'Graphics Design'],
    image_url: 'https://ug.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/04/3487952/1.jpg?5341'
  }
];
