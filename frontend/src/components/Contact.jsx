import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import './Contact.css';

const contactItems = [
  { icon: <FaPhone />, label: "Phone", value: "+1 (934) 263-3028", href: "tel:+19342633028", accent: "#00E676" },
  { icon: <FaEnvelope />, label: "Personal", value: "stavanshah20@gmail.com", href: "mailto:stavanshah20@gmail.com", accent: "#00C8FF" },
  { icon: <FaEnvelope />, label: "School", value: "stavanbhavin.shah@stonybrook.edu", href: "mailto:stavanbhavin.shah@stonybrook.edu", accent: "#bb86fc" },
  { icon: <FaGithub />, label: "GitHub", value: "Stavanshah20", href: "https://github.com/Stavanshah20", accent: "#fff" },
  { icon: <FaLinkedin />, label: "LinkedIn", value: "stavan-shah", href: "https://linkedin.com/in/stavan-shah-682440230", accent: "#0A66C2" },
];

const Contact = () => {
  return (
    <section className="contact-container" id="contact">
      <motion.div
        className="section-title-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">get in touch</span>
        <h2 className="section-heading">Let&apos;s <span>Connect</span></h2>
      </motion.div>

      <motion.p
        className="contact-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Open to collaborations, opportunities, and interesting conversations.
      </motion.p>

      <div className="contact-grid">
        {contactItems.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="contact-card"
            style={{ '--card-accent': item.accent }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="contact-card-icon">{item.icon}</div>
            <div className="contact-card-info">
              <span className="contact-card-label">{item.label}</span>
              <span className="contact-card-value">{item.value}</span>
            </div>
            <div className="contact-card-glow" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
