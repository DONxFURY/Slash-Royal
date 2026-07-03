export default function VideosPage() {
  const videos = [
    {
      src: "https://www.youtube.com/embed/5H-FsNFEHFo",
      title: "Epic Elimination Montage",
      desc: "The best hits of the season",
    },
    {
      src: "https://streamable.com/embed/9j0a1",
      title: "Ambush at Whole Foods",
      desc: "Nobody saw it coming",
    },
  ];

  return (
    <div className="videos-page">
      <div className="page-hero">
        <div className="page-hero-tag">HIGHLIGHTS</div>
        <h1>Video Reel</h1>
        <p>Watch the action unfold across LA</p>
      </div>

      <div className="video-grid">
        {videos.map((v, i) => (
          <div key={i} className="video-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="video-wrapper">
              <iframe src={v.src} title={v.title} allowFullScreen />
            </div>
            <div className="video-meta">
              <div className="video-meta-dot" />
              <div>
                <div className="video-title">{v.title}</div>
                <div className="video-desc">{v.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
