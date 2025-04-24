import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/hocvien.css';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();

  const getActivePage = () => {
    const path = location.pathname.slice(1);
    return path || 'home';
  };

  return (
    <div className="sidebar">
      <h2>E LEARNING</h2>
      <ul>
        <li>
          <Link to="/home" className={getActivePage() === 'home' ? 'active' : ''}>
            <i className="fas fa-home"></i> Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/my-course" className={getActivePage() === 'my-course' ? 'active' : ''}>
            <i className="fas fa-book"></i> Khóa học của tôi
          </Link>
        </li>
        <li>
          <Link to="/progress" className={getActivePage() === 'progress' ? 'active' : ''}>
            <i className="fas fa-chart-line"></i> Tiến độ học tập
          </Link>
        </li>
        <li>
          <Link to="/article" className={getActivePage() === 'article' ? 'active' : ''}>
            <i className="fas fa-newspaper"></i> Bài viết
          </Link>
        </li>
        <li className="logout">
          <button onClick={handleLogout} className="logout-button">
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;