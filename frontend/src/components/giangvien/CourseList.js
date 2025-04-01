import React, { useState } from 'react';
import "./giangvien.css";
const CourseList = () => {
  const courses = [
    { title: 'SQL', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'Java', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'Python', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'C#', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'HTML', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'React', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'JavaScript', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'CSS', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'Node.js', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'Angular', duration: '3 tháng', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="courses">
      <h1 className="courses-title">Danh mục khóa học</h1>
      <div className="courses-container">
        <div className="course-row">{currentCourses.map((course, index) => (
            <article className="course" key={index}>
              <img alt={`Hình minh họa khóa học ${course.title}`} className="course-image" src={course.image} />
              <h2 className="course-title">{course.title}</h2>
              <div className="course-duration">
                <i className="fas fa-clock"></i>
                <span>{course.duration}</span>
              </div>
              <p className="course-text">Khóa học {course.duration}</p>
              <button className="course-button">Đọc thêm</button>
              <button className="course-button">Tham gia</button>
            </article>
          ))}
        </div>
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
  );
};

export default CourseList;