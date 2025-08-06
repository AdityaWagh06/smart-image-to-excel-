import React from 'react';

export default function SuccessMessage({ message, onClose }) {
  return (
    <div className="success-message">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <div className="success-text">
          <h4>Success!</h4>
          <p>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="success-close">
            ×
          </button>
        )}
      </div>
    </div>
  );
} 