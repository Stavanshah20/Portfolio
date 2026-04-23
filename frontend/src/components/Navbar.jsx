import React from 'react';
import './Navbar.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' }
];

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="navbar-logo">Stavan Shah</a>
        <nav className="navbar-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="navbar-link">
              {item.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1Vvg2yxZp1ZyhIP12tb01d6u7Ys58MLjA/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="navbar-resume-btn"
          >
            View Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
