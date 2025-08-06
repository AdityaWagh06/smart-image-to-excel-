import React from 'react';

const features = [
  {
    icon: '🚀',
    title: 'AI-Powered OCR',
    description: 'Extracts data from images and PDFs with industry-leading accuracy.'
  },
  {
    icon: '📊',
    title: 'Excel Export',
    description: 'Instantly convert documents into structured Excel spreadsheets.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your documents are processed securely and never stored.'
  },
  {
    icon: '⚡',
    title: 'Fast & Reliable',
    description: 'Get results in seconds, 24/7, with enterprise-grade uptime.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <h2 className="section-title">Why Choose Smart Image to Excel?</h2>
        <div className="features-list">
          {features.map((f, idx) => (
            <div className="feature-card" key={idx}>
              <div className="feature-icon-large">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}