import { useState, useEffect } from "react";
import { RULES } from "../data/config";

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function RuleItem({ icon, title, desc, index }: { icon: string; title: string; desc: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rule-item${open ? " active" : ""}`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => setOpen(!open)}
    >
      <div className="rule-title">
        <div className="rule-icon-wrap">
          <span>{icon}</span>
        </div>
        <span className="rule-title-text">{title}</span>
        <div className={`rule-chevron${open ? " open" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 5.5L7 8.5L10 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className={`rule-desc${open ? " open" : ""}`}>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate }: { onNavigate: (page: "home" | "photos" | "videos" | "leaderboard") => void }) {
  const [visible, setVisible] = useState(false);
  const [splashText, setSplashText] = useState(0);
  const texts = ["GET READY TO BE SLAPPED", "STAY ALERT", "NO ONE IS SAFE", "SPLASH OR BE SPLASHED"];

  useEffect(() => {
    setVisible(true);
    const t = setInterval(() => setSplashText((n) => (n + 1) % texts.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`home-page${visible ? " visible" : ""}`}>
      {/* HERO */}
      <div className="hero-section">
        <div className="hero-badge">
          <span className="badge-dot" />
          LIVE · LOS ANGELES
        </div>
        <h1 className="hero-title">
          <span className="hero-title-line1">SPLASH</span>
          <span className="hero-title-line2">ROYALE</span>
        </h1>
        <div className="hero-rotating-text">
          <span key={splashText} className="rotating-word">
            {texts[splashText]}
          </span>
        </div>
        <p className="hero-subtitle">
          City-wide water war · 10+ miles · You're always a target
        </p>
        <div className="hero-stats">
          <StatCard value="10+" label="Miles" icon="📍" />
          <StatCard value="∞" label="Players" icon="👥" />
          <StatCard value="24/7" label="Active" icon="⚡" />
          <StatCard value="1" label="Winner" icon="🏆" />
        </div>
        <div className="hero-cta-row">
          <button className="btn-primary">
            <span>💦</span> Join the War
          </button>
          <button className="btn-secondary" onClick={() => onNavigate("leaderboard")}>
            View Leaderboard
          </button>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="section-divider">
        <span>THE GAME</span>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-card-glow" />
          <div className="about-number">01</div>
          <h3>Get Assigned</h3>
          <p>Everyone receives a secret target. You're also someone else's target — you just don't know who.</p>
        </div>
        <div className="about-card">
          <div className="about-card-glow pink" />
          <div className="about-number">02</div>
          <h3>Hunt Them Down</h3>
          <p>Track your target across 10+ miles of LA. Hit them with water to eliminate them and inherit their target.</p>
        </div>
        <div className="about-card">
          <div className="about-card-glow gold" />
          <div className="about-number">03</div>
          <h3>Last One Dry Wins</h3>
          <p>The city is your arena. Everyone outside is suspect. Stay alert or get eliminated.</p>
        </div>
      </div>

      {/* ALERT BANNER */}
      <div className="alert-banner">
        <div className="alert-banner-inner">
          <div className="alert-icon">💦</div>
          <div>
            <strong>Stay Ready 24/7</strong>
            <p>If you're outside and not in a safe zone, you could be someone's next target right now.</p>
          </div>
          <div className="alert-pulse">
            <div className="pulse-ring" />
            <div className="pulse-core" />
          </div>
        </div>
      </div>

      {/* RULES SECTION */}
      <div className="section-divider">
        <span>RULES OF ENGAGEMENT</span>
      </div>

      <div className="rules-container">
        <div className="rules-header">
          <h2>Play by the Code</h2>
          <p>Violate these and you're out.</p>
        </div>
        <div className="rule-grid">
          {RULES.map((rule, i) => (
            <RuleItem key={rule.title} {...rule} index={i} />
          ))}
        </div>
      </div>

      {/* CLOSING */}
      <div className="closing-section">
        <div className="closing-text">💦 STAY READY... OR GET SLAPPED 👋💦</div>
        <div className="footer-note">© 2026 Splash Royale · Los Angeles · v2.0</div>
      </div>
    </div>
  );
}
