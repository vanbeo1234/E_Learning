import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebars = () => {
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
          <Link to="/homeg" className={getActivePage() === 'homeg' ? 'active' : ''}>
            <i className="fas fa-home"></i> Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/feedback" className={getActivePage() === 'feedback' ? 'active' : ''}>
            <i className="fas fa-comments"></i> Phản hồi từ học viên
          </Link>
        </li>
        <li>
          <Link to="/courses" className={getActivePage() === 'courses' ? 'active' : ''}>
            <i className="fas fa-book"></i> Tạo khóa học
          </Link>
        </li>
        <li className="logout">
          <a href="#">
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebars;
