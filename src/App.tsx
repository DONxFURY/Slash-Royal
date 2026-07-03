import { useState, useEffect, useRef } from "react";
import WaterCanvas from "./components/WaterCanvas";
import WaterGun from "./components/WaterGun";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import PhotosPage from "./components/PhotosPage";
import VideosPage from "./components/VideosPage";
import LeaderboardPage from "./components/LeaderboardPage";

type Page = "home" | "photos" | "videos" | "leaderboard";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>("home");
  const [prevPage, setPrevPage] = useState<Page>("home");
  const [transitioning, setTransitioning] = useState(false);

  function handleNavigate(page: Page) {
    if (page === activePage) return;
    setTransitioning(true);
    setTimeout(() => {
      setPrevPage(activePage);
      setActivePage(page);
      setTransitioning(false);
    }, 250);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  }

  return (
    <>
      <WaterCanvas />

      {/* Decorative water guns */}
      <WaterGun
        x="-30px" y="12%"
        scale={1.1}
        rotate={-15}
        animClass="gun-float-1"
        color="#0369a1"
        accentColor="#38bdf8"
        opacity={0.55}
      />
      <WaterGun
        x="calc(100vw - 240px)" y="60%"
        scale={0.9}
        flip
        rotate={10}
        animClass="gun-float-2"
        color="#0e7490"
        accentColor="#67e8f9"
        opacity={0.45}
      />
      <WaterGun
        x="calc(100vw - 180px)" y="8%"
        scale={0.7}
        rotate={-30}
        animClass="gun-float-3"
        color="#1d4ed8"
        accentColor="#60a5fa"
        opacity={0.3}
      />
      <WaterGun
        x="-20px" y="72%"
        scale={0.65}
        flip
        rotate={20}
        animClass="gun-float-1"
        color="#0c4a6e"
        accentColor="#38bdf8"
        opacity={0.25}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        activePage={activePage}
        onNavigate={handleNavigate}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Toggle button */}
      <button
        className={`menu-btn${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className="menu-btn-line" />
        <span className="menu-btn-line" />
        <span className="menu-btn-line" />
      </button>

      {/* Main */}
      <main className={`main-content${sidebarOpen ? " shifted" : ""}`}>
        <div className={`page-container${transitioning ? " fade-out" : " fade-in"}`}>
          {activePage === "home" && <HomePage onNavigate={handleNavigate} />}
          {activePage === "photos" && <PhotosPage />}
          {activePage === "videos" && <VideosPage />}
          {activePage === "leaderboard" && <LeaderboardPage />}
        </div>
      </main>
    </>
  );
}
