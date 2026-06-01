import { useEffect, useRef } from "react";

// Neon trail fades from pink (newest) to teal (oldest), matching the brand.
const PINK = [255, 94, 153];
const TEAL = [115, 255, 225];
const mix = (a, b, t) => Math.round(a + (b - a) * t);

export default function ParticleCursor() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only skip on touch / coarse-pointer devices — there is no cursor there.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ctx = canvas.getContext("2d");

    // Hide the native cursor and show our custom one.
    document.documentElement.classList.add("cursor-none");

    let points = [];
    let raf;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Target = real cursor position; ring eases toward it for a trailing feel.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    let ringScale = 1;
    let ringScaleTarget = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // Dot tracks the cursor exactly.
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      points.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (points.length > 40) points.shift();
    };

    // Grow the ring over interactive elements.
    const interactiveSel = "a, button, input, textarea, label, .work-box, .skills-img";
    const onOver = (e) => {
      ringScaleTarget = e.target.closest(interactiveSel) ? 1.8 : 1;
    };

    const onDown = () => (ringScaleTarget *= 0.6);
    const onUp = () => (ringScaleTarget = ringScaleTarget < 1.2 ? 1 : 1.8);

    const lerp = (a, b, n) => a + (b - a) * n;

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Fade and prune the trail.
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].life -= 0.04;
        if (points[i].life <= 0) points.splice(i, 1);
      }

      // Neon line: round joins + glow, color/width tapering along the trail.
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const t = i / points.length; // 0 = oldest, 1 = newest
        const life = p1.life;
        const r = mix(TEAL[0], PINK[0], t);
        const g = mix(TEAL[1], PINK[1], t);
        const b = mix(TEAL[2], PINK[2], t);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${life})`;
        ctx.lineWidth = 1 + t * 4;
        ctx.shadowBlur = 14;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${life})`;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // Trailing ring.
      ringPos.x = lerp(ringPos.x, target.x, 0.18);
      ringPos.y = lerp(ringPos.y, target.y, 0.18);
      ringScale = lerp(ringScale, ringScaleTarget, 0.15);
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${ringScale})`;

      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="particle-cursor" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
