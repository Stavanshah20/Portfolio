import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaNetworkWired, FaRobot, FaShieldAlt, FaHeadset, FaHandPaper, FaBrain, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const projectsData = [
  {
    id: "01",
    title: "Distributed Banking System",
    tagline: "Fault-tolerant, 80 TPS, linearizable",
    description: "Fault-tolerant banking system using sharding, Paxos/Multi-Paxos for consensus, and Two-Phase Commit (2PC) for cross-shard atomicity. Benchmarked at 80 TPS with full linearizability and serializability guarantees.",
    tech: ["Golang", "gRPC", "Paxos", "2PC", "Sharding"],
    icon: <FaNetworkWired />,
    github: "https://github.com/Stavanshah20/Distributed-Banking-System",
    accent: "#00f0ff",
    stat: "80 TPS",
    statLabel: "throughput",
    size: "large",
  },
  {
    id: "02",
    title: "GenAI HelpDesk",
    tagline: "Multi-agent IT automation",
    description: "Multi-agent IT helpdesk automating ticket triage, retrieval, troubleshooting, and escalation using CrewAI, Google ADK, and LangGraph with A2A communication.",
    tech: ["Python", "CrewAI", "LangGraph", "RAG", "MCP"],
    icon: <FaHeadset />,
    github: "https://github.com/Stavanshah20/AI-enabled-HelpDesk",
    accent: "#FF9900",
    stat: "A2A",
    statLabel: "agent protocol",
    size: "small",
  },
  {
    id: "03",
    title: "Autonomous Cache Evolution",
    tagline: "LLM-driven OS optimization",
    description: "FunSearch-style closed-loop pipeline on HPC with SQLite RAG and OpenAI o4-mini to autonomously generate and refine C++/Rust cache replacement policies via ChampSim feedback. +11.09% LLC hit rate over LRU.",
    tech: ["Python", "C++", "Rust", "LLMs", "HPC"],
    icon: <FaRobot />,
    github: null,
    accent: "#bb86fc",
    stat: "+11%",
    statLabel: "LLC hit rate",
    size: "small",
  },
  {
    id: "04",
    title: "WhatsApp Chat Analyzer",
    tagline: "NLP sentiment & summarization",
    description: "Python app using Flask, Streamlit and MongoDB to analyze WhatsApp group chats. Sentiment analysis, text summarization, and contextual understanding using HuggingFace Transformers, NLTK, BERT. 85% sentiment accuracy.",
    tech: ["Python", "Flask", "MongoDB", "NLP", "BERT"],
    icon: <FaShieldAlt />,
    github: "https://github.com/Stavanshah20/Whatsapp-Chat-Analyzer",
    accent: "#FF4081",
    stat: "85%",
    statLabel: "sentiment acc.",
    size: "small",
  },
  {
    id: "05",
    title: "Helping Hand",
    tagline: "Gesture AI for the visually impaired",
    description: "Gesture-based Android app for the visually impaired using MediaPipe for real-time hand gesture recognition. Closed fist reads notifications, victory sign gives short image descriptions, open palm gives detailed ones — via FastAPI + Claude 3 Haiku on AWS Bedrock.",
    tech: ["Android", "FastAPI", "MediaPipe", "AWS Bedrock", "Claude AI"],
    icon: <FaHandPaper />,
    github: "https://github.com/Stavanshah20/helping-hand",
    accent: "#00E676",
    stat: "3",
    statLabel: "gesture modes",
    size: "small",
  },
  {
    id: "06",
    title: "Model Compression",
    tagline: "Cancer detection, 40% smaller",
    description: "Optimized VGG16, VGG19, and ResNet models using pruning, quantization, knowledge distillation, and low-rank factorization to reduce model size up to 40% with minimal accuracy loss for cancer detection.",
    tech: ["PyTorch", "Pruning", "Quantization", "Knowledge Distillation"],
    icon: <FaBrain />,
    github: "https://github.com/Stavanshah20/Earthquake-Detection-",
    accent: "#FF6B35",
    stat: "40%",
    statLabel: "size reduction",
    size: "small",
  }
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`proj-card proj-${project.size}`}
      style={{ '--proj-accent': project.accent }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar */}
      <div className="proj-topbar">
        <span className="proj-id">{project.id}</span>
        <div className="proj-stat">
          <span className="proj-stat-val" style={{ color: project.accent }}>{project.stat}</span>
          <span className="proj-stat-label">{project.statLabel}</span>
        </div>
      </div>

      {/* Icon */}
      <div className="proj-icon-wrap">
        <motion.div
          className="proj-icon"
          animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 8 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ color: project.accent }}
        >
          {project.icon}
        </motion.div>
        <div className="proj-icon-glow" style={{ background: project.accent }} />
      </div>

      {/* Content */}
      <div className="proj-content">
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-tagline">{project.tagline}</p>

        <AnimatePresence>
          {hovered && (
            <motion.p
              className="proj-desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="proj-tech">
          {project.tech.map((t, i) => (
            <span key={i} className="proj-tech-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="proj-footer">
        {project.github ? (
          <a href={project.github} target="_blank" rel="noreferrer" className="proj-link" onClick={e => e.stopPropagation()}>
            <FaGithub /> Code <FaExternalLinkAlt size={10} />
          </a>
        ) : (
          <span className="proj-private">Private / Research</span>
        )}
      </div>

      {/* Accent border bottom */}
      <div className="proj-accent-bar" style={{ background: project.accent }} />
    </motion.div>
  );
};

const Projects = () => (
  <section className="projects-container" id="projects">
    <motion.div
      className="section-title-block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-label">portfolio</span>
      <h2 className="section-heading">Engineering <span>Showcase</span></h2>
    </motion.div>

    <div className="projects-bento">
      {projectsData.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  </section>
);

export default Projects;
