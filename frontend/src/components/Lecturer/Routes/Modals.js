import React from 'react';
import './giangvien.css';

const Modals = ({ show, title, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-buttons">
          <button className="modal-btn confirm-btn" onClick={onConfirm}>
            Xác nhận
          </button>
          <button className="modal-btn cancel-btn" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modals;