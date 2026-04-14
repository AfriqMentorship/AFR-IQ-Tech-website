import { useState, useEffect } from "react";
import { COURSE_UNITS } from "../supabaseClient";
import { useCart } from "./CartContext";
import { localProducts } from "../data/localProducts";

const styles = `
  .page { 
    min-height: calc(100vh - 75px); 
    background: var(--bg-base); 
    color: var(--text-primary); 
    font-family: 'Poppins', sans-serif; 
    transition: all 0.3s ease; 
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
    background: radial-gradient(ellipse 70% 60% at 90% 50%, var(--accent-orange-glow) 0%, transparent 70%);
    pointer-events: none;
  }
  .page-grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    opacity: 0.3;
  }
  .page-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-green);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .page-eyebrow::before { content: ''; display: block; width: 32px; height: 1.5px; background: var(--accent-green); opacity: 0.6; }
  .page-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(56px, 8vw, 92px);
    line-height: 0.9;
    color: var(--text-primary);
    margin-bottom: 24px;
  }
  .page-title .hl { color: var(--accent-orange); text-shadow: 0 0 30px var(--accent-orange-glow); }
  .page-desc { font-size: 18px; color: var(--text-secondary); max-width: 620px; line-height: 1.6; }

  /* Shop Layout */
  .shop-container {
    padding: 64px 48px;
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 64px;
  }

  /* Sidebar Filters */
  .shop-sidebar {
    position: sticky;
    top: 100px;
    height: max-content;
  }

  .filter-group {
    margin-bottom: 40px;
  }

  .filter-title {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
  }
  .filter-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border-subtle);
  }

  .filter-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .filter-item {
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    font-size: 15px;
    color: var(--text-secondary);
    transition: all 0.25s;
    font-weight: 600;
  }

  .filter-item:hover {
    color: var(--accent-orange);
    transform: translateX(4px);
  }

  .filter-checkbox {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 2px solid var(--border-strong);
    background: var(--bg-level2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;
    font-size: 12px;
    color: var(--text-inverse);
  }

  .filter-item.active .filter-checkbox {
    background: var(--accent-orange);
    border-color: var(--accent-orange);
  }

  .filter-item.active {
    color: var(--accent-orange);
  }

  /* Product Grid */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }

  .product-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--shadow-soft);
  }

  .product-card:hover {
    border-color: var(--accent-orange);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }

  .product-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: var(--accent-orange);
    color: var(--text-inverse);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 900;
    padding: 6px 12px;
    border-radius: 6px;
    z-index: 2;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 15px var(--accent-orange-glow);
    white-space: nowrap;
  }

  .product-image-box {
    height: 200px;
    background: var(--bg-level2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .product-placeholder {
    font-size: 48px;
    opacity: 0.4;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .product-image-box img {
     width: 100%; height: 100%; object-fit: cover;
     transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .product-card:hover .product-placeholder, .product-card:hover .product-image-box img {
    transform: scale(1.1);
  }

  .product-info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .product-category {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 12px;
    font-weight: 700;
  }

  .product-name {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.2;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .product-price {
    font-family: 'Poppins', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: var(--accent-green);
    text-shadow: 0 0 10px rgba(0, 200, 120, 0.2);
    margin-bottom: 20px;
    letter-spacing: 0.02em;
  }

  .product-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .spec-tag {
    background: var(--bg-level2);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    padding: 6px 12px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
  }

  .add-to-cart-btn {
    margin-top: auto;
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 2px solid var(--accent-orange);
    color: var(--accent-orange);
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .add-to-cart-btn.added {
    background: var(--accent-green);
    color: var(--text-inverse);
    border-color: var(--accent-green);
    box-shadow: 0 8px 20px var(--accent-green-glow);
  }
  .add-to-cart-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--bg-level2) !important;
    color: var(--text-muted) !important;
    border-color: var(--border-subtle) !important;
    box-shadow: none !important;
  }

  .product-card:hover .add-to-cart-btn:not(.added):not(:disabled) {
    background: var(--accent-orange);
    color: var(--text-inverse);
    box-shadow: 0 10px 20px var(--accent-orange-glow);
  }

  @media (max-width: 1100px) {
    .shop-container { display: flex; flex-direction: column; gap: 32px; }
    .shop-sidebar { position: static; display: flex; flex-wrap: wrap; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border-subtle); }
    .filter-group { margin-bottom: 0; flex: 1; min-width: 200px; }
  }

  @media (max-width: 900px) {
    .products-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .shop-container { padding: 40px 20px; }
    .page-hero { padding: 80px 20px 60px; }
    .products-grid { grid-template-columns: 1fr; }
    .shop-sidebar { flex-direction: column; }
  }

  .shop-error-alert {
    grid-column: 1 / -1;
    background: rgba(255, 80, 80, 0.1);
    border: 1px solid rgba(255, 80, 80, 0.2);
    color: #ff5050;
    padding: 16px 24px;
    border-radius: 16px;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 15px;
    animation: alertSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    box-shadow: 0 10px 30px rgba(255, 80, 80, 0.05);
  }
  @keyframes alertSlideIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  .error-icon { font-size: 20px; }
  .error-message { flex: 1; }
  .error-close {
    background: none; border: none; color: #ff5050; 
    cursor: pointer; font-size: 18px; opacity: 0.6; 
    transition: opacity 0.2s;
  }
  .error-close:hover { opacity: 1; }

  /* CART STYLES */
  .floating-cart-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    background: var(--accent-gradient);
    color: var(--text-inverse);
    border: none;
    border-radius: 50%;
    width: 72px;
    height: 72px;
    font-size: 28px;
    cursor: pointer;
    box-shadow: 0 12px 30px var(--accent-orange-glow);
    z-index: 100;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .floating-cart-btn:hover {
    transform: translateY(-8px) rotate(8deg);
    filter: brightness(1.1);
  }
  .cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--accent-green);
    color: var(--text-inverse);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: bold;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--bg-base);
    box-shadow: 0 4px 10px var(--accent-green-glow);
  }

  .course-search-container {
    background: var(--bg-level2);
    border: 1px solid var(--border-medium);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeIn 0.4s ease;
  }
  .course-search-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 800;
    color: var(--accent-orange);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .course-search-input {
    width: 100%;
    padding: 16px 20px;
    background: var(--bg-level1) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff9500' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 20px center;
    background-size: 20px;
    border: 2px solid var(--border-subtle);
    border-radius: 12px;
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
    appearance: none;
  }
  .course-search-input:focus {
    border-color: var(--accent-orange);
    box-shadow: 0 0 15px var(--accent-orange-glow);
  }
  .course-search-input option {
    background: var(--bg-level1);
    color: var(--text-primary);
    padding: 10px;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

`;

