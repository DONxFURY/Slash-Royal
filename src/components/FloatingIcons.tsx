import { useEffect, useRef } from "react";

const ICONS = ["🔫", "💧", "💦", "🫧", "🔫", "💧", "💦", "🫧"];
const COUNT = 25;

export default function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("span");
      el.className = "float-icon";
      el.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = 1.4 + Math.random() * 2.4 + "rem";
      el.style.animationDuration = 12 + Math.random() * 20 + "s";
      el.style.animationDelay = Math.random() * 20 + "s";
      el.style.opacity = String(0.08 + Math.random() * 0.1);
      container.appendChild(el);
    }
  }, []);

  return <div ref={containerRef} className="floating-icons" />;
}
