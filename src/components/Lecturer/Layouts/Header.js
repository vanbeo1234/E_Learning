import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Thêm useNavigate
import '../Style/giangvien.css';

const Headers = ({ title, isSearch = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook để điều hướng

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xác nhận trước khi đăng xuất (tùy chọn)
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (!confirmLogout) return;

    // Xóa trạng thái đăng nhập (ví dụ: xóa token từ localStorage)
    localStorage.removeItem('authToken'); // Thay 'authToken' bằng key bạn đang dùng
    // Nếu bạn dùng context hoặc Redux, hãy dispatch action để xóa trạng thái ở đây

    // Điều hướng đến trang đăng nhập
    navigate('/login');
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
            <button onClick={handleLogout}>Đăng xuất</button> {/* Thêm onClick */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Headers;