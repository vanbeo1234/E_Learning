import React, { useState } from "react";
import { Link } from "react-router-dom";

const LearningProgress = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const registeredCourses = [
    {
      image: '/logo192.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
      progress: 75,
    },
    {
      image: '/logo192.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Advanced",
      description: "Nâng cao kiến thức về Java, bao gồm các framework",
      progress: 50,
    },
    {
      image: '/logo192.png',
      category: "JavaScript",
      duration: "2 Month",
      title: "JavaScript Basics",
      description: "Học các khái niệm cơ bản về JavaScript",
      progress: 90,
    },
    {
      image: '/logo192.png',
      category: "JavaScript",
      duration: "2 Month",
      title: "JavaScript Basics",
      description: "Học các khái niệm cơ bản về JavaScript",
      progress: 60,
    },
  ];

  const coursesPerPage = 8;
  const totalPages = Math.ceil(registeredCourses.length / coursesPerPage);
  const currentCourses = registeredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="learningprogress-main-content">
      <section className="learningprogress-courses">
        <div className="learningprogress-courses-header">
          <h2>Tiến độ học tập</h2>
        </div>
        <div className="learningprogress-course-grid">
          {currentCourses.map((course, index) => (
            <div className="learningprogress-course-card" key={index}>
              <img src={course.image} alt={course.title} className="learningprogress-course-image" />
              <div className="learningprogress-course-header">
                <span><i className="fas fa-code"></i> {course.category}</span>
                <span><i className="fas fa-clock"></i> {course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="learningprogress-progress-bar">
                <div className="learningprogress-progress" style={{ width: `${course.progress}%`, backgroundColor: course.progress > 75 ? '#5ff4ff' : course.progress > 50 ? '#5ff4ff' : '#5ff4ff' }}></div>
              </div>
              <p>{course.progress}% hoàn thành</p>
            </div>
          ))}
        </div>

        <div className="learningprogress-pagination-buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? 'learningprogress-active' : ''}
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

export default LearningProgress;