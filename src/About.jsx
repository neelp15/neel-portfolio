import { motion, useReducedMotion } from "framer-motion";
import "./About.css";

const interests = [
  { number: "01", title: "Full Stack Development", description: "Building modern web applications using React, Node.js, Express and MongoDB.", tags: ["React", "Node.js", "MongoDB"], accent: "purple" },
  { number: "02", title: "Data Analytics", description: "Turning raw data into meaningful insights through analysis and interactive dashboards.", tags: ["Python", "SQL", "Power BI"], accent: "cyan" },
  { number: "03", title: "Creative Design", description: "Creating futuristic visual identities and digital experiences through design.", tags: ["Figma", "Canva", "Illustrator"], accent: "pink" },
];

const highlights = [
  { value: "03", label: "Creative Domains" },
  { value: "B.Tech", label: "Computer Science" },
  { value: "∞", label: "Ideas to Explore" },
];

export default function About() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="about-section" id="about">
      <div className="about-grid-bg" aria-hidden="true" />
      <div className="about-container">
        <motion.div className="about-heading" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="section-index"><span /> 01 / ABOUT ME</span>
          <h2>BEYOND THE<span> CODE.</span></h2>
          <p>A little about the mind behind the digital experiences.</p>
        </motion.div>

        <div className="about-layout">
          <motion.div className="cinematic-portrait" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="cinematic-top"><span>PERSONAL PROFILE / 001</span><span className="live">OPEN TO WORK</span></div>
            <div className="cinematic-avatar-stage">
              <div className="cinematic-avatar-halo" aria-hidden="true" />
              <motion.div className="cinematic-avatar" animate={reduceMotion ? undefined : { y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <img src="/images/neel-avatar.png" alt="Illustrated portrait of Neel Patel" loading="lazy" decoding="async" />
              </motion.div>
            </div>
            <div className="cinematic-bottom"><strong>Neel Patel</strong><span>SURAT / INDIA</span></div>
          </motion.div>

          <motion.div className="about-content" initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="about-small-title">WHO AM I?</span>
            <h3>More than<br /><span>just code.</span></h3>
            <p>I'm Neel, a Computer Science and Engineering graduate from Parul University who enjoys building digital products at the intersection of development, data, and design.</p>
            <p>From full-stack applications and backend systems to interactive dashboards and visual identities, I turn ideas into functional, thoughtful digital experiences.</p>
            <div className="about-focus" aria-label="Areas of focus"><span>Development</span><span>Analytics</span><span>Creative Design</span></div>
            <a href="#projects" className="about-link">EXPLORE MY WORK <span aria-hidden="true">↗</span></a>
          </motion.div>
        </div>

        <div className="about-highlights">
          {highlights.map((item, index) => (
            <motion.div className="highlight-card" key={item.label} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}>
              <h3>{item.value}</h3><p>{item.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="interest-heading"><span>MY CREATIVE UNIVERSE</span><p>THREE FIELDS. ONE CURIOSITY.</p></div>
        <div className="interest-grid">
          {interests.map((item, index) => (
            <motion.div className={`interest-card ${item.accent}`} key={item.number} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} whileHover={reduceMotion ? undefined : { y: -8 }}>
              <div className="interest-top"><span>{item.number} / FIELD</span><span className="interest-arrow">↗</span></div>
              <h3>{item.title}</h3><p>{item.description}</p>
              <div className="interest-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
