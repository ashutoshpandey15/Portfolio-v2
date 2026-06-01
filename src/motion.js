// Shared Framer Motion variants for scroll-reveal across sections.
export const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// Reuse a single config for whileInView reveals.
export const inViewProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
};
