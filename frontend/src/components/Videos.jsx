import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const styles = `
  .videos-page {
    min-height: calc(100vh - 75px);
    background: var(--bg-base);
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    padding: 80px 48px;
    transition: background 0.3s ease;
  }
  .videos-hero {
    text-align: center;
    margin-bottom: 60px;
  }
  .videos-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-orange);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 16px;
    font-weight: 700;
  }
  .videos-title {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
    color: var(--text-primary);
  }
  .videos-title span { color: var(--accent-orange); }
  .videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .video-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s ease;
    box-shadow: var(--shadow-soft);
  }
  .video-card:hover {
    transform: translateY(-8px);
    border-color: var(--accent-orange);
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
  }
  .video-frame {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
  }
  .video-info {
    padding: 24px;
  }
  .video-card-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text-primary);
  }
  .video-card-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
    font-family: 'Inter', sans-serif;
  }
  .empty-state {
    text-align: center;
    padding: 80px 24px;
    color: var(--text-muted);
    font-family: 'Inter', sans-serif;
    background: var(--bg-level1);
    border: 2px dashed var(--border-subtle);
    border-radius: 24px;
    max-width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    .videos-page { padding: 40px 24px; }
    .videos-grid { grid-template-columns: 1fr; }
  }
`;

function getEmbedUrl(url) {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      const { data, error } = await supabase
        .from("site_videos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setVideos(data);
      }
      setLoading(false);
    }
    loadVideos();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="videos-page">
        <div className="videos-hero">
          <div className="videos-eyebrow">Our Media</div>
          <h1 className="videos-title">Watch & <span>Learn</span></h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
            Catch up on our latest tech showcases, training previews, and events.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading videos...</div>
        ) : videos.length > 0 ? (
          <div className="videos-grid">
            {videos.map(v => (
              <div key={v.id} className="video-card">
                <iframe 
                  className="video-frame" 
                  src={getEmbedUrl(v.video_url)} 
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="video-info">
                  <div className="video-card-title">{v.title}</div>
                  {v.description && <div className="video-card-desc">{v.description}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎥</div>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>No Videos Yet</div>
            <p>Our admin is working hard to bring you new content. Check back later!</p>
          </div>
        )}
      </div>
    </>
  );
}
