import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton.jsx";

const ROLES = [
  "Software Developer",
  "DevOps Engineer",
  "GenAI Developer",
  "AI/ML Enthusiast",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="header" id="home">
      <div className="container">
        <motion.div
          className="header-textbox"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="h1">
            <span>Hi, I'm Ashutosh Pandey</span>
            <span style={{ minHeight: "1.2em", display: "block" }}>
              <motion.span
                key={index}
                className="hero-gradient-text"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: "inline-block" }}
              >
                {ROLES[index]}
              </motion.span>
            </span>
          </h1>

          <p className="header-text">
            Creating smart AI-driven systems through solid development skills and
            streamlined DevOps workflows.
          </p>

          <div className="header-btns">
            <MagneticButton href="#contact" className="btn btn-cta">
              Hire me
            </MagneticButton>
            <MagneticButton
              href="assets/Ashutosh_Pandey_resume.pdf"
              className="btn btn-secondary"
              download="Ashutosh_Pandey_Resume.pdf"
            >
              Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
