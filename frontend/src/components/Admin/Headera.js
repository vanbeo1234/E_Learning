import React, { useState } from 'react';
import './admin.css';
const Headersa = ({ title, isSearch = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="header">
      {isSearch ? <input type="text" placeholder="Tên khóa học" /> : <h1>{title}</h1>}
      <div className="user-info">
        <i className="fas fa-bell"></i>
        <img alt="User profile" src="https://placehold.co/40x40" onClick={toggleDropdown} />
        <span>Duc Daddy</span>
        {showDropdown && (
          <div className="dropdown-menu">
            <button>Trang cá nhân</button>
            <button>Hỗ trợ</button>
            <button>Cài đặt</button>
            <button>Đăng xuất</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Headersa;