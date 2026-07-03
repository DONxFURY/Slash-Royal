import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface Drop {
  x: number;
  y: number;
  vy: number;
  length: number;
  alpha: number;
  width: number;
}

export default function WaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let animId: number;
    let width = 0;
    let height = 0;

    const particles: Particle[] = [];
    const ripples: Ripple[] = [];
    const drops: Drop[] = [];

    const COLORS = ["#38bdf8", "#0ea5e9", "#7dd3fc", "#e879f9", "#bae6fd", "#0369a1"];

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function spawnParticle() {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const maxLife = 120 + Math.random() * 180;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.3 - Math.random() * 0.6,
        radius: 1.5 + Math.random() * 4,
        alpha: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife,
      });
    }

    function spawnRipple() {
      ripples.push({
        x: Math.random() * width,
        y: height * 0.5 + Math.random() * height * 0.5,
        radius: 0,
        maxRadius: 60 + Math.random() * 120,
        alpha: 0.25,
        speed: 0.8 + Math.random() * 1.2,
      });
    }

    function spawnDrop() {
      drops.push({
        x: Math.random() * width,
        y: -20,
        vy: 4 + Math.random() * 6,
        length: 12 + Math.random() * 24,
        alpha: 0.08 + Math.random() * 0.12,
        width: 0.5 + Math.random() * 1.2,
      });
    }

    // Pre-populate
    for (let i = 0; i < 60; i++) spawnParticle();
    for (let i = 0; i < 8; i++) spawnRipple();
    for (let i = 0; i < 30; i++) {
      spawnDrop();
      drops[drops.length - 1].y = Math.random() * height;
    }

    let frame = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Deep ocean gradient bg
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#020b18");
      bg.addColorStop(0.4, "#071628");
      bg.addColorStop(1, "#030d1f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Atmospheric glow blobs
      const glowData: [number, number, number, string, string][] = [
        [width * 0.2, height * 0.3, 300, "rgba(56,189,248,0.04)", "transparent"],
        [width * 0.8, height * 0.2, 350, "rgba(232,121,249,0.04)", "transparent"],
        [width * 0.5, height * 0.7, 400, "rgba(14,165,233,0.05)", "transparent"],
      ];
      glowData.forEach(([x, y, r, c1, c2]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      });

      // Rain drops
      ctx.lineCap = "round";
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.vy;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(125,211,252,${d.alpha})`;
        ctx.lineWidth = d.width;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.stroke();
        if (d.y > height + 30) {
          drops.splice(i, 1);
          spawnDrop();
        }
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.985;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56,189,248,${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (r.radius >= r.maxRadius || r.alpha < 0.004) {
          ripples.splice(i, 1);
          spawnRipple();
        }
      }

      // Floating particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02 + i) * 0.3;
        p.y += p.vy;
        const progress = p.life / p.maxLife;
        p.alpha = progress < 0.1 ? progress * 10 * 0.6 : progress > 0.8 ? (1 - progress) * 5 * 0.6 : 0.6;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color.replace(")", `,${p.alpha})`).replace("rgb", "rgba"));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          spawnParticle();
        }
      }

      // Wave lines at bottom
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveY = height * (0.82 + w * 0.06);
        const amp = 6 - w * 1.5;
        const freq = 0.008 + w * 0.002;
        const speed = frame * 0.008 * (1 + w * 0.3);
        ctx.moveTo(0, waveY);
        for (let x = 0; x <= width; x += 4) {
          const y = waveY + Math.sin(x * freq + speed) * amp + Math.cos(x * 0.005 + speed * 0.7) * amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const wg = ctx.createLinearGradient(0, waveY - amp, 0, height);
        wg.addColorStop(0, `rgba(14,165,233,${0.06 - w * 0.015})`);
        wg.addColorStop(1, `rgba(2,11,24,0)`);
        ctx.fillStyle = wg;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, waveY);
        for (let x = 0; x <= width; x += 4) {
          const y = waveY + Math.sin(x * freq + speed) * amp + Math.cos(x * 0.005 + speed * 0.7) * amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(56,189,248,${0.12 - w * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Scanline overlay shimmer
      if (frame % 3 === 0) {
        for (let y = 0; y < height; y += 4) {
          ctx.fillStyle = "rgba(0,0,0,0.015)";
          ctx.fillRect(0, y, width, 1);
        }
      }

      frame++;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
