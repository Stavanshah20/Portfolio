import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaTerminal, FaCircle } from 'react-icons/fa';
import awsLogo from '../assets/aws_logo.jpeg';
import isroLogo from '../assets/isro_logo.jpeg';
import einfochipsLogo from '../assets/einfochips_logo.jpeg';
import kalpataruLogo from '../assets/kalpataru_logo.jpeg';
import './Experience.css';

const experiences = [
  {
    id: 'aws',
    role: "SDE Intern",
    company: "Amazon Web Services",
    shortName: "AWS",
    date: "May 2025 – Aug 2025",
    location: "Seattle, WA",
    accent: "#FF9900",
    pid: "2025-SDE-001",
    logo: awsLogo,
    metrics: [
      { value: "10+",   label: "Regions" },
      { value: "SEV2",  label: "Auto-tickets" },
      { value: "CDK",   label: "IaC Stack" },
    ],
    desc: [
      "Built a security audit system inside AWS Signer — digitally signs code so companies know it hasn't been tampered with.",
      "Monitored 10+ AWS data centers simultaneously, ensuring all data replicas stay in sync across regions.",
      "Automated incident response: unauthorized data changes instantly file a high-priority SEV2 ticket — no human needed.",
      "Wired together SQS, Lambda, CloudTrail, and DynamoDB into a cohesive monitoring and alerting pipeline.",
    ],
    tech: ["Java", "TypeScript", "Spring Boot", "AWS CDK", "DynamoDB", "SQS", "Lambda", "CloudTrail"],
  },
  {
    id: 'isro',
    role: "ML Engineer Intern",
    company: "Indian Space Research Organization",
    shortName: "ISRO",
    date: "Jan 2024 – Jun 2024",
    location: "Gujarat, India",
    accent: "#00C8FF",
    pid: "2024-MLE-002",
    logo: isroLogo,
    metrics: [
      { value: "96%",  label: "Accuracy" },
      { value: "GAN",  label: "Architecture" },
      { value: "S-2",  label: "Satellite" },
    ],
    desc: [
      "Trained pix2pix and GAN models to remove atmospheric haze from Sentinel-2 satellite images — 96% accuracy.",
      "Compressed models via pruning and quantization so they run efficiently on limited hardware.",
      "Deployed a full web platform (AngularJS + FastAPI) for ISRO scientists to upload and clean satellite images instantly.",
    ],
    tech: ["PyTorch", "TensorFlow", "FastAPI", "AngularJS", "NumPy", "Nginx"],
  },
  {
    id: 'einfochips',
    role: "Software Developer Intern",
    company: "eInfochips – Arrow Electronics",
    shortName: "eInfochips",
    date: "Apr 2023 – Jun 2023",
    location: "Ahmedabad, India",
    accent: "#00E676",
    pid: "2023-SWE-003",
    logo: einfochipsLogo,
    metrics: [
      { value: "REST",   label: "APIs Built" },
      { value: "OAuth",  label: "Auth Layer" },
      { value: "Docker", label: "Deploy" },
    ],
    desc: [
      "Built backend REST APIs for an invoicing system — create, read, update invoices through a clean interface.",
      "Secured access with OAuth 2.0 and JWT tokens — only the right people see the right data.",
      "Dockerized the app and deployed on AWS EC2 inside a CI/CD pipeline for zero-touch releases.",
    ],
    tech: ["Node.js", "Express.js", "PostgreSQL", "Docker", "AWS EC2", "Jest", "JWT"],
  },
  {
    id: 'kalpataru',
    role: "Data Engineer Intern",
    company: "Kalpa Taru Power Transmission",
    shortName: "KTPTL",
    date: "Dec 2022 – Feb 2023",
    location: "Gujarat, India",
    accent: "#FF4081",
    pid: "2022-DE-004",
    logo: kalpataruLogo,
    metrics: [
      { value: "400+", label: "Employees" },
      { value: "ETL",  label: "Pipelines" },
      { value: "❄️",   label: "Snowflake" },
    ],
    desc: [
      "Built ETL pipelines connecting AWS RDS, SAP, and Snowflake — consolidating 400+ employee records into one view.",
      "Used Airflow to schedule pipelines and Spark to process large datasets in parallel at speed.",
      "Built interactive React.js + D3.js dashboards so managers could explore data visually via REST API.",
    ],
    tech: ["Python", "Apache Airflow", "Apache Spark", "Snowflake", "AWS RDS", "React.js", "D3.js"],
  },
];

const ExperienceCard = ({ exp, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="exp-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ '--accent': exp.accent }}
    >
      {/* macOS window chrome */}
      <div className="card-topbar">
        <div className="topbar-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="topbar-title">
          <FaTerminal size={10} style={{ opacity: 0.4 }} />
          <span>process/{exp.pid}</span>
        </div>
        <div className="topbar-status">
          <FaCircle size={7} className="status-pulse" style={{ color: exp.accent }} />
          <span style={{ color: exp.accent }}>COMPLETED</span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Logo */}
        <div className="card-logo-wrap" style={{ borderColor: exp.accent + '55' }}>
          <img src={exp.logo} alt={exp.company} className="card-logo" />
        </div>

        {/* Info */}
        <div className="card-info">
          <div className="card-meta">
            <span className="card-date" style={{ color: exp.accent }}>{exp.date}</span>
            <span className="card-location">{exp.location}</span>
          </div>

          <div className="card-titles">
            <h3 className="card-company-name" style={{ color: exp.accent }}>{exp.company}</h3>
            <div className="card-role">{exp.role}</div>
          </div>

          {/* Metrics */}
          <div className="card-metrics">
            {exp.metrics.map((m, i) => (
              <div key={i} className="metric-chip" style={{ borderColor: exp.accent + '44' }}>
                <span className="metric-val" style={{ color: exp.accent }}>{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Tech */}
          <div className="card-tech">
            {exp.tech.map((t, i) => (
              <span key={i} className="tech-pill">{t}</span>
            ))}
          </div>

          {/* Expand */}
          <button
            className="expand-btn"
            onClick={() => setOpen(!open)}
            style={{ color: exp.accent }}
            aria-expanded={open}
          >
            <span>{open ? 'Hide details' : 'What did I do here?'}</span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <FaChevronDown size={11} />
            </motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="card-desc"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul>
                  {exp.desc.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="card-glow-bar" style={{ background: exp.accent }} />
    </motion.div>
  );
};

const Experience = () => (
  <section className="exp-container" id="experience">
    <motion.div
      className="section-title-block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-label">career</span>
      <h2 className="section-heading">Work <span>Experience</span></h2>
    </motion.div>

    <div className="exp-list">
      {experiences.map((exp, i) => (
        <ExperienceCard key={exp.id} exp={exp} index={i} />
      ))}
    </div>
  </section>
);

export default Experience;
