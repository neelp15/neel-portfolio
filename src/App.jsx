
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Menu,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import Logo from "./Logo";

import "./App.css";

// Load the 3D scene in a separate JavaScript chunk.
const RobotScene = lazy(() => import("./RobotScene"));

const navigation = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Contact",
];

function RobotFallback() {
  return (
    <div
      className="robot-loading"
      role="status"
      aria-label="Loading 3D robot"
    >
      <div className="robot-loading-spinner" />
      <span>INITIALIZING 3D EXPERIENCE...</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="portfolio">
      {/* BACKGROUND EFFECTS */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-background" />

      {/* NAVIGATION */}
      <nav className="navbar">
        <Logo />

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navigation.map((item) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              className={item === "Home" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-contact">
          Let's Talk
          <ArrowUpRight size={16} />
        </a>

        <button
          type="button"
          className="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        {/* LEFT: INTRODUCTION */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="availability">
            <span className="status-dot" />
            AVAILABLE FOR OPPORTUNITIES
          </div>

          <p className="intro">
            HELLO, I'M NEEL PATEL
          </p>

          <h1 className="hero-title">
            <span className="hero-title-line">
              CRAFTING
            </span>

            <span className="hero-title-line hero-title-accent">
              DIGITAL
            </span>

            <span className="hero-title-line">
              WORLDS<span className="accent">.</span>
            </span>
          </h1>

          <p className="hero-description">
            Full Stack Developer, Data Analyst and Creative
            Designer. I transform ideas into meaningful digital
            experiences through technology and creativity.
          </p>

          {/* HERO ACTIONS */}
          <div className="hero-actions">
            <a
              href="#projects"
              className="primary-btn"
            >
              Explore My Work
              <ArrowUpRight size={18} />
            </a>

            <a
              href="/resume/neel-resume.pdf"
              download="neel-resume.pdf"
              className="secondary-btn resume-btn"
              aria-label="Download Neel Patel's resume as a PDF"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          {/* SOCIAL LINKS */}
          <div className="social-links">
            <a
              href="https://github.com/neelp15"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/neel-patel-259139252"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* RIGHT: INTERACTIVE 3D ROBOT */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <div className="hero-robot-container">
            {/* HOLOGRAPHIC HUD BACKGROUND */}
            <div
              className="robot-hud-background"
              aria-hidden="true"
            >
              <div className="robot-hud-glow" />
              <div className="robot-hud-grid" />

              <div className="robot-hud-ring robot-hud-ring--outer" />
              <div className="robot-hud-ring robot-hud-ring--inner" />

              <div className="robot-hud-crosshair" />
              <div className="robot-hud-orbit-dot" />
            </div>

            {/* ROBOT STATUS */}
            <div className="hero-robot-eyebrow">
              <span className="hero-robot-status" />
              AI COMPANION / ONLINE
            </div>

            {/* LAZY-LOADED 3D ROBOT */}
            <Suspense fallback={<RobotFallback />}>
              <RobotScene variant="hero" />
            </Suspense>

            {/* FLOATING TECH LABELS */}
            <div className="floating-label label-top">
              <span>01 /</span> INTERACTIVE DESIGN
            </div>

            <div className="floating-label label-bottom">
              DIGITAL COMPANION
            </div>
          </div>
        </motion.div>

        {/* HERO FOOTER */}
        <div className="hero-footer">
          <span>© 2026 NEEL PATEL</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <span>INDIA / 21°N</span>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <About />

      {/* SKILLS SECTION */}
      <Skills />

      {/* FEATURED PROJECTS SECTION */}
      <Projects />

      {/* EXPERIENCE SECTION */}
      <Experience />

      {/* CONTACT SECTION */}
      <Contact />
    </main>
  );
}

export default App;
