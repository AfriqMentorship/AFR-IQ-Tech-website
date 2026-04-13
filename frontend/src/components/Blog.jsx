import { useState } from "react";

const styles = `
  .page { 
    min-height: calc(100vh - 75px); 
    background: var(--bg-base); 
    color: var(--text-primary); 
    font-family: 'Poppins', sans-serif; 
    transition: background 0.3s ease;
  }

  .page-hero {
    position: relative;
    padding: 100px 48px 80px;
    border-bottom: 1px solid var(--border-medium);
    overflow: hidden;
    background: var(--bg-base);
  }
  .page-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 10% 50%, var(--accent-green-glow) 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.6;
  }
  .page-grid-bg {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(var(--border-subtle) 1px, transparent 1px), 
      linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    opacity: 0.4;
  }
  .page-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-green);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
    font-weight: 700;
  }
  .page-eyebrow::before { content: ''; display: block; width: 32px; height: 1.5px; background: var(--accent-green); opacity: 0.6; }
  .page-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(56px, 9vw, 96px);
    line-height: 0.9;
    color: var(--text-primary);
    margin-bottom: 28px;
    letter-spacing: 0.02em;
  }
  .page-title .hl { color: var(--accent-orange); text-shadow: 0 0 40px var(--accent-orange-glow); }
  .page-desc { font-size: 18px; color: var(--text-secondary); max-width: 600px; line-height: 1.7; }

  /* Blog Layout */
  .blog-container {
    padding: 80px 48px;
    max-width: 1440px;
    margin: 0 auto;
  }

  /* Filters / Categories */
  .blog-categories {
    display: flex;
    gap: 12px;
    margin-bottom: 56px;
    flex-wrap: wrap;
  }

  .category-btn {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    padding: 10px 24px;
    border-radius: 40px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .category-btn:hover {
    background: var(--bg-level2);
    color: var(--accent-green);
    border-color: var(--accent-green);
    transform: translateY(-2px);
  }

  .category-btn.active {
    background: var(--accent-green);
    color: #fff;
    border-color: var(--accent-green);
    box-shadow: 0 10px 20px var(--accent-green-glow);
  }

  /* Blog Grid */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .blog-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 28px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    box-shadow: var(--shadow-soft);
  }

  .blog-card:hover {
    transform: translateY(-12px);
    border-color: var(--accent-green);
    background: var(--bg-level2);
    box-shadow: 0 40px 80px rgba(0,0,0,0.1);
  }

  .blog-image-wrapper {
    height: 240px;
    background: var(--bg-level2);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blog-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, var(--bg-level1) 100%);
    opacity: 0.8;
  }

  .blog-placeholder-img {
    font-size: 56px;
    opacity: 0.3;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    filter: drop-shadow(0 0 20px var(--accent-green-glow));
  }

  .blog-card:hover .blog-placeholder-img {
    opacity: 1;
    transform: scale(1.2) rotate(5deg);
  }

  .blog-category-tag {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(var(--bg-base-rgb), 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid var(--accent-green-glow);
    color: var(--accent-green);
    padding: 6px 14px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 700;
  }

  .blog-content {
    padding: 32px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .blog-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 16px;
    font-weight: 700;
  }

  .blog-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 26px;
    color: var(--text-primary);
    margin-bottom: 16px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    transition: color 0.3s ease;
  }

  .blog-card:hover .blog-title {
    color: var(--accent-green);
  }

  .blog-excerpt {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 32px;
    flex: 1;
  }

  .blog-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
    border-top: 1px solid var(--border-subtle);
  }

  .blog-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .author-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent-green-glow);
    border: 1px solid var(--accent-green-glow);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    color: var(--accent-green);
  }

  .author-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .read-more {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-green);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    transition: transform 0.3s ease;
  }

  .blog-card:hover .read-more {
    transform: translateX(8px);
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 80px;
  }

  .page-item {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    color: var(--text-secondary);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .page-item:hover {
    background: var(--accent-green-glow);
    color: var(--accent-green);
    border-color: var(--accent-green);
    transform: translateY(-2px);
  }

  .page-item.active {
    background: var(--accent-green);
    color: #fff;
    border-color: var(--accent-green);
    box-shadow: 0 10px 20px var(--accent-green-glow);
  }

  @media (max-width: 1200px) {
    .blog-grid { grid-template-columns: repeat(2, 1fr); }
    .blog-container { padding: 60px 24px; }
    .page-hero { padding: 80px 24px 60px; }
  }

  @media (max-width: 768px) {
    .blog-grid { grid-template-columns: 1fr; }
    .page-title { font-size: 48px; }
  }

  /* Blog Modal */
  .blog-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.73); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .blog-modal {
    background: var(--bg-level1); border: 1px solid var(--border-medium);
    border-radius: 20px; width: 100%; max-width: 800px;
    padding: 48px; position: relative;
    max-height: 90vh; overflow-y: auto;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .blog-modal::-webkit-scrollbar { width: 6px; }
  .blog-modal::-webkit-scrollbar-track { background: var(--bg-level1); }
  .blog-modal::-webkit-scrollbar-thumb { background: var(--border-medium); border-radius: 3px; }

  .blog-close {
    position: absolute; top: 24px; right: 24px;
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--bg-level2); border: 1px solid var(--border-subtle);
    color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.25s; font-size: 18px;
  }
  .blog-close:hover { background: rgba(255,80,80,0.1); border-color: rgba(255,80,80,0.2); color: #ff5050; transform: rotate(90deg); }

  .modal-category {
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--accent-green); text-transform: uppercase; letter-spacing: 0.15em;
    margin-bottom: 16px; font-weight: 700;
  }
  
  .modal-title {
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 36px;
    color: var(--text-primary); margin-bottom: 24px; line-height: 1.2;
  }
  
  .modal-meta {
    display: flex; align-items: center; gap: 16px;
    font-family: 'Inter', sans-serif; font-size: 13px; color: var(--text-muted);
    margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border-subtle);
    flex-wrap: wrap;
  }
  
  .modal-content {
    font-size: 16px; color: var(--text-secondary); line-height: 1.8;
  }
  .modal-content p { margin-bottom: 24px; }
`;

