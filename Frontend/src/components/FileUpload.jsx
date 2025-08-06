import { useState } from 'react';
import { extractText } from '../services/api';

const DOC_TYPES = [
  { value: 'bill', label: 'Bill' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'receipt', label: 'Receipt' },
  { value: 'generic', label: 'Generic Document' }
];

export default function FileUpload({ onResults, loading, setLoading, setError }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [docType, setDocType] = useState('bill');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await extractText(file, docType);
      onResults(result);
    } catch (err) {
      setError(err.message || 'Failed to process document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <h3 className="upload-title">Upload Your Document</h3>
      
      <div className="upload-grid">
        {/* Document Type Selection */}
        <div className="form-group">
          <label className="form-label">Document Type</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="form-control"
            disabled={loading}
          >
            {DOC_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label className="form-label">Select Document</label>
          <div className="file-upload-box">
            <label className="file-upload-label">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="file-input"
                disabled={loading}
              />
              <span className="upload-text">
                {file ? file.name : 'Click to browse or drag & drop'}
              </span>
              <span className="upload-icon">📁</span>
            </label>
          </div>
          {file && (
            <div className="file-info">
              <small>Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</small>
            </div>
          )}
        </div>

        {/* Process Button */}
        <div className="form-group">
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="process-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing Document...
              </>
            ) : (
              'Extract to Excel'
            )}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {preview && (
        <div className="preview-section">
          <h4 className="preview-title">Document Preview</h4>
          <div className="preview-image-container">
            <img src={preview} alt="Document preview" className="preview-image" />
          </div>
        </div>
      )}
    </div>
  );
}