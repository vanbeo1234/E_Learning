import React, { useState } from 'react';
import "./giangvien.css";
const CourseTable = () => {
  const courses = [
    { id: 1, name: 'Java core', description: 'Java cơ bản' },
    // Add more courses as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 25; // Display 25 courses per page

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="search-bar">
        <input placeholder="Khóa học" type="text" />
        <button>Tìm kiếm</button>
      </div>
      <div className="add-course">
        <a href="/add-course"><button>Thêm khóa học mới</button></a>
      </div>
      <div className="table-container">
        <div className="table-controls">
          <label htmlFor="entries">Hiện</label>
          <select id="entries">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>danh mục</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khóa học</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td><a href="/course-info"><button>Xem thông tin</button></a></td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </div>
    </div>
  );
};

export default CourseTable;
