
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  CalendarDays,
} from "lucide-react";
import "./Experience.css";

const experience = [
  {
    role: "Full Stack Web Developer Intern",
    company: "CyberSecurity Umbrella",
    location: "Surat, Gujarat",
    duration: "3 Months",
    description:
      "Worked on responsive web interfaces using React, JavaScript, HTML and CSS, alongside Node.js and Express.js backend APIs, authentication and UI debugging.",
    skills: ["React.js", "JavaScript", "Node.js", "Express.js", "Git"],
  },
];

const education = [
  {
    degree: "Bachelor of Technology — Computer Science & Engineering",
    institution: "Parul University",
    location: "Vadodara, Gujarat",
    duration: "2022 – 2026",
    detail: "CGPA: 7.25",
  },
  {
    degree: "Senior Secondary Education — CBSE",
    institution: "Kendriya Vidyalaya No. 2, Surat",
    duration: "2021 – 2022",
    detail: "72%",
  },
  {
    degree: "Secondary Education — CBSE",
    institution: "Kendriya Vidyalaya No. 2, Surat",
    duration: "2019 – 2020",
    detail: "79.8%",
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <motion.div
          className="experience-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="experience-index">
            04 / MY JOURNEY
          </span>

          <h2>
            EXPERIENCE <span>& EDUCATION.</span>
          </h2>

          <p>
            My professional experience and academic foundation
            in software development and technology.
          </p>
        </motion.div>

        <div className="experience-columns">
          <div className="timeline-column">
            <h3 className="timeline-title">
              <BriefcaseBusiness size={22} />
              Professional Experience
            </h3>

            <div className="experience-timeline">
              {experience.map((item) => (
                <motion.article
                  key={item.company}
                  className="timeline-card"
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="timeline-dot" />

                  <span className="timeline-date">
                    <CalendarDays size={14} />
                    {item.duration}
                  </span>

                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>

                  <span className="timeline-location">
                    <MapPin size={14} />
                    {item.location}
                  </span>

                  <p>{item.description}</p>

                  <div className="timeline-tags">
                    {item.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="timeline-column">
            <h3 className="timeline-title">
              <GraduationCap size={24} />
              Education
            </h3>

            <div className="experience-timeline">
              {education.map((item) => (
                <motion.article
                  key={item.degree}
                  className="timeline-card"
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="timeline-dot" />

                  <span className="timeline-date">
                    <CalendarDays size={14} />
                    {item.duration}
                  </span>

                  <h4>{item.degree}</h4>
                  <h5>{item.institution}</h5>

                  {item.location && (
                    <span className="timeline-location">
                      <MapPin size={14} />
                      {item.location}
                    </span>
                  )}

                  <p>{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
