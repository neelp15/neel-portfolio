
import { motion } from "framer-motion";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Activity,
  ChartNoAxesCombined,
  Sparkles,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import "./Projects.css";

// ========================================
// PROJECT DATA
// ========================================

const projects = [
  {
    id: "01",
    name: "CareerPilot",
    subtitle: "Smart Job Application Tracker",
    category: "FULL STACK / AI",
    description:
      "A full-stack job tracking platform featuring JWT authentication, application management, analytics, and Gemini AI-powered resume analysis against job descriptions.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Gemini AI",
    ],
    github:
      "https://github.com/neelp15/smart-job-application-tracker",
    demo:
      "https://smart-job-application-tracker-beta.vercel.app/",
    accent: "purple",
    type: "career",
  },
  {
    id: "02",
    name: "API Monitoring",
    subtitle: "Incident Alert System",
    category: "PYTHON / BACKEND",
    description:
      "An API monitoring service that tracks endpoint availability, records health checks, manages incidents, and sends automated failure and recovery email alerts.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Render",
    ],
    github:
      "https://github.com/neelp15/api-monitoring-system",
    demo: null,
    accent: "cyan",
    type: "monitor",
  },
  {
    id: "03",
    name: "Olist E-Commerce",
    subtitle: "Analytics Dashboard",
    category: "DATA ANALYTICS",
    description:
      "An interactive Power BI dashboard analyzing over 96,470 orders, revenue trends, product categories, customer reviews, and delivery performance.",
    technologies: [
      "Power BI",
      "SQL",
      "DAX",
      "Data Visualization",
    ],
    github: null,
    demo: null,
    accent: "pink",
    type: "analytics",
  },
];

// ========================================
// PROJECT PREVIEW COMPONENT
// ========================================

function ProjectPreview({ type }) {
  // CAREERPILOT PREVIEW

  if (type === "career") {
    return (
      <div className="project-preview preview-career">
        <div className="preview-topbar">
          <span>CAREERPILOT / OVERVIEW</span>
          <Sparkles size={15} />
        </div>

        <div className="preview-stats">
          <div>
            <small>APPLICATIONS</small>
            <strong>TRACKER</strong>
          </div>

          <div>
            <small>AI ANALYSIS</small>
            <strong>GEMINI</strong>
          </div>
        </div>

        <div className="preview-pipeline">
          {["Applied", "Interview", "Offer"].map(
            (stage, index) => (
              <div key={stage}>
                <span>{stage}</span>

                <div
                  className="pipeline-bar"
                  style={{
                    width: `${90 - index * 23}%`,
                  }}
                />
              </div>
            )
          )}
        </div>

        <div className="preview-watermark">
          <BriefcaseBusiness
            size={115}
            strokeWidth={0.7}
          />
        </div>
      </div>
    );
  }

  // API MONITORING PREVIEW

  if (type === "monitor") {
    return (
      <div className="project-preview preview-monitor">
        <div className="preview-topbar">
          <span>API / MONITORING</span>

          <span className="preview-live">
            ● SYSTEM UI
          </span>
        </div>

        <div className="monitor-wave">
          <Activity
            size={75}
            strokeWidth={1}
          />
        </div>

        <div className="monitor-rows">
          {[
            "Health Checks",
            "Incident Tracking",
            "Email Alerts",
          ].map((item, index) => (
            <div key={item}>
              <span>{item}</span>

              <span
                className={
                  index === 1
                    ? "monitor-purple"
                    : ""
                }
              >
                ●
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // OLIST ANALYTICS PREVIEW

  return (
    <div className="project-preview preview-analytics">
      <div className="preview-topbar">
        <span>OLIST / ANALYTICS</span>

        <ChartNoAxesCombined size={17} />
      </div>

      <div className="analytics-metrics">
        <div>
          <small>ORDERS</small>
          <strong>96.47K+</strong>
        </div>

        <div>
          <small>REVENUE</small>
          <strong>13.22M</strong>
        </div>
      </div>

      <div className="analytics-bars">
        {[
          35, 55, 44, 72, 61,
          88, 69, 100, 78,
        ].map((height, index) => (
          <span
            key={index}
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>

      <div className="analytics-footer">
        <span>DELIVERY ANALYSIS</span>

        <strong>8.1% LATE</strong>
      </div>
    </div>
  );
}

// ========================================
// PROJECTS SECTION
// ========================================

export default function Projects() {
  return (
    <section
      className="projects-section"
      id="projects"
    >
      <div className="projects-container">

        {/* SECTION HEADING */}

        <motion.div
          className="projects-heading"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="projects-index">
            <span className="projects-dot" />
            03 / SELECTED WORK
          </span>

          <h2>
            FEATURED <span>PROJECTS.</span>
          </h2>

          <p>
            A selection of projects demonstrating
            my experience in full-stack development,
            backend engineering, and data analytics.
          </p>
        </motion.div>

        {/* PROJECT CARDS */}

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`project-card ${project.accent}`}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
              }}
            >
              {/* PROJECT VISUAL */}

              <ProjectPreview
                type={project.type}
              />

              {/* PROJECT INFORMATION */}

              <div className="project-content">
                <div className="project-meta">
                  <span>
                    {project.id} / PROJECT
                  </span>

                  <span>
                    {project.category}
                  </span>
                </div>

                <h3>{project.name}</h3>

                <h4>{project.subtitle}</h4>

                <p>{project.description}</p>

                {/* TECHNOLOGIES */}

                <div className="project-technologies">
                  {project.technologies.map(
                    (tech) => (
                      <span key={tech}>
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* PROJECT LINKS */}

                <div className="project-actions">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} source code`}
                    >
                      <FaGithub size={17} />
                      Source Code
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} live demo`}
                    >
                      Live Demo
                      <ArrowUpRight size={17} />
                    </a>
                  )}

                  {!project.github &&
                    !project.demo && (
                      <span className="project-no-link">
                        Dashboard case study
                      </span>
                    )}

                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* GITHUB CTA */}

        <div className="projects-bottom">
          <p>
            Explore more of my development work
            on GitHub.
          </p>

          <a
            href="https://github.com/neelp15"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
