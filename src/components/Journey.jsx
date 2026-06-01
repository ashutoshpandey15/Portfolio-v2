import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { timeline } from "../data/timeline.js";
import { fadeUp, inViewProps } from "../motion.js";

// Build the page list: cover, one page per experience, then a back page.
const pages = [
  { type: "cover" },
  ...timeline.map((entry, i) => ({ type: "entry", entry, num: i + 1 })),
  { type: "back" },
];

// Group pages into leaves (front/back). leaf0 is the inside front cover so the
// first spread reads [Cover | Experience 1] and the book stays centered.
const leaves = [{ front: null, back: pages[0] }];
for (let k = 1; 2 * k - 1 < pages.length; k++) {
  leaves.push({ front: pages[2 * k - 1] ?? null, back: pages[2 * k] ?? null });
}
const MAX_TURNED = leaves.length - 1; // number of spreads

function PageFace({ page, total }) {
  if (!page) return <div className="page page-blank" />;

  if (page.type === "cover") {
    return (
      <div className="page page-cover">
        <span className="journal-type">Journal</span>
        <h3 className="page-cover-title">My Journey</h3>
        <p className="page-cover-sub">
          A walk through my experience and education — one page at a time.
        </p>
        <span className="page-hint">turn the page →</span>
      </div>
    );
  }

  if (page.type === "back") {
    return (
      <div className="page page-back">
        <h3 className="page-cover-title">Thanks for reading</h3>
        <p className="page-back-sub">
          That’s my journey so far — and the next chapter could be with you.
        </p>
        <a href="#contact" className="page-back-link link">
          Let’s connect →
        </a>
      </div>
    );
  }

  const { entry, num } = page;
  return (
    <div className="page page-entry">
      <div className="journal-meta">
        <span className="journal-type">{entry.label}</span>
        <span className="journal-period">{entry.period}</span>
      </div>
      <h3 className="h4 journal-title">{entry.title}</h3>
      <p className="journal-company">{entry.company}</p>
      {entry.points.length > 0 && (
        <ul className="journal-points">
          {entry.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      )}
      <span className="journal-pageno">
        {String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function Journey() {
  const [turned, setTurned] = useState(1); // start opened to the first spread
  const [ready, setReady] = useState(false);
  const total = timeline.length;

  // Enable transitions only after first paint so the book doesn't fold on load.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const next = () => setTurned((t) => Math.min(t + 1, MAX_TURNED));
  const prev = () => setTurned((t) => Math.max(t - 1, 1));

  return (
    <section className="timeline" id="experience">
      <div className="container">
        <motion.div className="journal" variants={fadeUp} {...inViewProps}>
          <div className={`book ${ready ? "ready" : ""}`}>
            <span className="book-spine" aria-hidden="true" />
            {leaves.map((leaf, i) => {
              const isTurned = i < turned;
              return (
                <div
                  key={i}
                  className={`leaf ${isTurned ? "turned" : ""}`}
                  style={{
                    zIndex: isTurned ? leaves.length + i : leaves.length - i,
                  }}
                >
                  <div className="leaf-face leaf-front">
                    <PageFace page={leaf.front} total={total} />
                  </div>
                  <div className="leaf-face leaf-back">
                    <PageFace page={leaf.back} total={total} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="journal-controls">
            <button
              type="button"
              className="journal-nav"
              onClick={prev}
              disabled={turned <= 1}
              aria-label="Previous pages"
            >
              ‹ Prev
            </button>

            <div className="journal-dots" role="tablist" aria-label="Journey spreads">
              {Array.from({ length: MAX_TURNED }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`journal-dot ${i === turned - 1 ? "active" : ""}`}
                  onClick={() => setTurned(i + 1)}
                  aria-label={`Go to spread ${i + 1}`}
                  aria-selected={i === turned - 1}
                  role="tab"
                />
              ))}
            </div>

            <button
              type="button"
              className="journal-nav"
              onClick={next}
              disabled={turned >= MAX_TURNED}
              aria-label="Next pages"
            >
              Next ›
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