const INITIAL_POSTS = [
  {
    id: 1,
    category: "Cloud Computing",
    icon: "☁️",
    date: "MAR 02, 2026",
    title: "The Future of Cloud Infrastructure in East Africa",
    excerpt: "Exploring how scalable cloud solutions are transforming businesses in Kampala and across the region, lowering costs and increasing reliability.",
    content: [
      "In recent years, East Africa has seen a massive surge in the adoption of cloud infrastructure. Businesses in Kampala, Nairobi, and Kigali are moving away from traditional on-premise servers and embracing the flexibility and scalability that the cloud offers.",
      "The benefits are clear. For one, cloud infrastructure significantly lowers capital expenditure. Instead of investing heavily in physical hardware, businesses can pay for what they use, allowing startups and SMEs to compete with larger enterprises on a more level playing field.",
      "Furthermore, reliability and uptime have improved dramatically. With data centers increasingly being established locally in Africa, latency issues are becoming a thing of the past. Companies can now ensure that their applications and software solutions remain online and accessible to their users 24/7.",
      "At AFR-IQ Technologies, we are helping our partners navigate this transition. Whether it's setting up an AWS architecture, deploying scalable applications, or managing cloud security—migrating to the cloud is no longer just an option for African businesses; it is a necessity for survival in the digital age."
    ],
    author: "Muwanguzi Joshua",
    readTime: "5 MIN READ"
  },
  {
    id: 2,
    category: "Cybersecurity",
    icon: "🔒",
    date: "FEB 28, 2026",
    title: "5 Essential Security Measures for SMEs",
    excerpt: "As digital adoption grows, so do the threats. Learn the foundational cybersecurity practices every small-to-medium enterprise should implement.",
    content: [
      "As small and medium-sized enterprises (SMEs) increasingly digitize their operations, they also become prime targets for cyberattacks. Many business owners mistakenly believe that only large corporations are targeted, but the reality is that hackers often exploit the weaker defenses of smaller businesses.",
      "The first essential measure is implementing strict access controls. By adhering to the principle of least privilege, businesses can ensure that employees only have access to the data and systems necessary for their specific roles. This limits the potential damage if an account is compromised.",
      "Secondly, regular software updates and patch management are critical. Many cyberattacks exploit known vulnerabilities in outdated software. Ensuring that all operating systems, applications, and security tools are up-to-date is one of the easiest and most effective ways to defend against common threats.",
      "Third, employee training cannot be overlooked. Phishing remains one of the most common attack vectors. Educating staff on how to recognize suspicious emails, links, and requests is often the best defense.",
      "Finally, SMEs must prioritize data backups and multi-factor authentication (MFA). A robust backup strategy (following the 3-2-1 rule) ensures data can be recovered in the event of ransomware, while MFA adds a crucial extra layer of security to user logins. Protect your business before a breach happens."
    ],
    author: "Kuteesa Moses",
    readTime: "7 MIN READ"
  },
  {
    id: 3,
    category: "Academy",
    icon: "🎓",
    date: "FEB 24, 2026",
    title: "Why Full-Stack Development is High in Demand",
    excerpt: "Insights from our lead instructors on the current tech job market and why learning both frontend and backend technologies is crucial.",
    content: [
      "The tech industry is evolving rapidly, and the demand for versatile engineers has never been higher. Full-Stack Development has emerged as one of the most sought-after skillsets in the job market, and for good reason.",
      "A Full-Stack Developer possesses a comprehensive understanding of both the frontend (user interface) and the backend (server, database, and logic). This holistic view allows them to build complete web applications from the ground up, troubleshoot complex issues efficiently, and communicate effectively across different technical teams.",
      "For tech companies, hiring full-stack developers is highly efficient. It allows for leaner, more agile teams that can adapt quickly to changing project requirements. Instead of needing separate specialists for every component, a full-stack engineer can pivot between tasks seamlessly.",
      "At the AFR-IQ Technologies Academy, our Advanced Website Development program is specifically designed to create these highly skilled individuals. By covering essential technologies like React, Next.js, and Node, we ensure our graduates are equipped with the modern tools necessary to excel as professional Full-Stack Developers and meet the growing industry demand."
    ],
    author: "Okello Solomon",
    readTime: "4 MIN READ"
  },
  {
    id: 4,
    category: "Smart Tech",
    icon: "📱",
    date: "FEB 15, 2026",
    title: "Top 10 Enterprise Laptops for Productivity",
    excerpt: "A comprehensive review of the latest business laptops available in our shop, balancing performance, battery life, and cost.",
    content: [
      "Choosing the right laptop for your workforce is a critical decision that impacts both productivity and employee satisfaction. Enterprise laptops need to strike the perfect balance between processing power, battery life, durability, and cost-effectiveness.",
      "At the top of our list is the ThinkPad X1 Carbon Gen 11. Known for its legendary keyboard and robust build quality, it remains a favorite for executives and developers alike. Its lightweight design makes it ideal for travel, while its security features provide peace of mind.",
      "For creative professionals, the MacBook Pro 14\" with the M3 chip offers unparalleled performance. Its battery life is industry-leading, and the Retina display provides incredible color accuracy for design and video editing work.",
      "If you're looking for a balance of power and affordability, the Dell Latitude 7440 is an excellent choice. It offers strong performance for everyday tasks, comprehensive port options, and reliable build quality suitable for hybrid work environments.",
      "Visit our Shop section to explore these models and more. Our experts at AFR-IQ Technologies can help you select the perfect hardware solutions tailored to your specific business requirements and budget constraints."
    ],
    author: "Tech Team",
    readTime: "6 MIN READ"
  },
  {
    id: 5,
    category: "Software",
    icon: "💻",
    date: "FEB 10, 2026",
    title: "Custom ERPs: Building for African Businesses",
    excerpt: "Why off-the-shelf software doesn't always work, and how custom-built resource planning tools are driving local business success.",
    content: [
      "Enterprise Resource Planning (ERP) software is the backbone of many successful businesses. However, we often find that generic, off-the-shelf ERP solutions don't fully align with the unique operational realities of African businesses.",
      "Standard solutions often come with bloated features that businesses never use, while simultaneously lacking crucial integrations for local payment gateways (like mobile money) and specific regional compliance reporting. This mismatch often leads to low adoption rates among staff and wasted investment.",
      "Custom ERPs offer a strategic alternative. By building software tailored specifically to a business's exact workflows, companies can eliminate inefficiencies and automate processes in a way that makes sense for their specific context. Whether it's custom inventory management for agricultural supply chains or specialized CRM systems for local service providers, custom software adapts to the business, rather than forcing the business to adapt to the software.",
      "At AFR-IQ Technologies, our software development team specializes in architecting and building bespoke ERP solutions. We work closely with our clients to understand their unique constraints and design scalable, intuitive software that drives real growth and operational excellence."
    ],
    author: "Dev Dept",
    readTime: "8 MIN READ"
  },
  {
    id: 6,
    category: "IT Infrastructure",
    icon: "📡",
    date: "JAN 28, 2026",
    title: "Navigating Internet Connectivity Challenges",
    excerpt: "How to build resilient network arrays that keep your business online regardless of external ISP fluctuations.",
    content: [
      "Consistent internet connectivity remains a challenge for many businesses operating in developing regions. ISP outages, bandwidth throttling, and infrastructure issues can lead to significant downtime, resulting in lost revenue and decreased productivity.",
      "To mitigate these risks, businesses must architect resilient network arrays that do not rely on a single point of failure. The most effective strategy is implementing a multi-WAN (Wide Area Network) setup with automatic failover.",
      "By subscribing to multiple ISPs—ideally utilizing different delivery mediums such as fiber and 4G/5G LTE—a business can configure their edge routers to automatically switch traffic to the secondary connection if the primary link goes down. This switch happens seamlessly, often without users even noticing an interruption.",
      "Furthermore, implementing QoS (Quality of Service) rules ensures that critical business applications (like VoIP and cloud ERPs) are prioritized over less important traffic (like video streaming). By strategically managing bandwidth and establishing redundant connections, AFR-IQ Technologies helps businesses navigate connectivity challenges and maintain uninterrupted operations."
    ],
    author: "Network Ops",
    readTime: "5 MIN READ"
  }
];

