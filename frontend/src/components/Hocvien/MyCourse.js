import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyCourse = () => {
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const registeredCourses = [
    // Your registered courses data...
    {
      image: '/logo512.png', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/logo512.png', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/logo512.png', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/logo512.png', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/logo512.png', // Correct path for public folder
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },

  ];

  const continuingCourses = [
    // Your continuing courses data...
    {
        image: '/img/OIP.jpg', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },    {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
                
  ];

  const completedCourses = [
    // Your completed courses data...
    {
        image: '/img/OIP.jpg', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },    {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
      {
        image: '/logo512.png', // Correct path for public folder
        category: "Java",
        duration: "3 Month",
        title: "Java Core",
        description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      },
              
  ];

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

  const totalPages = Math.ceil(registeredCourses.length / coursesPerPage);
  const currentCourses = registeredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="mycourse-main-content">
      <section className="mycourse-courses">
        <div className="mycourse-courses-header">
          <h2>Khóa học đã đăng ký</h2>
        </div>
        <div className="mycourse-course-grid">
          {currentCourses.map((course, index) => (
            <div className="mycourse-course-card" key={index}>
              <img src={course.image} alt={course.title} className="mycourse-course-image" />
              <div className="mycourse-course-header">
                <span><i className="fas fa-code"></i> {course.category}</span>
                <span><i className="fas fa-clock"></i> {course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>

        {/* Continue Courses Section */}
        <div className="mycourse-courses-header">
          <h2>Khóa học và tiếp tục</h2>
        </div>
        <div className="mycourse-course-grid">
          {continuingCourses.map((course, index) => (
            <div className="mycourse-course-card" key={index}>
              <img src={course.image} alt={course.title} className="mycourse-course-image" />
              <div className="mycourse-course-header">
                <span><i className="fas fa-code"></i> {course.category}</span>
                <span><i className="fas fa-clock"></i> {course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>

        {/* Completed Courses Section */}
        <div className="mycourse-courses-header">
          <h2>Khóa học đã hoàn thành</h2>
        </div>
        <div className="mycourse-course-grid">
          {completedCourses.map((course, index) => (
            <div className="mycourse-course-card" key={index}>
              <img src={course.image} alt={course.title} className="mycourse-course-image" />
              <div className="mycourse-course-header">
                <span><i className="fas fa-code"></i> {course.category}</span>
                <span><i className="fas fa-clock"></i> {course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>

        <div className="mycourse-pagination-buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? 'mycourse-active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MyCourse;