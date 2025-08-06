import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Navbar from './components/Navbar';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResults = (data) => {
    setResults(data);
    setError(null);
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Smart Image to Excel
            </h1>
            <p className="hero-subtitle">
              Transform your documents into structured Excel data with AI-powered OCR
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">📄</span>
                <span>Bills & Invoices</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🧾</span>
                <span>Receipts</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Excel Export</span>
              </div>
            </div>
          </div>
        </div>
        {/* Move functionality up here */}
        <div className="content-wrapper">
          <div className="two-column-layout">
            <div className="upload-column">
              <FileUpload 
                onResults={handleResults} 
                setLoading={setLoading}
                setError={setError}
                loading={loading}
              />
            </div>
            <div className="results-column">
              {loading && (
                <div className="loading-card">
                  <div className="loading-spinner"></div>
                  <h3>Processing your document...</h3>
                  <p>Our AI is extracting and structuring your data</p>
                </div>
              )}
              {error && (
                <div className="error-card">
                  <div className="error-icon">⚠️</div>
                  <h3>Processing Error</h3>
                  <p>{error}</p>
                </div>
              )}
              {results && <ResultsDisplay data={results} />}
            </div>
          </div>
        </div>
        {/* Business/marketing sections below */}
        <FeaturesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="app-footer business-footer">
        <div className="footer-content">
          <div className="footer-columns">
            <div>
              <h4>Smart Image to Excel</h4>
              <p>AI-powered document processing for business.</p>
            </div>
            <div>
              <h4>Contact</h4>
              <p>Email: info@smartimage2excel.com</p>
              <p>Phone: +1 (234) 567-890</p>
            </div>
            <div>
              <h4>Links</h4>
              <a href="#features">Features</a><br />
              <a href="#about">About</a><br />
              <a href="#contact">Contact</a>
            </div>
          </div>
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Smart Image to Excel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;