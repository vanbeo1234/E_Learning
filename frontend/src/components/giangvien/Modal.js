import React from 'react';
import "./giangvien.css";
const Modal = ({ show, title, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="notification-box">
        <h1>{title}</h1>
        <div className="button-container">
          <button className="confirm" onClick={onConfirm}>Xác nhận</button>
          <button className="cancel" onClick={onCancel}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;