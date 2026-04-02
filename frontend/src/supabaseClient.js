import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zduinbfmxqddquedobqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWluYmZteHFkZHF1ZWRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTY4MjgsImV4cCI6MjA4Nzk3MjgyOH0.cCJFQReeHYbywofqsmKBYuOX1v74LcBKV85QdaUD1yM';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const COURSE_UNITS = {
  "Computer Fundamentals": [
    "Introduction to Computers",
    "Operating Systems (Windows/Linux)",
    "Microsoft Word (Advanced Publishing)",
    "Microsoft Excel (Data Management)",
    "Microsoft PowerPoint (Presentations)",
    "Internet and Email Basics",
    "Touch Typing Speed & Accuracy",
    "Computer Security Basics"
  ],
  "Website Development": [
    "HTML5 & Semantic Web",
    "CSS3 (Flexbox, Grid, Animations)",
    "JavaScript (ES6+, DOM, Async/Await)",
    "Responsive Web Design",
    "Version Control (Git/GitHub)",
    "UI/UX Design Fundamentals",
    "Web Performance & SEO",
    "Deployment & Hosting"
  ],
  "Software Engineering": [
    "Advanced JavaScript / TypeScript",
    "React.js & State Management",
    "Next.js & Server Side Rendering",
    "Node.js & Express Backend",
    "Database Systems (PostgreSQL/MongoDB)",
    "RESTful API Design",
    "Data Structures & Algorithms",
    "Software Testing (Jest/Cypress)"
  ],
  "Graphics Design": [
    "Adobe Photoshop Expert",
    "Adobe Illustrator (Vector Graphics)",
    "Canva Pro & Modern Design Tools",
    "Typography & Layout Design",
    "Logo & Brand Identity",
    "UI/UX Visual Design",
    "Color Theory & Printing Basics",
    "Digital Illustration"
  ],
  "Video Editing and Photography": [
    "Cinematography & Camera Basics",
    "Adobe Premiere Pro (Editing)",
    "After Effects (Motion Graphics)",
    "Color Grading & Correction",
    "Sound Design & Audio Mastering",
    "Lighting for Video & Photo",
    "Scripting & Storyboarding",
    "Photography Post-Processing"
  ],
  "Digital Marketing": [
    "Search Engine Optimization (SEO)",
    "Meta Ads (Facebook/Instagram)",
    "Google Ads (Search/Display)",
    "Content Strategy & Copywriting",
    "Social Media Management",
    "Email Marketing Automation",
    "Google Analytics & Data Tracking",
    "Public Relations & Branding"
  ],
  "Cyber Security (Comptia Security+)": [
    "Network Security & Architecture",
    "Threat Detection & Analysis",
    "Incident Response & Forensics",
    "Cloud Security Fundamentals",
    "Access Control Management",
    "Risk Management & Compliance",
    "Cryptography Basics",
    "Pentesting Fundamentals"
  ],
  "Networking (CCNA Prep)": [
    "IP Addressing & Subnetting",
    "Routing & Switching (Cisco)",
    "Network Infrastructure Security",
    "Wireless Network Configuration",
    "VLANs & Trunking",
    "Wide Area Networks (WAN)",
    "Network Troubleshooting",
    "Automation & Programmability"
  ],
  "Data Analysis": [
    "Advanced Microsoft Excel",
    "SQL for Data Analysis",
    "Python for Data Science",
    "Data Visualization (PowerBI/Tableau)",
    "Statistical Analysis",
    "Cleaning & Processing Data",
    "Business Intelligence Reporting",
    "Machine Learning Basics"
  ],
  "Linux Systems Administration": [
    "Linux Command Line Mastery",
    "User & Group Management",
    "System Monitoring & Logging",
    "Network Configuration (Linux)",
    "Shell Scripting (Bash)",
    "Server Deployment (Apache/Nginx)",
    "SSH & Remote Management",
    "Backup & Disaster Recovery"
  ],
  "Advanced Website Development": [
    "Next.js & Server Components",
    "Django Framework (Python)",
    "PostgreSQL Integration",
    "Authentication (OAuth/JWT)",
    "API Development (REST/GraphQL)",
    "CI/CD Pipelines",
    "Cloud Deployment (AWS/Vercel)",
    "Server-Side Rendering (SSR)"
  ],
  "Business Computing (QuickBooks/Tally)": [
    "QuickBooks Desktop/Online",
    "Tally Prime Essentials",
    "Accounts Payable & Receivable",
    "Inventory Management",
    "Financial Reporting",
    "Tax Compliance (VAT/WHT)",
    "Payroll Management",
    "Spreadsheet Modeling"
  ],
  "Computer Repair And Maintenance": [
    "Hardware Troubleshooting",
    "Operating System Installation",
    "PC Assembly & Upgrades",
    "Software Debugging",
    "Data Recovery & Backup",
    "Preventive Maintenance",
    "Networking Basics",
    "Customer Support Ethics"
  ]
};
