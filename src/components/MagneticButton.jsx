import { useRef } from "react";
import { REDUCED_FX } from "../fx.js";

// Anchor that gently pulls toward the cursor while hovered.
export default function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (REDUCED_FX) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      className={`magnetic ${className || ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </a>
  );
}
