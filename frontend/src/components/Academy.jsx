import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --orange: var(--accent-orange);
    --green: var(--accent-green);
    --dark: var(--bg-base);
    --dark2: var(--bg-level1);
    --dark3: var(--bg-level2);
    --text: var(--text-primary);
    --muted: var(--text-secondary);
    --border: var(--border-subtle);
    --star: #f5b041;
  }

  .academy-page {
    min-height: calc(100vh - 75px);
    background: var(--bg-base);
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
  }

  /* ─── HERO BANNER ─── */
  .ac-hero {
    position: relative;
    padding: 80px 48px;
    border-bottom: 1px solid var(--border-medium);
    overflow: hidden;
    background: var(--bg-base);
  }
  .ac-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 80% at 5% 50%, var(--accent-orange-glow) 0%, rgba(var(--bg-base-rgb), 0) 65%),
                radial-gradient(ellipse 40% 60% at 90% 20%, var(--accent-green-glow) 0%, rgba(var(--bg-base-rgb), 0) 60%);
    pointer-events: none;
  }
  .ac-grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
    background-size: 60px 60px; pointer-events: none;
    opacity: 0.35;
  }
  .ac-hero-inner {
    position: relative;
    z-index: 2;
    max-width: 1350px;
    margin: 0 auto;
  }
  .ac-hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .ac-eyebrow {
    font-family: 'Inter', sans-serif; font-size: 11px; color: var(--green);
    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .ac-eyebrow::before { content: ''; display: block; width: 32px; height: 1.5px; background: var(--green); opacity: 0.6; }
  .ac-hero-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(38px, 6.5vw, 84px);
    line-height: 1.1; color: #ffffff; margin-bottom: 20px;
    padding-left: 10px;
    overflow: visible;
    text-shadow: 0 4px 30px rgba(0,0,0,0.35); 
    transition: color 0.3s ease;
  }
  [data-theme="light"] .ac-hero-title { color: #000000; text-shadow: none; }
  [data-theme="light"] .ac-hero-title .hl-alt { 
    color: #ffffff; 
    text-shadow: 0 4px 24px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.3);
  }
  .ac-hero-title .hl { color: var(--orange); text-shadow: 0 0 30px var(--accent-orange-glow); }
  .ac-hero-title .hl-alt { color: #ffffff; }


  .ac-hero-desc { font-size: 17px; color: var(--muted); line-height: 1.6; margin-bottom: 36px; max-width: 700px; }

  .ac-hero-stats {
    display: flex; gap: 48px; padding-top: 32px;
    border-top: 1px solid var(--border-subtle);
  }
  .ac-stat-n { font-family: 'Poppins', sans-serif; font-size: 38px; color: var(--orange); line-height: 1; }
  .ac-stat-l { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 6px; }

  /* ─── TAB BAR ─── */
  .ac-tabs-bar {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0 48px;
    background: var(--bg-glass);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--border-medium);
    position: sticky;
    top: 75px;
    z-index: 50;
    transition: background 0.3s;
  }

  .ac-tab {
    display: flex; align-items: center; gap: 10px;
    padding: 20px 32px;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
    color: var(--muted);
    border: none; background: none; cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.25s; letter-spacing: 0.04em;
    margin-bottom: -1px;
  }
  .ac-tab:hover { color: var(--text); background: rgba(var(--text-primary-rgb), 0.03); }
  .ac-tab.active { color: var(--orange); border-bottom-color: var(--orange); }
  .ac-tab-icon { font-size: 18px; }
  .ac-tab-count {
    font-family: 'Inter', sans-serif; font-size: 10px;
    padding: 2px 8px; border-radius: 20px;
    background: var(--accent-orange-glow); color: var(--orange);
    border: 1px solid var(--border-medium);
  }
  .ac-tab.active .ac-tab-count { background: var(--orange); color: var(--dark); border-color: var(--orange); }

  /* ─── BODY LAYOUT ─── */
  .ac-body {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 0;
    min-height: 600px;
    background: var(--bg-base);
  }

  /* ─── SIDEBAR ─── */
  .ac-sidebar {
    padding: 40px 32px;
    border-right: 1px solid var(--border-subtle);
    background: var(--bg-level1);
    position: sticky;
    top: calc(75px + 60px);
    height: fit-content;
    max-height: calc(100vh - 135px);
    overflow-y: auto;
    transition: all 0.3s ease;
  }

  .sidebar-section { margin-bottom: 36px; }
  .sidebar-section-title {
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em;
    margin-bottom: 16px; padding-bottom: 10px;
    border-bottom: 1px solid var(--border-subtle);
    font-weight: 700;
  }

  .filter-option {
    display: flex; align-items: center; gap: 12px;
    padding: 8px 0; cursor: pointer;
    transition: all 0.2s;
  }
  .filter-option:hover .filter-label { color: var(--accent-orange); }

  .filter-check {
    width: 18px; height: 18px; border-radius: 4px;
    border: 2px solid var(--border-strong);
    background: var(--bg-level2); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; font-size: 11px;
  }
  .filter-check.checked { background: var(--accent-orange); border-color: var(--accent-orange); color: var(--text-inverse); }

  .filter-label { font-size: 14px; color: var(--text-secondary); flex: 1; transition: color 0.2s; }
  .filter-count { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--text-muted); opacity: 0.6; }

  .level-btn {
    display: block; width: 100%; text-align: left;
    padding: 10px 16px; border-radius: 6px; border: 1px solid var(--border-subtle);
    background: var(--bg-level2); color: var(--text-secondary); font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;
    margin-bottom: 8px;
  }
  .level-btn:hover { border-color: var(--accent-orange); color: var(--text-primary); background: var(--bg-level1); }
  .level-btn.active { background: var(--accent-orange-glow); border-color: var(--accent-orange); color: var(--accent-orange); }

  .clear-btn {
    background: none; border: none;
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--accent-orange); cursor: pointer; letter-spacing: 0.08em;
    text-decoration: underline; padding: 0; font-weight: 700;
  }

  /* ─── MAIN CONTENT ─── */
  .ac-main { padding: 40px 48px; background: var(--bg-base); }

  .ac-main-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
  }
  .ac-results-count { font-size: 13px; color: var(--text-muted); font-family: 'Inter', sans-serif; }
  .ac-results-count span { color: var(--text-primary); font-weight: 700; }

  .ac-sort {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Inter', sans-serif; font-size: 11px; color: var(--text-muted);
  }
  .sort-select {
    padding: 8px 16px; background: var(--bg-level1);
    border: 1px solid var(--border-medium); border-radius: 6px;
    color: var(--text-primary); font-family: 'Inter', sans-serif; font-size: 11px;
    outline: none; cursor: pointer; transition: all 0.2s;
  }
  .sort-select:focus { border-color: var(--accent-orange); background: var(--bg-level2); }

  /* ─── SEARCH BAR ─── */
  .ac-search {
    display: flex; gap: 0; margin-bottom: 32px;
  }
  .ac-search-input {
    flex: 1; padding: 16px 20px;
    background: var(--bg-level1); border: 1px solid var(--border-medium);
    border-right: none; border-radius: 10px 0 0 10px;
    color: var(--text-primary); font-family: 'Poppins', sans-serif; font-size: 14px;
    outline: none; transition: all 0.25s;
  }
  .ac-search-input:focus { border-color: var(--accent-orange); background: var(--bg-level2); }
  .ac-search-input::placeholder { color: var(--text-muted); opacity: 0.5; }
  .ac-search-btn {
    padding: 0 28px; background: var(--accent-gradient); color: var(--text-inverse);
    border: none; border-radius: 0 10px 10px 0;
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 14px;
    cursor: pointer; transition: all 0.25s;
  }
  .ac-search-btn:hover { filter: brightness(1.1); transform: translateX(2px); }

  /* ─── COURSE GRID ─── */
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
  }

  /* ─── COURSE CARD ─── */
  .course-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex; flex-direction: column;
    box-shadow: var(--shadow-soft);
    cursor: pointer;
  }
  .course-card:hover {
    transform: translateY(-8px);
    border-color: var(--accent-orange);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }

  /* Thumbnail */
  .course-thumb {
    height: 160px;
    display: flex; align-items: center; justify-content: center;
    font-size: 58px;
    position: relative;
    overflow: hidden;
    background: var(--bg-level2);
    transition: all 0.4s ease;
  }
  .course-card:hover .course-thumb { filter: brightness(1.1); }

  .course-thumb-badge {
    position: absolute; top: 12px; left: 12px;
    padding: 6px 12px; border-radius: 6px;
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.05em; z-index: 2;
    background: var(--accent-orange); color: var(--text-inverse);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  .badge-bestseller { background: var(--accent-orange); }
  .badge-new { background: var(--accent-green); }
  .badge-hot { background: #ff4d4d; }

  .course-level-dot {
    position: absolute; bottom: 12px; right: 12px;
    padding: 4px 10px; border-radius: 4px;
    font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 700;
    background: var(--bg-glass);
    border: 1px solid var(--border-subtle);
    z-index: 2;
  }
  .level-beg { color: var(--accent-green); }
  .level-int { color: var(--accent-orange); }
  .level-adv { color: #ff6060; }

  /* Card body */
  .course-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }

  .course-category {
    font-family: 'Inter', sans-serif; font-size: 10px;
    color: var(--accent-orange); text-transform: uppercase; letter-spacing: 0.15em;
    margin-bottom: 8px; font-weight: 700;
  }

  .course-title {
    font-size: 18px; font-weight: 800; color: var(--text-primary);
    line-height: 1.4; margin-bottom: 12px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }

  .course-instructor {
    font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;
    font-family: 'Inter', sans-serif;
  }

  /* Rating row */
  .course-rating-row {
    display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
  }
  .rating-score { font-size: 14px; font-weight: 800; color: var(--star); }
  .stars { display: flex; gap: 2px; }
  .star { color: var(--star); font-size: 12px; }
  .star.half { opacity: 0.5; }
  .rating-count { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--text-muted); }

  /* Meta row */
  .course-meta {
    display: flex; gap: 16px; margin-bottom: 20px;
    flex-wrap: wrap; padding: 12px 0;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
  }
  .course-meta-item {
    display: flex; align-items: center; gap: 6px;
    font-family: 'Inter', sans-serif; font-size: 11px; color: var(--text-secondary);
  }
  .meta-icon { font-size: 14px; color: var(--accent-orange); opacity: 0.7; }

  /* Price row */
  .course-price-row {
    display: flex; align-items: center; justify-content: center;
    padding-top: 10px;
  }
  .course-enroll-btn {
    width: 100%;
    padding: 12px 24px;
    background: var(--accent-orange); border: none;
    color: var(--text-inverse); border-radius: 10px;
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 14px;
    cursor: pointer; transition: all 0.3s ease; letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .course-enroll-btn:hover { 
    transform: translateY(-2px);
    filter: brightness(1.1); 
    box-shadow: 0 8px 20px var(--accent-orange-glow); 
  }

  /* Physical tag */
  .phys-tag {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 12px; border-radius: 6px; margin-bottom: 12px; width: fit-content;
    background: var(--accent-green-glow); border: 1px solid var(--accent-green);
    font-family: 'Inter', sans-serif; font-size: 10px; color: var(--accent-green);
    font-weight: 700;
  }

  /* ─── FEATURED BANNER ─── */
  .featured-banner {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, var(--accent-orange-glow) 0%, var(--accent-green-glow) 100%);
    border: 1px solid var(--border-medium);
    border-radius: 12px;
    padding: 32px 40px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px; margin: 16px 0;
    backdrop-filter: blur(10px);
  }
  .fb-left { display: flex; align-items: center; gap: 20px; }
  .fb-icon { font-size: 42px; filter: drop-shadow(0 0 10px var(--accent-orange-glow)); }
  .fb-title { font-family: 'Poppins', sans-serif; font-size: 28px; color: var(--text-primary); margin-bottom: 6px; letter-spacing: 0.02em; }
  .fb-sub { font-size: 14px; color: var(--text-secondary); font-family: 'Inter', sans-serif; }
  .fb-btn {
    padding: 14px 32px; background: var(--accent-orange); color: var(--text-inverse);
    border: none; border-radius: 10px; font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 14px; cursor: pointer; white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); flex-shrink: 0;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .fb-btn:hover { filter: brightness(1.1); transform: translateY(-3px); box-shadow: 0 10px 20px var(--accent-orange-glow); }

  /* Empty state */
  .empty-state {
    grid-column: 1 / -1;
    text-align: center; padding: 100px 32px;
  }
  .empty-icon { font-size: 56px; margin-bottom: 20px; opacity: 0.5; }
  .empty-title { font-family: 'Poppins', sans-serif; font-size: 32px; color: var(--text-muted); margin-bottom: 12px; }
  .empty-sub { font-size: 14px; color: var(--text-muted); font-family: 'Inter', sans-serif; opacity: 0.7; }

  @media (max-width: 900px) {
    .ac-body { grid-template-columns: 1fr; }
    .ac-sidebar { 
      position: static; 
      max-height: 280px; 
      border-right: none; 
      border-bottom: 1px solid var(--border-subtle); 
      padding: 16px; 
      margin: 16px; 
      border-radius: 12px;
      background: var(--bg-level1);
    }
    .ac-main { padding: 24px 16px; }
    .ac-hero { padding: 40px 16px; text-align: left; }
    .ac-hero-inner { grid-template-columns: 1fr; gap: 32px; }
    .ac-hero-stats { justify-content: flex-start; flex-wrap: wrap; gap: 24px; }
    .ac-hero-image-block { transform: none; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
    .ac-tabs-bar { padding: 0 12px; overflow-x: auto; white-space: nowrap; scrollbar-width: none; }
    .ac-tab { padding: 14px 12px; font-size: 13px; flex-shrink: 0; }
    .featured-banner { flex-direction: column; text-align: center; padding: 32px 16px; }
    .fb-left { flex-direction: column; }
    .course-card { margin: 0 auto; width: 100%; max-width: 400px; }
    .course-meta { flex-direction: column; gap: 8px; align-items: flex-start; }
  }

  @media (max-width: 450px) {
    .ac-hero { padding: 40px 20px; }
    .ac-hero-title { font-size: 38px; margin-bottom: 16px; line-height: 1.2; padding-left: 5px; }
    .ac-hero-desc { font-size: 15px; margin-bottom: 24px; padding-right: 10px; }
    .ac-hero-stats { gap: 16px; border-top: 1px solid var(--border-subtle); padding-top: 24px; }
    .ac-stat-n { font-size: 28px; }
    .ac-tabs-bar { top: 60px; }
    .ac-tab { padding: 12px 16px; font-size: 12px; }
    .course-grid { gap: 20px; }
    .ac-main { padding: 20px 12px; }
    .ac-search-input { padding: 12px 16px; font-size: 13px; }
    .ac-search-btn { padding: 0 20px; font-size: 13px; }
  }

  @media (max-width: 380px) {
    .ac-hero { padding: 32px 16px; }
    .ac-hero-title { font-size: 32px; padding-left: 5px; }
    .ac-stat-n { font-size: 24px; }
  }


  /* ─── ENROLLMENT MODAL ─── */
  .enroll-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.73); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    overflow: hidden;
  }

  .enroll-modal {
    background: var(--bg-level1); border: 1px solid var(--border-medium);
    border-radius: 24px; width: 100%; max-width: 680px;
    padding: 36px 40px; position: relative;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    animation: slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    max-height: calc(100vh - 48px);
    overflow-y: auto;
  }
  @media (max-width: 600px) {
    .enroll-modal { padding: 32px 20px; }
    .mode-grid { grid-template-columns: 1fr; }
    .enroll-form-title { font-size: 24px; }
  }
  @keyframes slideUp { from { transform: translateY(30px); } to { transform: translateY(0); } }

  .enroll-close {
    position: absolute; top: 20px; right: 20px;
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--bg-level2); border: 1px solid var(--border-subtle);
    color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.25s; font-size: 18px;
  }
  .enroll-close:hover { background: rgba(255,80,80,0.1); border-color: rgba(255,80,80,0.2); color: #ff5050; transform: rotate(90deg); }

  .enroll-course-badge {
    display: flex; align-items: center; gap: 10px;
    background: var(--bg-level2); border: 1px solid var(--border-medium);
    border-radius: 10px; padding: 10px 14px; margin-bottom: 16px;
  }
  .enroll-course-icon { font-size: 22px; }
  .enroll-course-name { font-weight: 800; font-size: 13px; color: var(--text-primary); line-height: 1.3; }
  .enroll-course-meta { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--orange); margin-top: 2px; font-weight: 700; }

  .enroll-form-title {
    font-family: 'Poppins', sans-serif;
    font-size: 30px; color: var(--text-primary); margin-bottom: 6px;
  }
  .enroll-form-sub {
    font-size: 13px; color: var(--text-muted);
    font-family: 'Inter', sans-serif; margin-bottom: 24px;
  }

  .enroll-field { margin-bottom: 18px; }
  .enroll-label {
    display: block; font-family: 'Inter', sans-serif;
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--text-muted); margin-bottom: 7px; font-weight: 700;
  }
  .enroll-input, .enroll-select, .enroll-textarea {
    width: 100%; padding: 13px 16px;
    background: var(--bg-level2);
    border: 1px solid var(--border-subtle);
    border-radius: 10px; color: var(--text-primary);
    font-family: 'Poppins', sans-serif; font-size: 14px;
    outline: none; transition: all 0.25s;
    box-sizing: border-box;
  }
  .enroll-input:focus, .enroll-select:focus, .enroll-textarea:focus {
    border-color: var(--orange);
    background: var(--bg-level1);
    box-shadow: 0 0 8px var(--accent-orange-glow);
  }
  .enroll-input::placeholder, .enroll-textarea::placeholder { color: var(--text-muted); opacity: 0.5; }
  .enroll-select option { background: var(--bg-level1); color: var(--text-primary); }
  .enroll-textarea { resize: none; min-height: 90px; }

  .mode-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }
  .mode-card {
    border: 2px solid var(--border-subtle);
    border-radius: 10px; padding: 12px;
    cursor: pointer; transition: all 0.25s; text-align: center;
    background: var(--bg-level2);
  }
  .mode-card:hover { border-color: var(--border-strong); transform: translateY(-2px); }
  .mode-card.selected { border-color: var(--orange); background: var(--accent-orange-glow); }
  .mode-icon { font-size: 22px; margin-bottom: 4px; }
  .mode-title { font-weight: 800; font-size: 13px; color: var(--text-primary); }
  .mode-sub { font-family: 'Inter', sans-serif; font-size: 9px; color: var(--text-muted); margin-top: 2px; }

  .enroll-submit {
    width: 100%; padding: 16px;
    background: var(--accent-gradient); color: var(--text-inverse);
    border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 16px;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-top: 12px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .enroll-submit:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 12px 25px var(--accent-orange-glow); }
  .enroll-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .enroll-success {
    text-align: center; padding: 30px 0;
  }
  .enroll-success-icon { font-size: 64px; margin-bottom: 16px; filter: drop-shadow(0 0 20px var(--accent-green-glow)); }
  .enroll-success-title { font-family: 'Poppins', sans-serif; font-size: 38px; color: var(--green); margin-bottom: 12px; }
  .enroll-success-sub { font-size: 14px; color: var(--text-secondary); font-family: 'Inter', sans-serif; line-height: 1.7; }

