import { CONFIG } from "../data/config";
import { useState } from "react";

export default function PhotosPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="photos-page">
      <div className="page-hero">
        <div className="page-hero-tag">GALLERY</div>
        <h1>Photo Highlights</h1>
        <p>Captured chaos from the field</p>
      </div>

      <div className="gallery-grid">
        {CONFIG.galleryImages.map((src, i) => (
          <div
            key={src}
            className="gallery-item"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => setLightbox(src)}
          >
            <img src={src} alt={`Water wars shot ${i + 1}`} loading="lazy" />
            <div className="gallery-overlay">
              <div className="gallery-overlay-icon">🔍</div>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-close">✕</div>
          <img src={lightbox} alt="Full size" />
        </div>
      )}
    </div>
  );
}
