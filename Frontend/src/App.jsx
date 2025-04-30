import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';

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
      <header className="app-header">
        <h1>Document Intelligence Processor</h1>
        <p>Upload bills, invoices or receipts to extract structured data</p>
      </header>

      <main className="app-main">
        <FileUpload 
          onResults={handleResults} 
          setLoading={setLoading}
          setError={setError}
        />
        
        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Processing document...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {results && <ResultsDisplay data={results} />}
      </main>

      <footer className="app-footer">
        <p>Document Processing System © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;