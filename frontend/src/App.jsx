import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Dock from './components/Dock';
import Panel from './components/Panel';
import './App.css';

export const SECTIONS = [
  { id: 'about',        label: 'About',        emoji: '👤' },
  { id: 'education',    label: 'Education',    emoji: '🎓' },
  { id: 'experience',   label: 'Experience',   emoji: '💼' },
  { id: 'skills',       label: 'Skills',       emoji: '⚡' },
  { id: 'projects',     label: 'Projects',     emoji: '🚀' },
  { id: 'publications', label: 'Research',     emoji: '📄' },
  { id: 'contact',      label: 'Contact',      emoji: '✉️' },
];

const CONTENT = {
  about:        <About />,
  education:    <Education />,
  experience:   <Experience />,
  skills:       <Skills />,
  projects:     <Projects />,
  publications: <Publications />,
  contact:      <Contact />,
};

function App() {
  const [active, setActive] = useState(null);

  const open  = (id) => setActive(id);
  const close = (nextId) => nextId ? setActive(nextId) : setActive(null);

  return (
    <div className="app-root">
      {/* Always-visible hero */}
      <Hero onOpen={open} />

      {/* macOS-style dock */}
      <Dock sections={SECTIONS} active={active} onOpen={open} onClose={close} />

      {/* Sliding panel */}
      <AnimatePresence>
        {active && (
          <Panel key={active} id={active} onClose={close}>
            {CONTENT[active]}
          </Panel>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
