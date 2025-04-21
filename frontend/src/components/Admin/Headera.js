import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Đảm bảo rằng Link được import từ react-router-dom
import './admin.css';

const Headera = ({ title, isSearch = false }) => {
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
            <Link to="/login">
              <button>Đăng xuất</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Headera;
