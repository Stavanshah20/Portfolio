import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SECTIONS } from '../App';
import './Panel.css';

const Panel = ({ id, onClose, children }) => {
  const section = SECTIONS.find(s => s.id === id);
  const idx = SECTIONS.findIndex(s => s.id === id);
  const bodyRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [prevId, setPrevId] = useState(id);
  const [dir, setDir] = useState(1);

  const prev = idx > 0 ? SECTIONS[idx - 1] : null;
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;

  // Track scroll progress
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onScroll = () => {
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100;
      setScrollPct(isNaN(pct) ? 0 : pct);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [id]);

  // Reset scroll on section change
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    setScrollPct(0);
  }, [id]);

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="panel-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => onClose(null)}
      />

      {/* Sheet */}
      <motion.div
        className="panel-sheet"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="panel-progress"
          style={{ scaleX: scrollPct / 100, transformOrigin: 'left' }}
        />

        {/* Header */}
        <div className="panel-header">
          <div className="panel-header-left">
            <motion.span
              key={id + '-emoji'}
              className="panel-emoji"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {section?.emoji}
            </motion.span>
            <motion.span
              key={id + '-title'}
              className="panel-title"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {section?.label}
            </motion.span>
          </div>

          {/* Section nav arrows */}
          <div className="panel-nav">
            <button
              className="panel-nav-btn"
              onClick={() => prev && onClose(prev.id)}
              disabled={!prev}
              title={prev?.label}
            >
              <FaChevronLeft size={11} />
            </button>
            <span className="panel-nav-count">{idx + 1} / {SECTIONS.length}</span>
            <button
              className="panel-nav-btn"
              onClick={() => next && onClose(next.id)}
              disabled={!next}
              title={next?.label}
            >
              <FaChevronRight size={11} />
            </button>
          </div>

          <button className="panel-close" onClick={() => onClose(null)} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        {/* Section pills */}
        <div className="panel-pills">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`panel-pill ${s.id === id ? 'active' : ''}`}
              onClick={() => s.id !== id && onClose(s.id)}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="panel-body" ref={bodyRef}>
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </div>

        {/* Bottom nav */}
        <div className="panel-footer">
          {prev ? (
            <button className="panel-footer-btn" onClick={() => onClose(prev.id)}>
              <FaChevronLeft size={10} /> {prev.emoji} {prev.label}
            </button>
          ) : <span />}
          {next ? (
            <button className="panel-footer-btn" onClick={() => onClose(next.id)}>
              {next.emoji} {next.label} <FaChevronRight size={10} />
            </button>
          ) : <span />}
        </div>
      </motion.div>
    </>
  );
};

export default Panel;
