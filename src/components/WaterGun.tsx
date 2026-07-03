interface WaterGunProps {
  x: string;
  y: string;
  scale?: number;
  flip?: boolean;
  rotate?: number;
  animClass?: string;
  color?: string;
  accentColor?: string;
  opacity?: number;
}

export default function WaterGun({
  x,
  y,
  scale = 1,
  flip = false,
  rotate = 0,
  animClass = "",
  color = "#0ea5e9",
  accentColor = "#38bdf8",
  opacity = 0.9,
}: WaterGunProps) {
  return (
    <div
      className={`water-gun-wrap ${animClass}`}
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: `scale(${scale}) ${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`,
        transformOrigin: "center",
        zIndex: 2,
        pointerEvents: "none",
        opacity,
      }}
    >
      <svg
        width="160"
        height="100"
        viewBox="0 0 160 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(0 0 18px ${color}88) drop-shadow(0 0 6px ${accentColor}66)` }}
      >
        {/* Main body */}
        <rect x="30" y="38" width="80" height="26" rx="7" fill={color} />

        {/* Barrel */}
        <rect x="110" y="44" width="44" height="14" rx="5" fill={accentColor} />

        {/* Nozzle tip */}
        <rect x="150" y="46" width="8" height="10" rx="3" fill="#e0f2fe" />

        {/* Top detail / scope */}
        <rect x="55" y="30" width="36" height="10" rx="4" fill={accentColor} />
        <rect x="68" y="25" width="12" height="8" rx="3" fill={color} />
        <circle cx="74" cy="25" r="3" fill="#e0f2fe" opacity="0.8" />

        {/* Trigger guard */}
        <path
          d={`M 65 64 Q 72 80 80 64`}
          stroke={accentColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Trigger */}
        <rect x="70" y="59" width="5" height="14" rx="2" fill="#e0f2fe" opacity="0.9" />

        {/* Handle */}
        <rect x="50" y="62" width="22" height="30" rx="8" fill={color} />
        <rect x="55" y="68" width="12" height="5" rx="2" fill={accentColor} opacity="0.6" />
        <rect x="55" y="76" width="12" height="5" rx="2" fill={accentColor} opacity="0.4" />

        {/* Tank / water reservoir */}
        <ellipse cx="45" cy="51" rx="14" ry="11" fill={accentColor} opacity="0.7" />
        <ellipse cx="45" cy="48" rx="8" ry="4" fill="#e0f2fe" opacity="0.25" />

        {/* Grip texture lines */}
        <line x1="57" y1="40" x2="57" y2="62" stroke={accentColor} strokeWidth="1.5" opacity="0.4" strokeDasharray="2 3" />
        <line x1="63" y1="40" x2="63" y2="62" stroke={accentColor} strokeWidth="1.5" opacity="0.4" strokeDasharray="2 3" />
        <line x1="69" y1="40" x2="69" y2="62" stroke={accentColor} strokeWidth="1.5" opacity="0.4" strokeDasharray="2 3" />

        {/* Shine on barrel */}
        <rect x="115" y="46" width="28" height="3" rx="1.5" fill="white" opacity="0.18" />

        {/* Water stream */}
        <path
          d="M 158 51 Q 175 45 190 52 Q 205 59 220 48"
          stroke="#7dd3fc"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
          className="water-stream"
        />
        <path
          d="M 158 53 Q 178 60 195 55 Q 210 50 225 58"
          stroke="#bae6fd"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
          className="water-stream-2"
        />

        {/* Drops from stream */}
        <circle cx="200" cy="45" r="2.5" fill="#7dd3fc" opacity="0.6" className="stream-drop-1" />
        <circle cx="215" cy="58" r="1.8" fill="#38bdf8" opacity="0.5" className="stream-drop-2" />
      </svg>
    </div>
  );
}
