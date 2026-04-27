import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Dock.css';

const DockItem = ({ section, isActive, onOpen, onClose, mouseX }) => {
  const ref = { current: null };

  const distance = useMotionValue(200);
  const widthSync = useTransform(distance, [-150, 0, 150], [52, 80, 52]);
  const width = useSpring(widthSync, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    distance.set(mouseX.get() - center);
  };

  return (
    <motion.button
      className={`dock-item ${isActive ? 'dock-item--active' : ''}`}
      style={{ width, height: width }}
      onMouseMove={handleMouseMove}
      onClick={() => isActive ? onClose() : onOpen(section.id)}
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
          <DockItem
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

export default Dock;
