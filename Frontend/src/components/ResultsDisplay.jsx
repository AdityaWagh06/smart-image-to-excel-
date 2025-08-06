import { useState } from 'react';
import { exportToExcel } from '../services/api';
import SuccessMessage from './SuccessMessage';

export default function ResultsDisplay({ data }) {
  const [activeTab, setActiveTab] = useState('structured');
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportError(null);
      await exportToExcel(data.structuredData, data.docType);
      setShowSuccess(true);
    } catch (err) {
      setExportError(err.message);
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Extraction Results</h2>
        <button 
          onClick={handleExport}
          disabled={!data.structuredData || isExporting}
          className="export-button"
        >
          {isExporting ? 'Exporting...' : 'Download Excel File'}
        </button>
        {exportError && <div className="error-message">{exportError}</div>}
        {showSuccess && (
          <SuccessMessage 
            message="Excel file downloaded successfully!" 
            onClose={() => setShowSuccess(false)}
          />
        )}
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'structured' ? 'active' : ''}`}
          onClick={() => setActiveTab('structured')}
        >
          Structured Data
        </button>
        <button
          className={`tab-button ${activeTab === 'raw' ? 'active' : ''}`}
          onClick={() => setActiveTab('raw')}
        >
          Raw Text
        </button>
      </div>

      <div className="results-content">
        {activeTab === 'structured' ? (
          <StructuredDataView data={data.structuredData} />
        ) : (
          <RawTextView text={data.rawText} />
        )}
      </div>
    </div>
  );
}

function StructuredDataView({ data }) {
  if (!data) return <p>No structured data available</p>;

  return (
    <div className="structured-data">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="data-section">
          <h3>{key.replace(/_/g, ' ').toUpperCase()}</h3>
          {Array.isArray(value) ? (
            <table className="data-table">
              <thead>
                <tr>
                  {value.length > 0 && 
                    Object.keys(value[0]).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {value.map((item, idx) => (
                  <tr key={idx}>
                    {Object.values(item).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function RawTextView({ text }) {
  return (
    <div className="raw-text">
      <pre>{text}</pre>
    </div>
  );
}