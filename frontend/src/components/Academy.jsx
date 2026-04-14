import React from 'react';
import './Academy.css';

const Academy = () => {
    return (
        <div className="academy-container">
            <h1 className="academy-title">Welcome to Our Academy</h1>
            <p className="academy-description">Here at the academy, we strive to offer the best resources and guidance for learning.</p>
            <div className="courses">
                <div className="course">
                    <h2 className="course-title">Course 1</h2>
                    <p className="course-description">Learn the fundamentals of programming with our introductory course.</p>
                </div>
                <div className="course">
                    <h2 className="course-title">Course 2</h2>
                    <p className="course-description">Dive deeper into web development with our intermediate-level course.</p>
                </div>
                <div className="course">
                    <h2 className="course-title">Course 3</h2>
                    <p className="course-description">Master advanced concepts and technologies in our expert course.</p>
                </div>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


export default function Academy() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("physical");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [enrollCourse, setEnrollCourse] = useState(null);
  const [watchCourse, setWatchCourse] = useState(null);
  const [showIntakeForm, setShowIntakeForm] = useState(false);

  const [dbPhysicalCourses] = useState([]);
  const [dbSelfPacedCourses, setDbSelfPacedCourses] = useState([]);
  const [approvedCourses, setApprovedCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const { data } = await supabase.from('academy_videos').select('*').order('created_at', { ascending: false });
      if (data) setDbSelfPacedCourses(data);
    } catch (err) {
      console.error("Error fetching online courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user?.id) {
      supabase.from('academy_enrollments')
        .select('program_name')
        .eq('user_id', user.id)
        .in('status', ['Approved', 'Completed', 'Ongoing'])
        .then(({ data }) => {
          if (data) {
            // Store just the course titles (stripping the " (Mode)" part if needed for comparison)
            const approved = data
              .filter(d => d.program_name)
              .map(d => d.program_name.split(' (')[0]);
            setApprovedCourses(approved);
          }
        });
    } else {
      setApprovedCourses([]);
    }
  }, [user]);

  const courses = activeTab === "physical" ? (dbPhysicalCourses.length ? dbPhysicalCourses : physicalCourses) : (dbSelfPacedCourses.length ? dbSelfPacedCourses : selfPacedCourses);
  
  // Dynamic categories based on current tab's courses
  const categories = ["All", ...new Set(courses.filter(c => c.category).map(c => c.category))];

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchLevel = activeLevel === "All Levels" || c.levelLabel === activeLevel;
    const matchSearch = search === "" || 
      (c.title && c.title.toLowerCase().includes(search.toLowerCase())) || 
      (c.category && c.category.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchLevel && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "popular") return (b.reviews || 0) - (a.reviews || 0);
    if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
    
    const getPriceValue = (p) => {
      if (!p) return 0;
      if (typeof p === 'number') return p;
      const num = parseInt(p.toString().replace(/\D/g, ""));
      return isNaN(num) ? 0 : num;
    };

    if (sort === "price-low") return getPriceValue(a.price) - getPriceValue(b.price);
    if (sort === "price-high") return getPriceValue(b.price) - getPriceValue(a.price);
    return 0;
  });

  const clearFilters = () => { setActiveCategory("All"); setActiveLevel("All Levels"); setSearch(""); };

  return (
    <>
      <style>{styles}</style>
      {watchCourse && (
        <WatchModal
          course={watchCourse}
          onClose={() => setWatchCourse(null)}
        />
      )}
      {/* Course enrollment modal (from card click) */}
      {enrollCourse && (
        <EnrollModal
          course={enrollCourse}
          mode={activeTab}
          onClose={() => setEnrollCourse(null)}
          user={user}
        />
      )}
      {/* General intake registration form (from banner) */}
      {showIntakeForm && (
        <IntakeModal
          defaultMode={activeTab}
          onClose={() => setShowIntakeForm(false)}
          user={user}
        />
      )}
      <div className="academy-page">

        {/* ─── HERO ─── */}
        <div className="ac-hero">
          <div className="ac-grid-bg" />
          <div className="ac-hero-inner">
            <div className="ac-hero-content">
              <div className="ac-eyebrow">Academy</div>
              <h1 className="ac-hero-title" style={{ paddingLeft: '44px' }}>Learn. <span className="hl">Think.</span> <span style={{ color: '#fff' }}>Innovate.</span></h1>
              <p className="ac-hero-desc">
                Professional IT training for East Africa's digital workforce. Choose between instructor-led physical classes in Kampala or flexible self-paced online courses.
              </p>
              <div className="ac-hero-stats">
                <div><div className="ac-stat-n">18</div><div className="ac-stat-l">Courses</div></div>
                <div><div className="ac-stat-n">2,400+</div><div className="ac-stat-l">Graduates</div></div>
                <div><div className="ac-stat-n">94%</div><div className="ac-stat-l">Employment Rate</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TABS ─── */}
        <div className="ac-tabs-bar">
          <button className={`ac-tab ${activeTab === "physical" ? "active" : ""}`} onClick={() => { setActiveTab("physical"); setActiveCategory("All"); setActiveLevel("All Levels"); }}>
            <span className="ac-tab-icon">🏫</span>
            Physical Classes
            <span className="ac-tab-count">{dbPhysicalCourses.length || physicalCourses.length}</span>
          </button>
          <button className={`ac-tab ${activeTab === "selfpaced" ? "active" : ""}`} onClick={() => { setActiveTab("selfpaced"); setActiveCategory("All"); setActiveLevel("All Levels"); }}>
            <span className="ac-tab-icon">💻</span>
            Self-Paced Online
            <span className="ac-tab-count">{dbSelfPacedCourses.length || selfPacedCourses.length}</span>
          </button>
        </div>

        {/* ─── BODY ─── */}
        <div className="ac-body">

          {/* SIDEBAR */}
          <aside className="ac-sidebar">
            <div className="sidebar-section">
              <div className="sidebar-section-title">Category</div>
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`level-btn ${activeCategory === cat ? "active" : ""}`} 
                  style={{ textTransform: 'capitalize' }}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "All" ? "All Categories" : cat}
                </button>
              ))}
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-title">Level</div>
              {levels.map(l => (
                <button key={l} className={`level-btn ${activeLevel === l ? "active" : ""}`} onClick={() => setActiveLevel(l)}>
                  {l}
                </button>
              ))}
            </div>

            {(activeCategory !== "All" || activeLevel !== "All Levels" || search !== "") && (
              <button className="clear-btn" onClick={clearFilters}>Clear all filters</button>
            )}
          </aside>

          {/* MAIN */}
          <main className="ac-main">
            {/* Search */}
            <div className="ac-search">
              <input
                className="ac-search-input"
                placeholder={activeTab === "physical" ? "Search physical courses..." : "Search online courses..."}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="ac-search-btn">🔍</button>
            </div>

            {/* Header */}
            <div className="ac-main-header">
              <div className="ac-results-count">
                Showing <span>{sorted.length}</span> {activeTab === "physical" ? "physical" : "online"} course{sorted.length !== 1 ? "s" : ""}
                {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
              </div>
              <div className="ac-sort">
                Sort by:
                <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Featured banner */}
            {activeTab === "selfpaced" && activeCategory === "All" && search === "" && (
              <div className="featured-banner">
                <div className="fb-left">
                  <div className="fb-icon">🎓</div>
                  <div>
                    <div className="fb-title">Study Anytime, Anywhere</div>
                    <div className="fb-sub">Lifetime access to course materials — learn at your own pace and get certified</div>
                  </div>
                </div>
                <button className="fb-btn" onClick={() => setShowIntakeForm(true)}>Get Started Free →</button>
              </div>
            )}

            {/* Course grid */}
            <div className="course-grid">
              {sorted.length > 0 ? (
                sorted.map((course, idx) => (
                  <CourseCard
                    key={course.title || idx}
                    course={course}
                    type={activeTab === "physical" ? "physical" : "selfpaced"}
                    onEnroll={() => setEnrollCourse(course)}
                    isApproved={approvedCourses.includes(course.title)}
                    onWatch={() => setWatchCourse(course)}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <div className="empty-title">No Courses Found</div>
                  <div className="empty-sub">Try adjusting your filters or search terms</div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}