const CATEGORIES = ["All", "Laptops", "Recommended PCs"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [courseSearch, setCourseSearch] = useState("");
  const [addedItems, setAddedItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopError, setShopError] = useState("");

  const { addToCart, setCartOpen, cartItemCount } = useCart();

  function fetchProducts() {
    // Only use localProducts (now exclusively Jumia items)
    const allProducts = localProducts.map(lp => ({...lp}));
    setProducts(allProducts);
    setLoading(false);
  }

  useEffect(() => {
    // Avoid synchronous setState in effect
    const t = setTimeout(() => fetchProducts(), 0);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = activeCategory === "All"
    ? products
    : activeCategory === "Recommended PCs"
      ? products.filter(p => {
          if (!p.recommended_for || p.recommended_for.length === 0) return false;
          if (!courseSearch) return true;
          return p.recommended_for.some(course => 
            course.toLowerCase().includes(courseSearch.toLowerCase())
          );
        })
      : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
    setTimeout(() => setCartOpen(true), 300);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        <div className="page-hero">
          <div className="page-grid-bg" />
          <div className="page-eyebrow">Tech Hub Store</div>
          <h1 className="page-title">Enterprise <span className="hl">Hardware</span></h1>
          <p className="page-desc">
            Procure premium laptops, networking equipment, and smart accessories tailored for modern businesses and IT professionals.
          </p>
        </div>

        <div className="shop-container">
          {shopError && (
            <div className="shop-error-alert">
              <span className="error-icon">⚠️</span>
              <span className="error-message">{shopError}</span>
              <button className="error-close" onClick={() => setShopError("")}>✕</button>
            </div>
          )}

          <aside className="shop-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">Categories</h3>
              <ul className="filter-list">
                {CATEGORIES.map(cat => (
                  <li
                    key={cat}
                    className={`filter-item ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <div className="filter-checkbox">
                      {activeCategory === cat ? "✓" : ""}
                    </div>
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Price Range</h3>
              <ul className="filter-list">
                <li className="filter-item">
                  <div className="filter-checkbox" /> Under UGX 1,000,000
                </li>
                <li className="filter-item">
                  <div className="filter-checkbox" /> UGX 1,000,000 - 2,000,000
                </li>
                <li className="filter-item">
                  <div className="filter-checkbox" /> UGX 2,000,000 - 3,500,000
                </li>
                <li className="filter-item">
                  <div className="filter-checkbox" /> Over UGX 3,500,000
                </li>
              </ul>
              <div style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(var(--text-rgb), 0.4)' }}>
                * Pricing filters coming soon
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="product-side">
            {activeCategory === "Recommended PCs" && (
              <div className="course-search-container">
                <span className="course-search-label">Find the Best PC for Your Course</span>
                <select 
                  className="course-search-input" 
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                >
                  <option value="">-- Click to Select Your Course --</option>
                  {Object.keys(COURSE_UNITS).map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="products-grid">
            {loading ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
                Loading hardware catalog...
              </div>
            ) : filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                {product.badge && (
                  <div className="product-badge">
                    UGX {Number(product.price).toLocaleString()}
                  </div>
                )}

                <div className="product-image-box">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="product-placeholder"
                    style={{ display: product.image_url ? 'none' : 'flex' }}
                  >
                    {product.icon || '📦'}
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'monospace' }}>ID: {product.id.split('-')[0].toUpperCase()}</div>
                  <h3 className="product-name">{product.name}</h3>

                  <div className="product-specs">
                    {product.specs && product.specs.map(spec => (
                      <span className="spec-tag" key={spec}>{spec}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto', marginBottom: '12px', fontSize: '11px', color: product.stock > 0 ? 'var(--accent-green)' : '#ff5050', fontWeight: '800' }}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                  </div>

                  <button
                    className={`add-to-cart-btn ${addedItems[product.id] ? "added" : ""}`}
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    {addedItems[product.id] ? "✓ Added to Cart" : "+ Add to Cart"}
                  </button>
                </div>
              </div>
            ))}

            {!loading && filteredProducts.length === 0 && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
                No products found in this category.
              </div>
            )}
          </div>

          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <button className="floating-cart-btn" onClick={() => setCartOpen(true)}>
          🛒
          <div className="cart-badge">{cartItemCount}</div>
        </button>
      )}
    </>
  );
}
