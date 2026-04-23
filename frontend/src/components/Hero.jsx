import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown, FaLayerGroup, FaRobot, FaNetworkWired, FaBrain } from 'react-icons/fa';
import './Hero.css';

const ROLES = [
  { text: "Software Engineer",   color: "#00f0ff" },
  { text: "Data Scientist",      color: "#bb86fc" },
  { text: "AI / ML Engineer",    color: "#FF9900" },
  { text: "Data Analyst",        color: "#00E676" },
];

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  dur: Math.random() * 8 + 4,
  delay: Math.random() * 6,
}));

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Typewriter
  useEffect(() => {
    const target = ROLES[roleIdx].text;
    let i = displayed.length;
    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(p => (p + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  useEffect(() => {
    const move = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const currentColor = ROLES[roleIdx].color;

  return (
    <div className="hero-wrap" id="home">
      {/* Ambient orbs that follow mouse */}
      <motion.div className="hero-orb orb-a" style={{ x: springX, y: springY }} />
      <motion.div className="hero-orb orb-b" style={{ x: springX, y: springY }} />

      {/* Dot-grid canvas */}
      <div className="hero-dots" />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Diagonal accent lines */}
      <div className="hero-lines">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="hero-line" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

      {/* Floating side badges */}
      <motion.div className="floating-badge fb-1" animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <FaLayerGroup style={{ color: '#00f0ff' }} />
        <span>Full-Stack Apps</span>
      </motion.div>
      <motion.div className="floating-badge fb-2" animate={{ y: [0, 16, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <FaRobot style={{ color: '#bb86fc' }} />
        <span>AI Agents</span>
      </motion.div>
      <motion.div className="floating-badge fb-3" animate={{ y: [0, -18, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <FaNetworkWired style={{ color: '#FF9900' }} />
        <span>Distributed Systems</span>
      </motion.div>
      <motion.div className="floating-badge fb-4" animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
        <FaBrain style={{ color: '#00E676' }} />
        <span>ML / DL Models</span>
      </motion.div>

      <div className="hero-center">
        {/* Eyebrow */}
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow-dot" />
          Available for opportunities · MS CS @ Stony Brook
          <span className="eyebrow-dot" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Stavan<br />
          <span className="hero-name-accent">Shah</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          className="hero-role-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="hero-role-text" style={{ color: currentColor }}>
            {displayed}
            <span className="hero-cursor" style={{ background: currentColor }} />
          </span>
        </motion.div>

        {/* Role pills */}
        <motion.div
          className="hero-pills"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {ROLES.map((r, i) => (
            <span
              key={i}
              className={`hero-pill ${i === roleIdx ? 'active' : ''}`}
              style={{ '--pill-color': r.color }}
            >
              {r.text}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <a href="#projects" className="hero-cta-primary">
            See My Work
          </a>
          <a href="https://github.com/Stavanshah20" target="_blank" rel="noreferrer" className="hero-cta-ghost">
            <FaGithub /> GitHub
          </a>
          <a href="https://linkedin.com/in/stavan-shah-682440230" target="_blank" rel="noreferrer" className="hero-cta-ghost">
            <FaLinkedin /> LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <FaArrowDown />
      </motion.a>
    </div>
  );
};

export default Hero;
