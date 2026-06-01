// Disable pointer-driven effects on touch devices and when the user prefers
// reduced motion. Evaluated once at module load.
export const REDUCED_FX =
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches);