const CATEGORIES = ["All", "Cloud Computing", "Cybersecurity", "Academy", "Smart Tech", "Software", "IT Infrastructure"];

function BlogModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="blog-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="blog-modal">
        <button className="blog-close" onClick={onClose}>✕</button>
        <div className="modal-category">{post.category}</div>
        <h2 className="modal-title">{post.title}</h2>
        <div className="modal-meta">
          <span>{post.icon}</span>
          <span>📅 {post.date}</span>
          <span>•</span>
          <span>🕒 {post.readTime}</span>
          <span>•</span>
          <span>By {post.author}</span>
        </div>
        <div className="modal-content">
          {post.content && post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {!post.content && <p>{post.excerpt}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = activeCategory === "All"
    ? INITIAL_POSTS
    : INITIAL_POSTS.filter(p => p.category === activeCategory);

  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{styles}</style>
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <div className="page">

        {/* Hero Section */}
        <div className="page-hero">
          <div className="page-grid-bg" />
          <div className="page-eyebrow">Our Blog</div>
          <h1 className="page-title">Insights & <span className="hl">Updates</span></h1>
          <p className="page-desc">
            Stay ahead of the curve with the latest news, expert guides, and tech insights from the team at AFR-IQ Technologies.
          </p>
        </div>

        <div className="blog-container">

          {/* Category Filter */}
          <div className="blog-categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="blog-grid">
            {currentPosts.map(post => (
              <div className="blog-card" key={post.id} onClick={() => setSelectedPost(post)}>

                <div className="blog-image-wrapper">
                  <span className="blog-category-tag">{post.category}</span>
                  <div className="blog-placeholder-img">{post.icon}</div>
                  <div className="blog-image-overlay" />
                </div>

                <div className="blog-content">
                  <div className="blog-meta">
                    <span>📅 {post.date}</span>
                    <span>•</span>
                    <span>🕒 {post.readTime}</span>
                  </div>

                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>

                  <div className="blog-footer">
                    <div className="blog-author">
                      <div className="author-avatar">{post.author.charAt(0)}</div>
                      <span className="author-name">{post.author}</span>
                    </div>
                    <div className="read-more">
                      Read <span>→</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div 
                  key={i} 
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "40px" }}>
              No posts found for this category.
            </div>
          )}

        </div>
      </div>
    </>
  );
}
