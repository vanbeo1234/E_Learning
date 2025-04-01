import React, { useState, useEffect } from "react";
import "./infocourse.css";
import { Link } from "react-router-dom";

const Tiendo = () => {
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const toggleAvatarMenu = () => {
    setAvatarMenuVisible(!avatarMenuVisible);
  };

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  const bannerImages = ['/img/OIP.jpg', '/img/OIP (1).jpg', '/img/OIP (2).jpg']; // Correct paths for public folder
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">E LEARNING</div>
        <nav>
          <Link to="/home">
            <i className="fas fa-home"></i> Trang chủ
          </Link>
          <Link to="/progress">
            <i className="fas fa-chart-line"></i> Tiến độ
          </Link>
          <Link to="/posts">
            <i className="fas fa-file-alt"></i> Bài viết
          </Link>
          <Link to="/my-courses" className="book">
            <i className="fas fa-book"></i> Khóa học của tôi
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Bạn muốn học?" />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="notification">
            <i className="fas fa-bell" onClick={toggleNotifications}></i>
            {notificationsVisible && (
              <div className="notifications-dropdown">
                <p>Thông báo 1</p>
                <p>Thông báo 2</p>
              </div>
            )}
            <div className="avatar" onClick={toggleAvatarMenu}></div>
            {avatarMenuVisible && (
              <div className="avatar-menu">
                <button>Trang cá nhân</button>
                <button>Hỗ trợ</button>
                <button>Cài đặt</button>
                <button>Đăng xuất</button>
              </div>
            )}
          </div>
        </header>
      </main>
    </div>
  );
};

export default InfoCourse;