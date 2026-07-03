import { CONFIG } from "../data/config";

export default function LeaderboardPage() {
  const sorted = [...CONFIG.leaderboard].sort((a, b) => b.kills - a.kills);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podiumOrder = [1, 0, 2] as const;
  const podiumHeights = [140, 180, 120];
  const podiumColors = [
    { border: "#94a3b8", glow: "rgba(148,163,184,0.3)", medal: "🥈", label: "2nd" },
    { border: "#facc15", glow: "rgba(250,204,21,0.4)", medal: "🥇", label: "1st" },
    { border: "#d97706", glow: "rgba(217,119,6,0.3)", medal: "🥉", label: "3rd" },
  ];

  return (
    <div className="leaderboard-page">
      <div className="page-hero">
        <div className="page-hero-tag">RANKINGS</div>
        <h1>Leaderboard</h1>
        <p>Top eliminators in the city</p>
      </div>

      {/* Podium */}
      <div className="podium-section">
        <div className="podium-stage">
          {podiumOrder.map((playerIdx, displayIdx) => {
            const player = top3[playerIdx];
            if (!player) return null;
            const style = podiumColors[displayIdx];
            return (
              <div key={player.name} className="podium-column">
                <div className="podium-player-info">
                  <div
                    className="podium-avatar-ring"
                    style={{ borderColor: style.border, boxShadow: `0 0 24px ${style.glow}` }}
                  >
                    <span className="podium-avatar-emoji">{player.avatar}</span>
                  </div>
                  <div className="podium-player-name">{player.name}</div>
                  <div className="podium-player-kills">
                    <span className="kills-num">{player.kills}</span>
                    <span className="kills-lbl">ELIMS</span>
                  </div>
                </div>
                <div
                  className="podium-block"
                  style={{
                    height: podiumHeights[displayIdx],
                    borderColor: style.border,
                    boxShadow: `0 0 30px ${style.glow}, inset 0 1px 0 ${style.border}55`,
                  }}
                >
                  <div className="podium-rank-badge" style={{ color: style.border }}>
                    {style.medal}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="podium-base" />
      </div>

      {/* Table */}
      {rest.length > 0 && (
        <div className="lb-table-container">
          <div className="lb-table-header">
            <span>#</span>
            <span>Player</span>
            <span>Eliminations</span>
            <span>Status</span>
          </div>
          {rest.map((player, idx) => (
            <div
              key={player.name}
              className="lb-table-row"
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              <span className="lb-rank">#{idx + 4}</span>
              <span className="lb-player">
                <span className="lb-player-avatar">{player.avatar}</span>
                <span className="lb-player-name">{player.name}</span>
              </span>
              <span className="lb-kills">
                <span className="kills-bar-wrap">
                  <span
                    className="kills-bar"
                    style={{ width: `${(player.kills / sorted[0].kills) * 100}%` }}
                  />
                </span>
                <span className="kills-count">{player.kills}</span>
              </span>
              <span className="lb-status">
                <span className="status-active">Active</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
