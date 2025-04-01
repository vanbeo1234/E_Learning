import React, { useState, useEffect } from "react";
import "./Trangchu.css";
import { Link } from "react-router-dom";

function ELearning() {
  const courses = [
    // Your course data...
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },

    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    

    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },

    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/img/OIP.jpg', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
  ];

  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

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

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
  <aside className="sidebar">  
    <div className="logo">E LEARNING</div>  
    <nav>  
        <Link to="/home" className="active-link">  
            <i className="fas fa-home" ></i> Trang chủ  
        </Link>  
        <Link to="/progress">  
            <i className="fas fa-chart-line"></i> Tiến độ  
        </Link>  
        <Link to="/posts">  
            <i className="fas fa-file-alt"></i> Bài viết  
        </Link>  
        <Link to="/my-courses">  
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

        <div className="banner">
          <img src={bannerImages[currentBannerIndex]} alt="Banner" className="banner-image" />
        </div>
        <div className="pagination">
          {bannerImages.map((_, index) => (
            <div key={index} className={index === currentBannerIndex ? 'active' : ''}></div>
          ))}
        </div>

        <section className="courses">
          <div className="courses-header">
            <h2>Khóa học</h2>
          </div>
          <div className="course-grid">
            {currentCourses.map((course, index) => (
              <div className="course-card" key={index}>
                <img src={course.image} alt={course.title} className="course-image" />
                <div className="course-header">
                  <span><i className="fas fa-code"></i> {course.category}</span>
                  <span><i className="fas fa-clock"></i> {course.duration}</span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))}
          </div>

          <div className="pagination-buttons">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={index + 1 === currentPage ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ELearning;