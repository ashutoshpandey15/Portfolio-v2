import { motion } from "framer-motion";
import { skills } from "../data/skills.js";
import { fadeUp, stagger, inViewProps } from "../motion.js";

export default function Skills() {
  return (
    <section className="skills">
      <div className="container">
        <motion.h2 className="h2" id="skills" variants={fadeUp} {...inViewProps}>
          My Toolkit
        </motion.h2>

        <motion.div className="skills-imgs" variants={stagger} {...inViewProps}>
          {skills.map((skill) => (
            <motion.img
              key={skill.name}
              src={skill.icon}
              alt={skill.name}
              title={skill.name}
              className="skills-img"
              loading="lazy"
              variants={fadeUp}
              whileHover={{ scale: 1.12, y: -6 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
