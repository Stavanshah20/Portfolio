import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaServer, FaBrain, FaLayerGroup, FaChartPie, FaCloud, FaSearch } from 'react-icons/fa';
import './Skills.css';

const skillData = [
  {
    id: 'ai',
    title: "Gen AI & Deep Learning",
    icon: <FaBrain />,
    color: "#bb86fc",
    skills: ["PyTorch", "TensorFlow", "Keras", "OpenCV", "HuggingFace", "BERT", "spaCy", "NLTK", "LLMs", "LangChain", "LangGraph", "RAG", "A2A Agents", "MCP", "Prompt Engineering", "OpenAI o4-mini", "GANs", "pix2pix", "CrewAI", "Google ADK"]
  },
  {
    id: 'lang',
    title: "Languages",
    icon: <FaCode />,
    color: "#00f0ff",
    skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "Java", "Go", "Kotlin", "Scala", "R", "Ruby", "PHP", "C#", "HTML5", "CSS3", "Shell"]
  },
  {
    id: 'backend',
    title: "Backend & Systems",
    icon: <FaServer />,
    color: "#00E676",
    skills: ["Node.js", "Express.js", "Spring Boot", "Django", "Flask", "FastAPI", "PostgreSQL", "MongoDB", "MySQL", "Redis", "gRPC", "REST APIs", "OAuth 2.0", "JWT", "Paxos", "2PC", "Distributed Systems"]
  },
  {
    id: 'data',
    title: "Data Engineering",
    icon: <FaChartPie />,
    color: "#FF9900",
    skills: ["Apache Spark", "Hadoop", "Flink", "Kafka", "Airflow", "Databricks", "Snowflake", "Tableau", "PowerBI", "Grafana", "ETL Pipelines", "D3.js"]
  },
  {
    id: 'frontend',
    title: "Frontend & Mobile",
    icon: <FaLayerGroup />,
    color: "#FF4081",
    skills: ["React.js", "Next.js", "Angular", "AngularJS", "Redux", "Framer Motion", "Flutter", "Android Studio", "MediaPipe", "CameraX"]
  },
  {
    id: 'cloud',
    title: "Cloud & DevOps",
    icon: <FaCloud />,
    color: "#FFD700",
    skills: ["AWS EC2", "AWS S3", "Lambda", "DynamoDB", "SQS", "CloudTrail", "AWS CDK", "GCP", "Azure", "Firebase", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD", "GitHub Actions", "Nginx", "Linux"]
  }
];

const Skills = () => {
  const [activeId, setActiveId] = useState('ai');
  const [query, setQuery] = useState('');

  const active = skillData.find(s => s.id === activeId);

  const filtered = useMemo(() => {
    if (!query.trim()) return active.skills;
    return active.skills.filter(s => s.toLowerCase().includes(query.toLowerCase()));
  }, [active, query]);

  const allFiltered = useMemo(() => {
    if (!query.trim()) return null;
    return skillData.flatMap(cat =>
      cat.skills
        .filter(s => s.toLowerCase().includes(query.toLowerCase()))
        .map(s => ({ skill: s, cat: cat.title, color: cat.color }))
    );
  }, [query]);

  return (
    <section className="skills-container" id="skills">
      <div className="skills-bg-orb orb-1" />
      <div className="skills-bg-orb orb-2" />

      <motion.div
        className="section-title-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">tools & tech</span>
        <h2 className="section-heading">Technical <span>Arsenal</span></h2>
      </motion.div>

      <div className="skills-palette">
        {/* Search bar */}
        <div className="skills-search">
          <FaSearch className="skills-search-icon" />
          <input
            type="text"
            placeholder="Search any skill..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="skills-search-input"
          />
          {query && (
            <button className="skills-search-clear" onClick={() => setQuery('')}>✕</button>
          )}
        </div>

        {query.trim() ? (
          /* Global search results */
          <div className="skills-search-results">
            {allFiltered.length === 0 ? (
              <p className="skills-empty">No skills match "{query}"</p>
            ) : (
              allFiltered.map((item, i) => (
                <motion.div
                  key={i}
                  className="skills-result-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <span className="skills-result-skill" style={{ color: item.color }}>{item.skill}</span>
                  <span className="skills-result-cat">{item.cat}</span>
                </motion.div>
              ))
            )}
          </div>
        ) : (
          <div className="skills-body">
            {/* Category tabs */}
            <div className="skills-tabs">
              {skillData.map(cat => (
                <button
                  key={cat.id}
                  className={`skills-tab ${activeId === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveId(cat.id)}
                  style={{ '--tab-color': cat.color }}
                >
                  <span className="skills-tab-icon">{cat.icon}</span>
                  <span className="skills-tab-label">{cat.title}</span>
                  <span className="skills-tab-count">{cat.skills.length}</span>
                </button>
              ))}
            </div>

            {/* Skills panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                className="skills-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{ '--panel-color': active.color }}
              >
                <div className="skills-panel-header">
                  <span className="skills-panel-icon" style={{ color: active.color }}>{active.icon}</span>
                  <h3 style={{ color: active.color }}>{active.title}</h3>
                  <span className="skills-panel-total">{active.skills.length} skills</span>
                </div>
                <div className="skills-badges">
                  {active.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="skill-badge"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.025 }}
                      style={{ '--badge-color': active.color }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
