import { useRef } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects.js";
import { fadeUp, stagger, inViewProps } from "../motion.js";
import { REDUCED_FX } from "../fx.js";

function WorkCard({ project }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (REDUCED_FX) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--rx", `${(py - 0.5) * -6}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      className="work-box"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="work-spotlight" aria-hidden="true" />

      <motion.div className="work-textbox" variants={stagger} {...inViewProps}>
        <motion.h3 className="h3" variants={fadeUp}>
          {project.title}
        </motion.h3>
        <motion.p className="work-text" variants={fadeUp}>
          {project.description}
        </motion.p>
        <motion.ol className="work-technologies" variants={fadeUp}>
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </motion.ol>
        <motion.div className="work-links" variants={fadeUp}>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="link"
            >
              {link.label}
            </a>
          ))}
          <a
            href={project.source}
            target="_blank"
            rel="noopener"
            title="Source code"
          >
            <img
              src="assets/images/social-links/github.svg"
              alt="GitHub"
              loading="lazy"
            />
          </a>
        </motion.div>
      </motion.div>

      <motion.picture
        className="work-img"
        variants={fadeUp}
        {...inViewProps}
      >
        <img loading="lazy" src={project.image} alt={project.imageAlt} />
      </motion.picture>
    </div>
  );
}

export default function Work() {
  return (
    <section className="work">
      <div className="container">
        <motion.h2 className="h2" id="work" variants={fadeUp} {...inViewProps}>
          Selected Work
        </motion.h2>

        <div className="work-boxes">
          {projects.map((project) => (
            <WorkCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
