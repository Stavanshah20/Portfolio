import React from 'react';
import { motion } from 'framer-motion';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import './About.css';

const About = () => {
  return (
    <section className="about-container" id="about">
      <div className="about-content">
        <motion.div 
          className="about-images"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="image-wrapper img-secondary">
            <img src={photo2} alt="Stavan secondary" className="about-img" />
          </div>
          <div className="image-wrapper img-primary">
            <img src={photo1} alt="Stavan primary" className="about-img" />
          </div>
        </motion.div>

        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="section-title-block" style={{ alignItems: 'flex-start' }}>
            <span className="section-label">who i am</span>
            <h2 className="section-heading" style={{ textAlign: 'left' }}>About <span>Me</span></h2>
          </div>
          
          <p className="about-description">
            I am a Master's student in Computer Science at Stony Brook University, driven by the challenge of bridging scalable architecture with intelligent algorithms. My background seamlessly blends Full-Stack Software Engineering, Cloud Native Distributed Systems, and cutting-edge Applied Machine Learning.
          </p>

          <p className="about-description">
            When I'm not architecting fault-tolerant infrastructure or optimizing deep learning models, I enjoy exploring the bleeding edge of Generative AI, open-source development, and building robust digital experiences from the backend to the frontend.
          </p>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
