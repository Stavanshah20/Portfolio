import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Dock.css';

const DockItem = ({ section, isActive, onOpen, onClose, mouseX }) => {
  const ref = useRef(null);

  const distance = useMotionValue(Infinity);
  const widthSync = useTransform(distance, [-150, 0, 150], [52, 80, 52]);
  const width = useSpring(widthSync, { stiffness: 300, damping: 25 });

  return (
    <motion.button
      ref={ref}
      className={`dock-item ${isActive ? 'dock-item--active' : ''}`}
      style={{ width, height: width }}
      onClick={() => isActive ? onClose(null) : onOpen(section.id)}
      title={section.label}
      whileTap={{ scale: 0.9 }}
    >
      <span className="dock-emoji">{section.emoji}</span>
      <span className="dock-label">{section.label}</span>
      {isActive && <span className="dock-dot" />}
    </motion.button>
  );
};

const Dock = ({ sections, active, onOpen, onClose }) => {
  const mouseX = useMotionValue(Infinity);

  // Propagate mouseX to all items via a shared motion value
  // Each item reads it via useTransform based on its own ref position
  return (
    <motion.div
      className="dock-wrap"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 28 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div className="dock-bar">
        {sections.map((s) => (
          <DockItemConnected
            key={s.id}
            section={s}
            isActive={active === s.id}
            onOpen={onOpen}
            onClose={onClose}
            mouseX={mouseX}
          />
        ))}

        <div className="dock-divider" />

        <a
          href="https://drive.google.com/file/d/1R74IY1Hi0Rwn_Ppu79H36dhAzBr2299x/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="dock-resume"
          title="View Resume"
        >
          <span className="dock-emoji">📋</span>
          <span className="dock-label">Resume</span>
        </a>
      </div>
    </motion.div>
  );
};

// Separate component so each item has its own ref + distance tracking
const DockItemConnected = ({ section, isActive, onOpen, onClose, mouseX }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return Infinity;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return val - center;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [52, 80, 52]);
  const width = useSpring(widthSync, { stiffness: 300, damping: 28, mass: 0.5 });

  return (
    <motion.button
      ref={ref}
      className={`dock-item ${isActive ? 'dock-item--active' : ''}`}
      style={{ width, height: width }}
      onClick={() => isActive ? onClose(null) : onOpen(section.id)}
      title={section.label}
      whileTap={{ scale: 0.9 }}
    >
      <span className="dock-emoji">{section.emoji}</span>
      <span className="dock-label">{section.label}</span>
      {isActive && <span className="dock-dot" />}
    </motion.button>
  );
};

export default Dock;
