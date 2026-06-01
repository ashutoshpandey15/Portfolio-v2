import { motion } from "framer-motion";
import { fadeUp, stagger, inViewProps } from "../motion.js";

const focusAreas = [
  {
    title: "AI & Machine Learning",
    text: "Designing and training models — from CNNs for vision to prompt-engineered LLM systems — and shipping them as real, usable products.",
  },
  {
    title: "GenAI & AI Agents",
    text: "Building generative AI applications and autonomous AI agents that automate workflows and handle complex, multi-step tasks end to end.",
  },
  {
    title: "DevOps & Cloud",
    text: "Automating build, deploy, and scaling workflows with Docker, CI/CD, and cloud-native infrastructure for reliable releases.",
  },
  {
    title: "Software Engineering",
    text: "Building scalable, end-to-end applications with clean APIs and responsive frontends that hold up in production.",
  },
];

export default function About() {
  return (
    <section className="about-me">
      <div className="container">
        <motion.h2 className="h2" variants={fadeUp} {...inViewProps}>
          About Me
        </motion.h2>

        <div className="about-grid">
          <motion.div className="about-intro" variants={fadeUp} {...inViewProps}>
            <p>
              I’m a hands-on software engineer who loves turning ideas into
              practical, high-performing solutions. I build scalable applications
              and strong machine learning models while making sure everything
              runs smoothly through automated cloud deployment. With solid
              experience in AI, machine learning, and DevOps, I focus on creating
              smart systems that make a real difference. From writing code from
              scratch to managing cloud infrastructure, I approach every project
              with curiosity and care to push technology forward.
            </p>
          </motion.div>

          <motion.ul className="about-highlights" variants={stagger} {...inViewProps}>
            {focusAreas.map((area) => (
              <motion.li
                className="about-card"
                key={area.title}
                variants={fadeUp}
              >
                <h3 className="h4">{area.title}</h3>
                <p>{area.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