`;


// Real AFR-IQ Technologies programs
const physicalCourses = [
  {
    image: "/courses/computer_fundamentals.jpg",
    category: "Computer Fundamentals", title: "Computer Fundamentals",
    instructor: "AFR-IQ Instructor", rating: 4.8, reviews: 320,
    duration: "10 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 500,000", badge: "bestseller", enrolled: "1,200",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Introduction to Computers, Internet & Email Basics, Speed Typing & Microsoft Office Applications. Perfect for absolute beginners.",
  },
  {
    image: "/courses/course_2.jpg",
    category: "Accounting Software", title: "Business Computing (Quick Books And Tally)",
    instructor: "AFR-IQ Instructor", rating: 4.6, reviews: 210,
    duration: "4 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 400,000", badge: null, enrolled: "890",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Learn the on-demand applications for modern Accounting.",
  },
  {
    image: "/courses/graphics_design.jpg",
    category: "Graphics Design", title: "Graphics Design",
    instructor: "AFR-IQ Instructor", rating: 4.9, reviews: 412,
    duration: "8 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 450,000", badge: "bestseller", enrolled: "1,340",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Photoshop, Illustrator, Canva, Design Principles, Color theory etc.",
  },
  {
    image: "/courses/course_4.jpg",
    category: "Marketing", title: "Digital Marketing",
    instructor: "AFR-IQ Instructor", rating: 4.7, reviews: 289,
    duration: "6 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 500,000", badge: null, enrolled: "780",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "SEO, social media ads, Google AdSense, YouTube ads and more.",
  },
  {
    image: "/courses/computer_repair.jpg",
    category: "Computer Repair and Maintenance", title: "Computer Repair And Maintenance",
    instructor: "AFR-IQ Instructor", rating: 4.8, reviews: 178,
    duration: "8 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 600,000", badge: "hot", enrolled: "540",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Build the competence to start a computer repair business. Hands-on with real hardware components.",
  },
  {
    image: "/courses/course_6.jpg",
    category: "Programming", title: "Introduction to Programming | Coding",
    instructor: "AFR-IQ Instructor", rating: 4.7, reviews: 340,
    duration: "4 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 450,000", badge: null, enrolled: "920",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Get solid programming foundations.",
  },
  {
    image: "/courses/course_7.jpg",
    category: "Web Development", title: "Website Development",
    instructor: "AFRIQ Instructor", rating: 4.8, reviews: 560,
    duration: "8 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 450,000", badge: "bestseller", enrolled: "2,100",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "HTML, CSS and JavaScript Mastery.",
  },
  {
    image: "/courses/course_8.jpg",
    category: "Web Development", title: "Advanced Website Development",
    instructor: "AFRIQ Instructor", rating: 4.9, reviews: 430,
    duration: "12 Weeks", sessions: "Mon-Fri", level: "adv", levelLabel: "Advanced",
    price: "UGX 1,500,000", badge: "hot", enrolled: "680",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Django, React, Next Js - Become a Professional Web Dev.",
  },
  {
    image: "/courses/course_9.jpg",
    category: "Networking", title: "Networking (CCNA Prep)",
    instructor: "AFRIQ Instructor", rating: 4.8, reviews: 290,
    duration: "16 Weeks", sessions: "Mon-Fri", level: "int", levelLabel: "Intermediate",
    price: "UGX 700,000", badge: null, enrolled: "360",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Learn all you need to kick start your Networking career.",
  },
  {
    image: "/courses/course_10.jpg",
    category: "Networking", title: "Linux Systems Adminstration",
    instructor: "AFRIQ Instructor", rating: 4.7, reviews: 215,
    duration: "8 Weeks", sessions: "Mon-Fri", level: "int", levelLabel: "Intermediate",
    price: "UGX 450,000", badge: null, enrolled: "750",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Master system administration on Linux.",
  },
  {
    image: "/courses/cybersecurity.jpg",
    category: "Cybersecurity", title: "Cyber Security (Comptia Security+ Prep)",
    instructor: "AFRIQ Instructor", rating: 4.9, reviews: 380,
    duration: "12 Weeks", sessions: "Mon-Fri", level: "adv", levelLabel: "Advanced",
    price: "UGX 1,200,000", badge: "bestseller", enrolled: "490",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Master the art and science of defending against cyber threats.",
  },
  {
    image: "/courses/ethical_hacking.jpg",
    category: "Cybersecurity", title: "Ethical Hacking (CEH Prep)",
    instructor: "AFRIQ Instructor", rating: 4.9, reviews: 510,
    duration: "16 Weeks", sessions: "Mon-Fri", level: "adv", levelLabel: "Advanced",
    price: "UGX 2,500,000", badge: "hot", enrolled: "320",
    location: "Makarere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Be The Hacker You Fear — Learn all the Tools needed for Modern Hacking.",
  },
  {
    image: "/courses/cloud_computing.jpg",
    category: "Cloud Computing", title: "Cloud Computing (Comptia Cloud+ Prep)",
    instructor: "AFRIQ Instructor", rating: 4.8, reviews: 210,
    duration: "8 Weeks", sessions: "Mon-Fri", level: "int", levelLabel: "Intermediate",
    price: "UGX 650,000", badge: "new", enrolled: "410",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Deploy and manage scalable cloud applications.",
  },
  {
    image: "/courses/course_14.jpg",
    category: "Mobile Development", title: "Mobile App Development",
    instructor: "AFRIQ Instructor", rating: 4.8, reviews: 290,
    duration: "12 Weeks", sessions: "Mon-Fri", level: "adv", levelLabel: "Advanced",
    price: "UGX 1,200,000", badge: "new", enrolled: "360",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Learn how to build Mobile Apps for both Android & iOS.",
  },
  {
    image: "/courses/course_15.jpg",
    category: "Data", title: "Data Analysis",
    instructor: "AFRIQ Instructor", rating: 4.8, reviews: 290,
    duration: "8 Weeks", sessions: "Mon-Fri", level: "int", levelLabel: "Intermediate",
    price: "UGX 450,000", badge: "new", enrolled: "360",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Learn how to analyze and visualize complex datasets in business.",
  },
  {
    image: "/courses/video_editing.jpg",
    category: "Video Editing and Photography", title: "Video Editing and Photography",
    instructor: "AFRIQ Instructor", rating: 4.9, reviews: 195,
    duration: "8 Weeks", sessions: "Mon-Fri", level: "beg", levelLabel: "Beginner",
    price: "UGX 600,000", badge: "new", enrolled: "410",
    location: "Makerere Kikoni, Sr. Apollo Kagwa Rd", schedule: "Mon – Fri",
    desc: "Learn all you need to start a successful Video Production and Photography business.",
  }
];

// Keep self-paced as empty — all courses are on-campus at AFR-IQ
const selfPacedCourses = [];


const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`star ${i < full ? "" : i === full && half ? "half" : "empty"}`}>
          {i < full ? "★" : i === full && half ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function CourseCard({ course, type, onEnroll, isApproved, onWatch }) {
  const levelClass = course.level === "beg" ? "level-beg" : course.level === "int" ? "level-int" : "level-adv";
  return (
    <div 
      className="course-card" 
      onClick={() => (type === 'selfpaced' && isApproved) ? onWatch() : onEnroll()}
      style={{ cursor: 'pointer' }}
    >
      <div className="course-thumb" style={!course.image ? { background: course.thumb || 'var(--bg-level2)' } : {}}>
        {course.image ? (
          <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: 52 }}>{course.icon || '📚'}</span>
        )}
        <div className={`course-thumb-badge ${course.badge ? `badge-${course.badge}` : ''}`}>
          {course.price}
        </div>
        <div className={`course-level-dot ${levelClass}`}>{course.levelLabel}</div>
      </div>

      <div className="course-body">
        <div className="course-category">{course.category || "General"}</div>
        <div className="course-title">{course.title}</div>
        <div className="course-instructor">by {course.instructor || "AFR-IQ Instructor"}</div>



        {type === "physical" ? (
          <>
            <div className="course-meta">
              <div className="course-meta-item"><span className="meta-icon">⏱</span>{course.duration}</div>
              <div className="course-meta-item"><span className="meta-icon">🗓</span>{course.sessions}</div>
              <div className="course-meta-item"><span className="meta-icon">👥</span>{course.enrolled} enrolled</div>
            </div>
          </>
        ) : (
          <div className="course-meta">
            <div className="course-meta-item"><span className="meta-icon">⏱</span>{course.duration}</div>
            <div className="course-meta-item"><span className="meta-icon">▶</span>{course.lessons}</div>
            <div className="course-meta-item"><span className="meta-icon">👥</span>{course.enrolled} students</div>
          </div>
        )}

        <div className="course-price-row">
          {type === "selfpaced" && isApproved ? (
            <button 
              className="course-enroll-btn" 
              style={{background: '#00c878', border: 'none', color: '#fff'}} 
              onClick={(e) => { e.stopPropagation(); onWatch(); }}
            >
              Watch Video 🎬
            </button>
          ) : isApproved ? (
            <button 
              className="course-enroll-btn" 
              style={{background: 'var(--bg-level2)', border: '1px solid var(--border-medium)', color: 'var(--accent-green)'}} 
              onClick={(e) => { e.stopPropagation(); onEnroll(); }}
            >
              Applied ✓
            </button>
          ) : (
            <button 
              className="course-enroll-btn" 
              onClick={(e) => { e.stopPropagation(); onEnroll(); }}
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────── ENROLLMENT MODAL ───────────────
function EnrollModal({ course, mode, onClose, user }) {
  const { signup } = useAuth();
  const [studyMode, setStudyMode] = useState(mode === 'physical' ? 'Physical' : 'Online (Self-Paced)');

  const getRecommendedPC = (courseTitle) => {
    if (!courseTitle) return null;
    const title = courseTitle.toLowerCase();
    if (title.includes('design') || title.includes('graphics') || title.includes('video') || title.includes('photography')) {
      return { name: 'HP Core i7 Touchscreen', icon: '🎨', desc: 'Powerful i7 & 16GB RAM for smooth design, video editing and photography.' };
    }
    if (title.includes('programming') || title.includes('coding') || title.includes('development') || title.includes('website') || title.includes('cyber') || title.includes('hacking')) {
      return { name: 'ThinkPad X1 Carbon i7', icon: '🛡️', desc: 'Secure, ultra-light and fast i7/16GB. Best for Software Engineering, Cybersecurity and Web Dev.' };
    }
    return { name: 'HP EliteBook i5 (8GB)', icon: '💼', desc: 'High-performance i5 Business edition. Ideal for Fundamentals and Business Computing.' };
  };
  const recPC = getRecommendedPC(course.title);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // New user registration fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    
    let currentUserId = user?.id;

    if (!user) {
      if (!fullName || !email || !password || !phone) {
         setSubmitError("Please fill in all registration fields.");
         setSubmitting(false);
         return;
      }
      
      const res = await signup({ fullName, email, phone, password });
      if (!res.success) {
         setSubmitError("Registration failed: " + res.error);
         setSubmitting(false);
         return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
         setSubmitError("Registration succeeded but couldn't verify session. Please click Enroll again to continue.");
         setSubmitting(false);
         return;
      }
      currentUserId = session.user.id;
    }

    const enrollmentData = {
      user_id: currentUserId,
      program_name: `${course.title} (${studyMode})`,
      full_name: user?.profile?.full_name || fullName,
      email: user?.email || email,
      phone: user?.profile?.phone || phone,
      status: 'Pending'
    };

    let { error } = await supabase.from('academy_enrollments').insert([enrollmentData]);

    // Fallback if full_name/email/phone columns don't exist yet
    if (error && (error.code === '42703' || error.message?.toLowerCase().includes('column') || error.code === 'PGRST204')) {
        console.warn("Table missing extra columns, using basic payload");
        const { error: fallbackErr } = await supabase.from('academy_enrollments').insert([{
            user_id: currentUserId,
            program_name: `${course.title} (${studyMode})`,
            status: 'Pending'
        }]);
        error = fallbackErr;
    }

    setSubmitting(false);
    if (error) { 
        console.error("EnrollError:", error); 
        setSubmitError(error.message || 'Something went wrong.'); 
        return; 
    }
    setDone(true);

    // Notify Admin via Email
    import('../utils/sendEmail').then(m => {
      m.sendAdminEnrollmentNotification({
        name: user?.profile?.full_name || fullName,
        email: user?.email || email,
        phone: user?.profile?.phone || phone,
        course: course.title,
        mode: studyMode
      });
    }).catch(e => console.error("Email notification failed:", e));
  };

  // Lock body scroll when modal is open so the form always appears centered
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <div className="enroll-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="enroll-modal">
        <button className="enroll-close" onClick={onClose}>✕</button>

        {done ? (
          <div className="enroll-success">
            <div className="enroll-success-icon">🎉</div>
            <div className="enroll-success-title">Application Sent!</div>
            <div className="enroll-success-sub">
              Your enrollment for <strong style={{ color: '#ffa500' }}>{course.title}</strong> has been received.<br />
              We will contact you shortly to confirm your spot.
            </div>
            <button className="enroll-submit" style={{ marginTop: 24 }} onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="enroll-form-title">Enroll Now</div>
            <div className="enroll-form-sub">We'll confirm your place within 24 hours.</div>
            {submitError && <div style={{ color: '#ff5050', fontSize: 13, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', padding: '10px', borderRadius: 6, marginBottom: 16 }}>{submitError}</div>}
            
            {!user && (
              <div style={{ padding: '20px', background: 'var(--bg-level2)', border: '1px solid var(--border-medium)', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>👋</span> Create an account to enroll
                </div>
                
                <div className="enroll-field">
                  <label className="enroll-label">Full Name *</label>
                  <input className="enroll-input" type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required={!user} />
                </div>
                
                <div className="enroll-field">
                  <label className="enroll-label">Email Address *</label>
                  <input className="enroll-input" type="email" placeholder="email@address.com" value={email} onChange={e => setEmail(e.target.value)} required={!user} />
                </div>

                <div className="enroll-field">
                  <label className="enroll-label">Phone Number *</label>
                  <input className="enroll-input" type="tel" placeholder="+256 700 123456" value={phone} onChange={e => setPhone(e.target.value)} required={!user} />
                </div>

                <div className="enroll-field" style={{ marginBottom: 0 }}>
                  <label className="enroll-label">Password *</label>
                  <input className="enroll-input" type="password" placeholder="Create a password (min. 6 chars)" value={password} onChange={e => setPassword(e.target.value)} required={!user} minLength={6} />
                </div>
              </div>
            )}

            {/* Course badge */}
            <div className="enroll-course-badge">
              <div className="enroll-course-icon">{course.icon || '📚'}</div>
              <div>
                <div className="enroll-course-name">{course.title}</div>
                <div className="enroll-course-meta">{course.duration} · {course.price}</div>
              </div>
            </div>

            {/* Mode of Study */}
            <div className="enroll-field">
              <label className="enroll-label">Mode of Study *</label>
              <div className="mode-grid">
                <div className={`mode-card ${studyMode === 'Physical' ? 'selected' : ''}`} onClick={() => setStudyMode('Physical')}>
                  <div className="mode-icon">🏫</div>
                  <div className="mode-title">Physical</div>
                  <div className="mode-sub">Makerere, Sr. Apollo Kagwa Rd</div>
                </div>
                <div className={`mode-card ${studyMode === 'Online (Self-Paced)' ? 'selected' : ''}`} onClick={() => setStudyMode('Online (Self-Paced)')}>
                  <div className="mode-icon">💻</div>
                  <div className="mode-title">Online</div>
                  <div className="mode-sub">Self-Paced, Anywhere</div>
                </div>
              </div>
            </div>

            {/* PC Recommendation */}
            {recPC && (
              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0, 200, 120, 0.05)', border: '1px solid rgba(0, 200, 120, 0.2)', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{recPC.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Recommended Gear</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>{recPC.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '2px' }}>{recPC.desc}</div>
                  <a href="/#/shop" onClick={onClose} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-orange)', textDecoration: 'none' }}>🛍️ View in Shop →</a>
                </div>
              </div>
            )}

            <button className="enroll-submit" type="submit" disabled={submitting} style={{ marginTop: '20px' }}>
              {submitting ? 'Submitting...' : 'Submit Enrollment →'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

// ─────────────── INTAKE (GENERAL) REGISTRATION FORM ───────────────
function IntakeModal({ defaultMode, onClose }) {
  const { user, signup } = useAuth();
  const [courses, setCourses] = useState([]);

  const getRecommendedPC = (courseTitle) => {
    if (!courseTitle) return null;
    const title = courseTitle.toLowerCase();
    if (title.includes('design') || title.includes('graphics') || title.includes('video')) {
      return { name: 'MacBook Pro 14" M3', icon: '🍎', desc: 'Recommended for heavy graphics & design software' };
    }
    if (title.includes('programming') || title.includes('coding') || title.includes('development') || title.includes('website')) {
      return { name: 'ThinkPad X1 Carbon', icon: '💻', desc: 'Ideal local processing power for coding & dev environments' };
    }
    return { name: 'Dell Ultra or ThinkPad', icon: '💻', desc: 'Perfect for general computing, office suites & productivity' };
  };
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', course_title: '', start_date: '', message: '', password: ''
  });
  const [studyMode, setStudyMode] = useState(defaultMode === 'physical' ? 'Physical' : 'Online (Self-Paced)');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    supabase.from('courses').select('*').then(({ data }) => {
      // Merge with hardcoded ones as fallback
      const dbCourses = data || [];
      const merged = dbCourses.length ? dbCourses : physicalCourses;
      setCourses(merged);
    });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const selectedCourse = courses.find(c => c.title === form.course_title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    let currentUserId = user?.id;

    if (!user) {
      if (!form.full_name || !form.email || !form.password || !form.phone) {
         setSubmitError("Please fill in all registration fields.");
         setSubmitting(false);
         return;
      }
      
      const res = await signup({ fullName: form.full_name, email: form.email, phone: form.phone, password: form.password });
      if (!res.success) {
         setSubmitError("Registration failed: " + res.error);
         setSubmitting(false);
         return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
         setSubmitError("Registration succeeded but couldn't verify session. Please try clicking submit again.");
         setSubmitting(false);
         return;
      }
      currentUserId = session.user.id;
    }

    const enrollmentData = {
      user_id: currentUserId,
      program_name: `${form.course_title} (${studyMode})`,
      full_name: user?.profile?.full_name || form.full_name,
      email: user?.email || form.email,
      phone: user?.profile?.phone || form.phone,
      status: 'Pending'
    };

    let { error } = await supabase.from('academy_enrollments').insert([enrollmentData]);

    // Fallback
    if (error && (error.code === '42703' || error.message?.toLowerCase().includes('column') || error.code === 'PGRST204')) {
        const { error: fallbackErr } = await supabase.from('academy_enrollments').insert([{
            user_id: currentUserId,
            program_name: `${form.course_title} (${studyMode})`,
            status: 'Pending'
        }]);
        error = fallbackErr;
    }
    
    setSubmitting(false);
    if (error) { 
        console.error("IntakeError:", error); 
        setSubmitError("Database Error: " + error.message); 
        return; 
    }
    setDone(true);

    // Notify Admin via Email
    import('../utils/sendEmail').then(m => {
      m.sendAdminEnrollmentNotification({
        name: user?.profile?.full_name || form.full_name,
        email: user?.email || form.email,
        phone: user?.profile?.phone || form.phone,
        course: form.course_title,
        mode: studyMode
      });
    }).catch(e => console.error("Email notification failed:", e));
  };

  // Lock body scroll when modal is open so the form always appears centered
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <div className="enroll-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="enroll-modal">
        <button className="enroll-close" onClick={onClose}>✕</button>

        {done ? (
          <div className="enroll-success">
            <div className="enroll-success-icon">🎉</div>
            <div className="enroll-success-title">Registration Received!</div>
            <div className="enroll-success-sub">
              Thank you, <strong style={{ color: '#ffa500' }}>{form.full_name}</strong>!<br />
              We've received your registration for <strong style={{ color: '#ffa500' }}>{form.course_title}</strong>.<br />
              Our team will contact you within 24 hours to confirm your spot.
            </div>
            <button className="enroll-submit" style={{ marginTop: 24 }} onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="enroll-form-title">Register for a Course</div>
            <div className="enroll-form-sub">We'll confirm your place within 24 hours.</div>
            {submitError && <div style={{ color: '#ff5050', fontSize: 13, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', padding: '10px', borderRadius: 6, marginBottom: 16 }}>{submitError}</div>}
            
            {!user && (
              <div style={{ padding: '20px', background: 'var(--bg-level2)', border: '1px solid var(--border-medium)', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>👋</span> Create an account to register
                </div>
                
                <div className="enroll-field">
                  <label className="enroll-label">Full Name *</label>
                  <input className="enroll-input" name="full_name" type="text" placeholder="Full Name" value={form.full_name} onChange={handleChange} required={!user} />
                </div>
                
                <div className="enroll-field">
                  <label className="enroll-label">Email Address *</label>
                  <input className="enroll-input" name="email" type="email" placeholder="email@address.com" value={form.email} onChange={handleChange} required={!user} />
                </div>

                <div className="enroll-field">
                  <label className="enroll-label">Phone Number *</label>
                  <input className="enroll-input" name="phone" type="tel" placeholder="+256 700 123456" value={form.phone} onChange={handleChange} required={!user} />
                </div>

                <div className="enroll-field" style={{ marginBottom: 0 }}>
                  <label className="enroll-label">Password *</label>
                  <input className="enroll-input" name="password" type="password" placeholder="Create a password (min. 6 chars)" value={form.password} onChange={handleChange} required={!user} minLength={6} />
                </div>
              </div>
            )}

            {/* Mode of Study */}
            <div className="enroll-field">
              <label className="enroll-label">Mode of Study *</label>
              <div className="mode-grid">
                <div className={`mode-card ${studyMode === 'Physical' ? 'selected' : ''}`} onClick={() => setStudyMode('Physical')}>
                  <div className="mode-icon">🏫</div>
                  <div className="mode-title">Physical</div>
                  <div className="mode-sub">Makerere, Sr. Apollo Kagwa Rd</div>
                </div>
                <div className={`mode-card ${studyMode === 'Online (Self-Paced)' ? 'selected' : ''}`} onClick={() => setStudyMode('Online (Self-Paced)')}>
                  <div className="mode-icon">💻</div>
                  <div className="mode-title">Online</div>
                  <div className="mode-sub">Self-Paced, Anywhere</div>
                </div>
              </div>
            </div>

            {/* Course selection */}
            <div className="enroll-field">
              <label className="enroll-label">Course of Interest *</label>
              <select
                className="enroll-select"
                name="course_title"
                value={form.course_title}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a course --</option>
                {courses.map(c => (
                  <option key={c.id} value={c.title}>
                    {c.title} ({c.duration} · {c.price})
                  </option>
                ))}
              </select>
              {selectedCourse && (
                <div style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(255,165,0,0.06)', borderRadius: 6, border: '1px solid rgba(255,165,0,0.15)' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#ffa500' }}>
                    {selectedCourse.duration} · {selectedCourse.price}
                  </span>
                </div>
              )}
            </div>

            {/* PC Recommendation */}
            {form.course_title && getRecommendedPC(form.course_title) && (
              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0, 200, 120, 0.05)', border: '1px solid rgba(0, 200, 120, 0.2)', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '32px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>{getRecommendedPC(form.course_title).icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Recommended Gear</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>{getRecommendedPC(form.course_title).name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '2px' }}>{getRecommendedPC(form.course_title).desc}</div>
                  <a href="/#/shop" onClick={onClose} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-orange)', textDecoration: 'none' }}>🛍️ View in Shop →</a>
                </div>
              </div>
            )}

            <button className="enroll-submit" type="submit" disabled={submitting} style={{ marginTop: '20px' }}>
              {submitting ? 'Submitting...' : 'Submit Registration →'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

// ─────────────── WATCH MODAL ───────────────
function WatchModal({ course, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Format youtube URLs correctly
  let embedUrl = course.video_url || "";
  if (embedUrl.includes("youtube.com/watch?v=")) {
    embedUrl = embedUrl.replace("watch?v=", "embed/");
    // Remove extra query params that might break embed
    embedUrl = embedUrl.split("&")[0];
  } else if (embedUrl.includes("youtu.be/")) {
    embedUrl = embedUrl.replace("youtu.be/", "youtube.com/embed/");
    embedUrl = embedUrl.split("?")[0];
  }

  return createPortal(
    <div className="enroll-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="enroll-modal" style={{ maxWidth: '800px', width: '90%', padding: '24px' }}>
        <button className="enroll-close" onClick={onClose} style={{ top: '16px', right: '16px' }}>✕</button>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '24px', color: 'var(--text-primary)' }}>{course.title}</h2>
        </div>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
          {embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com') ? (
            <iframe 
               src={embedUrl} 
               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
            />
          ) : (
            <video 
               src={embedUrl} 
               controls 
               controlsList="nodownload"
               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
            />
          )}
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

  const fetchCourses = React.useCallback(async () => {
    try {
      const { data } = await supabase.from('academy_videos').select('*').order('created_at', { ascending: false });
      if (data) setDbSelfPacedCourses(data);
    } catch (err) {
      console.error("Error fetching online courses:", err);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchCourses(), 0);
    return () => clearTimeout(t);
  }, [fetchCourses]);

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
    } else if (approvedCourses.length > 0) {
      const t = setTimeout(() => setApprovedCourses([]), 0);
      return () => clearTimeout(t);
    }
  }, [user, approvedCourses.length]);

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
              <h1 className="ac-hero-title">Learn. <span className="hl">Think.</span> <span className="hl-alt">Innovate.</span></h1>
              <script dangerouslySetInnerHTML={{ __html: `console.log("🚀 AFRIQ_UPDATE_SUCCESS_V4");` }} />
              <p className="ac-hero-desc">
                Professional IT training for AFRIQ's digital workforce. 
                Choose between instructor-led physical classes in Kampala or flexible self-paced online courses.
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