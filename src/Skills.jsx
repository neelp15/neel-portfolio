
import { motion } from "framer-motion";
import {
  Code2,
  Globe2,
  Database,
  ChartNoAxesCombined,
  Wrench,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import "./Skills.css";

const skillCategories = [
  {
    number: "01",
    title: "Programming",
    icon: Code2,
    accent: "purple",
    description: "Languages and fundamentals for building software.",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },
  {
    number: "02",
    title: "Web Development",
    icon: Globe2,
    accent: "cyan",
    description: "Modern frontend and backend application development.",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "JWT Authentication",
    ],
  },
  {
    number: "03",
    title: "Databases",
    icon: Database,
    accent: "pink",
    description: "Managing structured and document-based data.",
    skills: [
      "MongoDB Atlas",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    number: "04",
    title: "Data Analytics",
    icon: ChartNoAxesCombined,
    accent: "cyan",
    description: "Transforming datasets into actionable insights.",
    skills: [
      "Power BI",
      "DAX",
      "Data Cleaning",
      "Data Visualization",
      "KPI Development",
    ],
  },
  {
    number: "05",
    title: "Tools & Concepts",
    icon: Wrench,
    accent: "purple",
    description: "Development workflows and engineering fundamentals.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "SQLAlchemy",
      "OOP",
      "DSA",
    ],
  },
  {
    number: "06",
    title: "Creative Design",
    icon: Palette,
    accent: "pink",
    description: "Design tools for visual identities and digital experiences.",
    skills: [
      "Canva",
      "Photoshop",
      "Illustrator",
      "Figma",
      "InDesign",
    ],
  },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <motion.div
          className="skills-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="skills-index">
            <span className="skills-dot" />
            02 / SKILLS & TECHNOLOGIES
          </span>

          <h2>
            MY DIGITAL <span>TOOLKIT.</span>
          </h2>

          <p>
            Technologies, tools, and creative skills I use
            to turn ideas into real-world projects.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.number}
                className={`skill-card ${category.accent}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: (index % 3) * 0.1,
                }}
                whileHover={{ y: -7 }}
              >
                <div className="skill-card-top">
                  <div className="skill-icon">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>

                  <span className="skill-number">
                    {category.number} / DOMAIN
                  </span>
                </div>

                <h3>{category.title}</h3>

                <p className="skill-description">
                  {category.description}
                </p>

                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="skill-card-bottom">
                  <span>
                    {String(category.skills.length).padStart(2, "0")}
                    {" "}SKILLS
                  </span>
                  <ArrowUpRight size={17} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
