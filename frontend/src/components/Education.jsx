import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sbuLogo from '../assets/sbu_logo.png';
import pdeuLogo from '../assets/pdeu.png';
import './Education.css';

const educationData = [
  {
    university: "Stony Brook University",
    short: "SBU",
    degree: "M.S. Computer Science",
    date: "Aug 2024 – May 2026",
    gpa: "3.7 / 4.0",
    location: "New York, USA",
    highlight: "Teaching Assistant — Digital Intelligence & Database",
    coursework: ["Distributed Systems", "Network Security", "Analysis of Algorithms", "Data Science"],
    logo: sbuLogo,
    accent: "#CC0000",
    stamp: "ENROLLED",
  },
  {
    university: "Pandit Deendayal Energy University",
    short: "PDEU",
    degree: "B.Tech Computer Science",
    date: "Aug 2020 – May 2024",
    gpa: "9.72 / 10.0",
    location: "Gujarat, India",
    highlight: "",
    coursework: ["Operating Systems", "System Design", "Computer Networks", "Compiler Design", "DBMS", "Web Dev", "AI / ML", "Blockchain"],
    logo: pdeuLogo,
    accent: "#FF9900",
    stamp: "GRADUATED",
  }
];

const EduCard = ({ edu, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="edu-card-scene"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        className={`edu-card-flipper ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(f => !f)}
        style={{ '--edu-accent': edu.accent }}
      >
        {/* FRONT */}
        <div className="edu-face edu-front">
          {/* Left stamp panel */}
          <div className="edu-stamp-panel">
            <div className="edu-stamp-ring">
              <img src={edu.logo} alt={edu.university} className="edu-stamp-logo" />
            </div>
            <div className="edu-stamp-badge" style={{ borderColor: edu.accent, color: edu.accent }}>
              {edu.stamp}
            </div>
            <div className="edu-stamp-short">{edu.short}</div>
          </div>

          {/* Right info panel */}
          <div className="edu-info-panel">
            <div className="edu-info-top">
              <span className="edu-location">{edu.location}</span>
              <span className="edu-date-badge">{edu.date}</span>
            </div>
            <h3 className="edu-uni-name">{edu.university}</h3>
            <p className="edu-degree-name">{edu.degree}</p>

            <div className="edu-gpa-row">
              <div className="edu-gpa-block" style={{ borderColor: edu.accent + '55' }}>
                <span className="edu-gpa-val" style={{ color: edu.accent }}>{edu.gpa}</span>
                <span className="edu-gpa-label">GPA</span>
              </div>
              {edu.highlight && (
                <p className="edu-highlight">✦ {edu.highlight}</p>
              )}
            </div>

            <div className="edu-courses">
              {edu.coursework.slice(0, 4).map((c, i) => (
                <span key={i} className="edu-course-chip">{c}</span>
              ))}
              {edu.coursework.length > 4 && (
                <span className="edu-course-chip edu-more-chip" onClick={e => { e.stopPropagation(); setFlipped(true); }}>
                  +{edu.coursework.length - 4} more →
                </span>
              )}
            </div>
          </div>

          <div className="edu-flip-hint">flip for all courses ↻</div>
        </div>

        {/* BACK */}
        <div className="edu-face edu-back">
          <div className="edu-back-header" style={{ borderBottomColor: edu.accent + '44' }}>
            <img src={edu.logo} alt={edu.university} className="edu-back-logo" />
            <div>
              <h4>{edu.university}</h4>
              <p>{edu.degree}</p>
            </div>
          </div>
          <p className="edu-back-label">Full Coursework</p>
          <div className="edu-courses edu-back-courses">
            {edu.coursework.map((c, i) => (
              <span key={i} className="edu-course-chip" style={{ borderColor: edu.accent + '55', color: edu.accent }}>
                {c}
              </span>
            ))}
          </div>
          <div className="edu-flip-hint">↻ flip back</div>
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => (
  <section className="edu-container" id="education">
    <motion.div
      className="section-title-block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-label">background</span>
      <h2 className="section-heading">Academic <span>Background</span></h2>
    </motion.div>

    <div className="edu-grid">
      {educationData.map((edu, i) => (
        <EduCard key={i} edu={edu} index={i} />
      ))}
    </div>
  </section>
);

export default Education;
