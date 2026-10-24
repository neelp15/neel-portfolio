
import {
  ArrowDownRight,
  ArrowRight,
  Code2,
  Database,
  Mail,
  Menu,
  Terminal,
  X,
  BarChart3,
  ExternalLink,
  Download,
  Cpu,
  Workflow,
  Sparkles,
  GraduationCap,
  Send,
  FileCode2,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./index.css";

const projects = [
  {
    number: "01",
    category: "FULL STACK DEVELOPMENT",
    title: "Smart Job Application Tracker",
    description:
      "A centralized job-search workspace for recording applications, tracking each opportunity through its hiring stage, and keeping follow-ups organized. Built with the MERN stack to demonstrate full-stack CRUD workflows and practical data management.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    icon: Code2,
    color: "violet",
    github: "https://github.com/neelp15/smart-job-application-tracker.git",
    demo: "",
  },
  {
    number: "02",
    category: "PYTHON DEVELOPMENT",
    title: "API Monitoring & Incident Alert System",
    description:
      "A Python and FastAPI service that periodically checks endpoint health, stores response results, tracks incidents, and sends email notifications when a service fails or recovers. Includes a dashboard for reviewing monitor status and incident history.",
    tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    icon: Terminal,
    color: "blue",
    github: "https://github.com/neelp15/api-monitoring-system",
    demo: "",
  },
  {
    number: "03",
    category: "DATA ANALYTICS",
    title: "Olist E-commerce Analytics",
    description:
      "An e-commerce analytics workflow using Python and SQL to prepare order data, then Power BI and DAX to explore sales trends and performance indicators. Designed to turn raw marketplace data into a clearer view of business performance.",
    tech: ["Python", "SQL", "Power BI", "DAX"],
    icon: BarChart3,
    color: "pink",
    github: "https://github.com/neelp15/olist-ecommerce.git",
    demo: "",
  },
];

const skills = [
  {
    title: "Frontend",
    description: "Building responsive interfaces and reusable UI components.",
    icon: Code2,
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Backend",
    description: "Creating API-driven applications and service logic.",
    icon: Terminal,
    items: ["Node.js", "Express.js", "Python", "FastAPI"],
  },
  {
    title: "Database",
    description: "Working with structured queries and application data.",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "SQL"],
  },
  {
    title: "Data & Tools",
    description: "Exploring data, building reports, and managing code with Git.",
    icon: BarChart3,
    items: ["Power BI", "DAX", "Git", "GitHub"],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "projects", "resume", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
    };
  }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const closeMenu = () => setMenuOpen(false);
  const navigationClassName = menuOpen ? "nav-links nav-open" : "nav-links";

  // Smooth-scroll only to sections that exist on this page, then close mobile nav.
  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    closeMenu();
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus({ type: "", message: "" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    try {
      const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || `Unable to send your message (HTTP ${response.status}).`);
      }

      setFormStatus({
        type: "success",
        message: result.message || "Thanks for reaching out! Your message has been received.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error instanceof TypeError
            ? "Could not connect to the server. Check your connection and backend configuration, then try again."
            : error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <header className="navbar">
        <a
  className="brand"
  href="#home"
  onClick={(event) => handleNavClick(event, "home")}
  aria-label="Neel Patel — Home"
>
  <span className="brand-logo-window">
    <img
      src="/neel-logo.png"
      alt="NEEL."
      className="brand-image"
    />
  </span>
</a>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav id="primary-navigation" aria-label="Primary navigation" className={navigationClassName}>
          <a className={activeSection === "home" ? "active" : ""} href="#home" onClick={(event) => handleNavClick(event, "home")}><Code2 size={14} /> Home</a>
          <a className={activeSection === "about" ? "active" : ""} href="#about" onClick={(event) => handleNavClick(event, "about")}><Cpu size={14} /> About</a>
          <a className={activeSection === "projects" ? "active" : ""} href="#projects" onClick={(event) => handleNavClick(event, "projects")}><Workflow size={14} /> Projects</a>
          <a href="#resume" onClick={(event) => handleNavClick(event, "resume")}><FileCode2 size={14} /> Resume</a>
          <a className="nav-contact" href="#contact" onClick={(event) => handleNavClick(event, "contact")}>
            <Send size={14} /> Let's Talk <ArrowUpRightIcon />
          </a>
        </nav>
      </header>

      <main>
        
<section className="hero-v3 section-wrap" id="home">
  <div className="hero-v3-grid" />

  <div className="hero-v3-content">
    <div className="hero-v3-status">
      <span className="hero-v3-status-dot" />
      OPEN TO OPPORTUNITIES
    </div>

    <p className="hero-v3-kicker">
      COMPUTER SCIENCE & ENGINEERING
    </p>

    <h1 className="hero-v3-title">
      I build
      <span className="hero-v3-gradient"> digital</span>
      <br />
      <span className="hero-v3-gradient">experiences.</span>
    </h1>

    <p className="hero-v3-description">
      I'm Neel Patel, a Computer Science and Engineering graduate who builds web applications, backend services, and data-focused projects. I enjoy turning a clear problem into a useful product—from shaping the interface to connecting APIs and uncovering insights from data.
    </p>

    <div className="hero-v3-actions">
      <a href="#projects" className="hero-v3-primary">
        Explore Projects <ArrowDownRight size={18} />
      </a>
      <a href="#contact" className="hero-v3-secondary">
        Let's Connect <ArrowRight size={18} />
      </a>
    </div>

    <div className="hero-v3-socials">
      <a href="https://github.com/neelp15"
         target="_blank" rel="noreferrer">
        <Code2 size={17} /> GitHub
      </a>
      <a href="https://www.linkedin.com/in/neel-patel-259139252/"
         target="_blank" rel="noreferrer">
        <Workflow size={17} /> LinkedIn
      </a>
      <a href="mailto:neelp8933@gmail.com">
        <Mail size={17} /> Email
      </a>
    </div>
  </div>

  <div className="hero-v3-visual">
    <div className="hero-v3-orbit hero-v3-orbit-one" />
    <div className="hero-v3-orbit hero-v3-orbit-two" />
    <div className="hero-v3-orb" />

    <div className="hero-v3-terminal">
      <div className="hero-v3-terminal-header">
        <div className="hero-v3-window-dots">
          <span />
          <span />
          <span />
        </div>
        <span>neel@portfolio:~</span>
        <span className="hero-v3-live">LIVE</span>
      </div>

      <div className="hero-v3-terminal-body">
        <p className="hero-v3-terminal-muted">
          // A little about my stack
        </p>
        <p><span className="hero-v3-purple">const</span> developer = {"{"}</p>
        <p className="hero-v3-indent">
          name: <span className="hero-v3-green">'Neel Patel'</span>,
        </p>
        <p className="hero-v3-indent">
          frontend: <span className="hero-v3-green">'React'</span>,
        </p>
        <p className="hero-v3-indent">
          backend: <span className="hero-v3-green">'Node.js'</span>,
        </p>
        <p className="hero-v3-indent">
          data: <span className="hero-v3-green">'Power BI'</span>,
        </p>
        <p className="hero-v3-indent">
          mindset: <span className="hero-v3-green">'Keep Building'</span>
        </p>
        <p>{"}"}</p>
        <p className="hero-v3-terminal-prompt">
          <span>➜</span> ready_to_build<span className="hero-v3-cursor">_</span>
        </p>
      </div>
    </div>

    <div className="hero-v3-float hero-v3-float-top">
      <Code2 size={18} />
      <span><strong>MERN Stack</strong><small>Web Development</small></span>
    </div>

    <div className="hero-v3-float hero-v3-float-bottom">
      <BarChart3 size={18} />
      <span><strong>Data & Insights</strong><small>Python · SQL · Power BI</small></span>
    </div>
  </div>

</section>


        <section className="about section-wrap" id="about">
          <div className="about-intro">
            <div className="section-heading">
              <p className="eyebrow"><Cpu size={13} /> // SYSTEM PROFILE</p>
              <h2>Curious mind. <span className="gradient-text">Builder mindset.</span></h2>
              <p className="section-description">I'm a Computer Science and Engineering graduate from Parul University with hands-on project experience across web development and analytics. My work combines user-focused React interfaces, API-driven backend services, and structured data analysis. I value readable code, practical problem-solving, and improving a project through testing and iteration.</p>
            </div>
            <div className="about-console" aria-label="Developer profile summary">
              <div className="about-console-top"><span className="console-led" /> PROFILE.JSON <span className="console-state">SYNCED</span></div>
              <div className="about-console-body">
                <p><span className="code-purple">01</span> <span className="code-muted">"focus"</span>: <span className="code-cyan">"Full-stack development"</span>,</p>
                <p><span className="code-purple">02</span> <span className="code-muted">"exploring"</span>: <span className="code-cyan">"Python + Analytics"</span>,</p>
                <p><span className="code-purple">03</span> <span className="code-muted">"approach"</span>: <span className="code-cyan">"Build · Test · Improve"</span>,</p>
                <p><span className="code-purple">04</span> <span className="code-muted">"status"</span>: <span className="code-green">"Always learning"</span></p>
              </div>
            </div>
          </div>
          <div className="skills-heading"><p className="eyebrow"><Wrench size={13} /> // CAPABILITY MATRIX</p><span>TECH STACK <b>04 MODULES</b></span></div>
          <div className="skills-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return <article className="skill-card" key={skill.title} style={{ "--card-index": index }}>
                <div className="skill-card-top"><span className="skill-icon"><Icon size={21} /></span><span className="skill-index">0{index + 1} / 04</span></div>
                <h3>{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
                <div className="skill-pills">{skill.items.map((item) => <span key={item}><Code2 size={11} /> {item}</span>)}</div>
                <div className="skill-meter"><span style={{ width: `${82 - index * 5}%` }} /></div>
              </article>;
            })}
          </div>
        </section>

        <section className="projects section-wrap" id="projects">
          <div className="projects-heading">
            <div className="section-heading">
              <p className="eyebrow"><Workflow size={13} /> SELECTED WORK</p>
              <h2>Projects built with <span className="gradient-text">purpose.</span></h2>
              <p className="section-description">
                These projects reflect how I approach different technical challenges: building a full-stack workflow, monitoring service reliability, and translating e-commerce data into useful reporting. Each project is a chance to apply concepts in a practical setting and keep improving my engineering skills.
              </p>
            </div>
            <a
              href="https://github.com/neelp15"
              target="_blank"
              rel="noreferrer"
              className="button button-secondary github-button"
            >
              <Code2 size={17} /> GitHub Profile <ExternalLink size={15} />
            </a>
          </div>

          <div className="projects-grid">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <article className="project-card" key={project.number}>
                  <div className={`project-art ${project.color}`}>
                    <span className="project-number">{project.number}</span>
                    <div className="project-art-icon"><Icon size={42} strokeWidth={1.4} /></div>
                    <span className="project-art-label">{project.category}</span>
                  </div>

                  <div className="project-info">
                    <p className="project-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tech.map((technology) => (
                        <span key={technology}><Code2 size={11} /> {technology}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Code2 size={17} /> Source Code <ArrowUpRightIcon />
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer">
                          Live Demo <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="resume section-wrap" id="resume">
          <div className="resume-panel">
            <div className="resume-symbol"><Download size={26} /></div>
            <div className="resume-copy">
              <p className="eyebrow"><GraduationCap size={13} /> MY RESUME</p>
              <h2>Let's talk about what I can build.</h2>
              <p>
                My resume brings together my Computer Science and Engineering education, technical toolkit, and hands-on projects across full-stack development, Python, and analytics.
              </p>
            </div>
            <a className="button button-primary" href="/Neel_updated_resume.pdf" download>
              Download Resume <Download size={17} />
            </a>
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="section-heading">
            <p className="eyebrow"><Sparkles size={13} /> HAVE A PROJECT IN MIND?</p>
            <h2>Let's create something <span className="gradient-text">great.</span></h2>
            <p className="section-description">
              Have a role, collaboration, or project in mind? Send me a message with a little context, and I'll get back to you as soon as I can.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-details">
              <a className="contact-method" href="mailto:neelp8933@gmail.com">
                <span className="contact-method-icon"><Mail size={20} /></span>
                <span><small>EMAIL ME</small><strong>neelp8933@gmail.com</strong></span>
                <ArrowUpRightIcon />
              </a>
              <a className="contact-method" href="https://github.com/neelp15" target="_blank" rel="noreferrer">
                <span className="contact-method-icon"><Code2 size={20} /></span>
                <span><small>GITHUB</small><strong>github.com/neelp15</strong></span>
                <ArrowUpRightIcon />
              </a>
              <a
  className="contact-method"
  href="https://www.linkedin.com/in/neel-patel-259139252/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn profile"
>
  <span className="contact-method-icon">
    <ExternalLink size={20} />
  </span>
  <span>
    <small>LINKEDIN</small>
    <strong>Connect professionally</strong>
  </span>
  <ArrowUpRightIcon />
</a>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Your name"
                required
              />

              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="you@example.com"
                required
              />

              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                placeholder="What would you like to discuss?"
                maxLength={150}
                required
              />

              <label htmlFor="message">Your message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                placeholder="Share the details, goals, or questions you'd like to discuss..."
                rows="4"
                maxLength={3000}
                required
              />

              {formStatus.message && (
                <p className={`form-status ${formStatus.type}`} role="status" aria-live="polite">
                  {formStatus.message}
                </p>
              )}

              <button
                className="button button-primary submit-button"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
                {!submitting && <ArrowRight size={17} />}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home" aria-label="Neel Patel — Home">
        </a>
        <p><Code2 size={13} /> Designed &amp; built with care by Neel Patel.</p>
        <a className="back-to-top" href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight size={15} className="arrow-up-right" />;
}

export default App;
