import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaQuoteLeft } from 'react-icons/fa';
import './Publications.css';

const publicationsData = [
  {
    title: "An Analytical Survey of Energy Efficiency in IoT Paradigm",
    authors: "Stavan Shah",
    journal: "ELSEVIER",
    year: "2022",
    abstract: "A comprehensive analytical survey evaluating energy-efficient protocols in the Internet of Things (IoT) paradigm. Focused on Wireless Sensor Networks (WSN), routing algorithms, and applications in remote sensing.",
    tags: ["IoT", "Algorithms", "Remote Sensing", "WSN"],
    link: "https://www.sciencedirect.com/science/article/pii/S1877050922016088",
    accent: "#00C8FF",
    index: "01"
  },
  {
    title: "Atmospheric Correction of Sentinel-2 Images using Deep Learning",
    authors: "Stavan Shah",
    journal: "SPRINGER",
    year: "2024",
    abstract: "Constructed deep learning pix2pix and GAN models for atmospheric correction of Sentinel-2 satellite images, building scalable data pipelines using TensorFlow, PyTorch, and OpenCV to achieve 96% accuracy.",
    tags: ["Deep Learning", "GAN", "Pix2pix", "Satellite Imagery"],
    link: "https://www.researchgate.net/publication/390544323_Atmospheric_Correction_of_Sentinel-2_Images_Using_Deep_Learning",
    accent: "#bb86fc",
    index: "02"
  },
  {
    title: "ML-Based Forecasting Systems Review",
    authors: "Stavan Shah",
    journal: "SPRINGER",
    year: "2024",
    abstract: "Analyzed and evaluated ML inference pipelines for large-scale forecasting systems, benchmarking models (XGBoost, LSTM, CNN, GPR) using structured evaluation metrics, and studying scalability, latency, and throughput tradeoffs.",
    tags: ["Machine Learning", "Time Series", "Benchmarking", "LSTM"],
    link: "https://link.springer.com/chapter/10.1007/978-981-96-9196-8_39",
    accent: "#FF9900",
    index: "03"
  }
];

const Publications = () => {
  const [active, setActive] = useState(0);
  const pub = publicationsData[active];

  return (
    <section className="pub-container" id="publications">
      <motion.div
        className="section-title-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">research</span>
        <h2 className="section-heading">Academic <span>Research</span></h2>
      </motion.div>

      <div className="pub-layout">
        {/* Left: index list */}
        <motion.div
          className="pub-index"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {publicationsData.map((p, i) => (
            <button
              key={i}
              className={`pub-index-item ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
              style={{ '--item-accent': p.accent }}
            >
              <span className="pub-index-num">{p.index}</span>
              <div className="pub-index-info">
                <span className="pub-index-journal">{p.journal} · {p.year}</span>
                <span className="pub-index-title">{p.title}</span>
              </div>
              <div className="pub-index-bar" />
            </button>
          ))}
        </motion.div>

        {/* Right: detail panel */}
        <motion.div
          key={active}
          className="pub-detail"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ '--detail-accent': pub.accent }}
        >
          <div className="pub-detail-header">
            <div className="pub-detail-meta">
              <span className="pub-detail-journal" style={{ color: pub.accent }}>{pub.journal}</span>
              <span className="pub-detail-year">{pub.year}</span>
            </div>
            <h3 className="pub-detail-title">{pub.title}</h3>
            <p className="pub-detail-author">{pub.authors}</p>
          </div>

          <div className="pub-detail-body">
            <FaQuoteLeft className="pub-quote-icon" style={{ color: pub.accent }} />
            <p className="pub-detail-abstract">{pub.abstract}</p>
          </div>

          <div className="pub-detail-tags">
            {pub.tags.map((t, i) => (
              <span key={i} className="pub-detail-tag" style={{ borderColor: pub.accent + '55', color: pub.accent }}>
                {t}
              </span>
            ))}
          </div>

          <a
            href={pub.link}
            target="_blank"
            rel="noreferrer"
            className="pub-detail-link"
            style={{ background: pub.accent + '18', borderColor: pub.accent + '55', color: pub.accent }}
          >
            Read Full Paper <FaExternalLinkAlt size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
