import React from 'react';
import { useLocation } from 'react-router-dom';

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
          <a href="/" className={getActivePage() === 'home' ? 'active' : ''}>
            <i className="fas fa-home"></i> Trang chủ
          </a>
        </li>
        <li>
          <a href="/feedback" className={getActivePage() === 'feedback' ? 'active' : ''}>
            <i className="fas fa-comments"></i> Phản hồi từ học viên
          </a>
        </li>
        <li>
          <a href="/create-course" className={getActivePage() === 'create-course' ? 'active' : ''}>
            <i className="fas fa-book"></i> Tạo khóa học
          </a>
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