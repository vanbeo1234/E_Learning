import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../Style/giangvien.css';

function Homes() {
  const courses = [
    {
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
      <section className="homestudents-courses">
        <div className="homestudents-courses-header">
          <h2>Danh mục khóa học</h2>
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

export default Homes;
