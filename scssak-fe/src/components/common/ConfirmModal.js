import React from 'react';
import '../../assets/styles/ConfirmModal.css';

const ConfirmModal = ({message, onConfirm, onCancel}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onCancel}>
            취소
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
