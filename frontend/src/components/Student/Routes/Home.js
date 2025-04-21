import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Style/hocvien.css';

function Home() {
  const courses = [
    {
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },{
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
    {
      image: '/logo512.png',
      category: "Python",
      duration: "2 Month",
      title: "Python Foundation",
      description: "Học cú pháp cơ bản, xử lý dữ liệu và lập trình hướng đối tượng",
    },
    {
      image: '/logo512.png',
      category: "JavaScript",
      duration: "1.5 Month",
      title: "JavaScript ES6",
      description: "Nắm vững cú pháp hiện đại, DOM, event, async/await",
    },
    {
      image: '/logo512.png',
      category: "PHP",
      duration: "2 Month",
      title: "PHP Web Dev",
      description: "Phát triển web với PHP, MySQL và Laravel framework",
    },
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const bannerImages = ['/logo512.png', '/logo512.png', '/img/OIP (2).jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ✅ Hàm trả về icon dựa vào category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Java":
        return <i className="fab fa-java"></i>;
      case "Python":
        return <i className="fab fa-python"></i>;
      case "JavaScript":
        return <i className="fab fa-js"></i>;
      case "PHP":
        return <i className="fab fa-php"></i>;
      default:
        return <i className="fas fa-code"></i>;
    }
  };

  return (
    <main className="homestudents-main-content">
      <div className="homestudents-banner">
        <img src={bannerImages[currentBannerIndex]} alt="Banner" className="homestudents-banner-image" />
      </div>
      <div className="homestudents-pagination">
        {bannerImages.map((_, index) => (
          <div key={index} className={index === currentBannerIndex ? 'homestudents-active' : ''}></div>
        ))}
      </div>

      <section className="homestudents-courses">
        <div className="homestudents-courses-header">
          <h2>Khóa học</h2>
        </div>
        <div className="homestudents-course-grid">
          {currentCourses.map((course, index) => (
            <Link to={`/course/${index}`} key={index} className="homestudents-course-card-link">
              <div className="homestudents-course-card">
                <img src={course.image} alt={course.title} className="homestudents-course-image" />
                <div className="homestudents-course-header">
                  <span>{getCategoryIcon(course.category)} {course.category}</span>
                  <span><i className="fas fa-clock"></i> {course.duration}</span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="homestudents-pagination-buttons">
  <button
    onClick={() => handlePageChange(1)}
    disabled={currentPage === 1}
    className={currentPage === 1 ? 'homestudents-disabled' : ''}
  >
    «
  </button>
  {[...Array(totalPages).keys()].map((number) => (
    <button
      key={number + 1}
      onClick={() => handlePageChange(number + 1)}
      className={currentPage === number + 1 ? 'homestudents-active' : ''}
    >
      {number + 1}
    </button>
  ))}
  <button
    onClick={() => handlePageChange(totalPages)}
    disabled={currentPage === totalPages}
    className={currentPage === totalPages ? 'homestudents-disabled' : ''}
  >
    »
  </button>
</div>
      </section>
    </main>
    
  );

  
}

export default Home;
