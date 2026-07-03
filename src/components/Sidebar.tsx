type Page = "home" | "photos" | "videos" | "leaderboard";

interface SidebarProps {
  isOpen: boolean;
  activePage: Page;
  onNavigate: (page: Page) => void;
  onClose: () => void;
}

const NAV_ITEMS: { page: Page; label: string; icon: string; desc: string }[] = [
  { page: "home", label: "Home", icon: "🏠", desc: "Game info & rules" },
  { page: "leaderboard", label: "Leaderboard", icon: "🏆", desc: "Top eliminators" },
  { page: "photos", label: "Photos", icon: "📸", desc: "Gallery" },
  { page: "videos", label: "Videos", icon: "🎥", desc: "Highlights" },
];

export default function Sidebar({ isOpen, activePage, onNavigate, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div className={`sidebar-overlay${isOpen ? " visible" : ""}`} onClick={onClose} />

      <aside className={`sidebar${isOpen ? " open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-logo">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />
              <text x="18" y="24" textAnchor="middle" fontSize="18">💦</text>
            </svg>
          </div>
          <div>
            <div className="brand-name">
              <span className="brand-splash">Splash</span>
              <span className="brand-royale"> Royale</span>
            </div>
            <div className="brand-sub">LA Water Wars</div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="sidebar-live">
          <span className="live-dot" />
          <span>Game Active</span>
          <span className="live-count">148 players</span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ page, label, icon, desc }) => (
            <a
              key={page}
              href="#"
              className={`nav-item${activePage === page ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(page);
              }}
            >
              <div className="nav-item-icon">{icon}</div>
              <div className="nav-item-text">
                <span className="nav-item-label">{label}</span>
                <span className="nav-item-desc">{desc}</span>
              </div>
              {activePage === page && <div className="nav-active-bar" />}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer-area">
          <div className="sidebar-footer-card">
            <div className="footer-card-icon">⚡</div>
            <div>
              <div className="footer-card-title">You're a target</div>
              <div className="footer-card-sub">Stay aware out there</div>
            </div>
          </div>
          <div className="sidebar-copyright">© 2026 Splash Royale</div>
        </div>
      </aside>
    </>
  );
}
