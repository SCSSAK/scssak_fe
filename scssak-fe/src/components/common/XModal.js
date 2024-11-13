// XModal.js
import React from 'react';
import '../../styles/components/common/XModal.css';

const XModal = ({message, onClose}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default XModal;
