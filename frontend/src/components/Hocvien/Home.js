import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const courses = [
    // Your course data...
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
    },    {
      image: '/logo512.png', // Correct path for public folder
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
    },    {
      image: '/logo512.png', // Correct path for public folder
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
    },    {
      image: '/logo512.png', // Correct path for public folder
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
  ];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const bannerImages = ['/logo512.png', '/logo512.png', '/img/OIP (2).jpg']; // Correct paths for public folder
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
                  <span><i className="fas fa-code"></i> {course.category}</span>
                  <span><i className="fas fa-clock"></i> {course.duration}</span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="homestudents-pagination-buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? 'homestudents-active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;