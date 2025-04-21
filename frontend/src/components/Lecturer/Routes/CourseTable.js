import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom
import '../Style/giangvien.css';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    courseName: '',
    creationDate: '',
  });
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const coursesPerPage = itemsPerPage;

  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(storedCourses);
    setFilteredCourses(storedCourses);
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    let filtered = [...courses];
  
    if (searchCriteria.courseName.trim() !== '') {
      const term = searchCriteria.courseName.toLowerCase();
      filtered = filtered.filter((course) =>
        course.courseName && course.courseName.toLowerCase().includes(term)
      );
    }
  
    if (searchCriteria.creationDate) {
      filtered = filtered.filter((course) =>
        course.creationDate?.startsWith(searchCriteria.creationDate)
      );
    }
  
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };
  
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on pressing Enter
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSelectAll = () => {
    if (selectedCourses.length === currentCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(currentCourses.map((course) => course.id));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((courseId) => courseId !== id) : [...prev, id]
    );
  };

  const handleEditCourse = (course) => {
    navigate(`/edit-course/${course.id}`); // Use navigate to edit the course
  };

  const handleAddCourse = () => {
    navigate('/create-course'); // Use navigate to add a new course
  };

  return (
    <div className="course-table-container">
      <div className="course-table-content">
        <div className="course-table-card">
          {/* Form tìm kiếm */}
          <div className="course-table-search-form">
            <label htmlFor="courseName">Khóa học
              <input
                type="text"
                name="courseName"
                placeholder="Tên khóa học"
                value={searchCriteria.courseName || ''}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress} // Trigger search on Enter
              />
            </label>
            <label htmlFor="creationDate">Ngày tạo
              <input
                type="date"
                name="creationDate"
                value={searchCriteria.creationDate}
                onChange={handleSearchChange}
              />
            </label>
          </div>

          {/* Nút hành động */}
          <div className="course-table-action-buttons">
            <div>
              <button className="btn btn-green" onClick={handleAddCourse}>
                Thêm khóa học
              </button>
              <button className="btn btn-blue" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Pagination: items per page */}
          <div className="course-table-pagination">
            <div>
              <label htmlFor="itemsPerPage" style={{ padding: '5px' }}>Hiển thị danh mục</label>
            </div>
          </div>

          {/* Bảng dữ liệu */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" id="selectAll" onClick={toggleSelectAll} /></th>
                  <th>STT</th>
                  <th>Mã khóa học</th>
                  <th>Tên khóa học</th>
                  <th>Tên giảng viên</th>
                  <th>Số bài học</th>
                  <th>Mô tả</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Tính năng</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, index) => (
                  <tr key={course.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="row-checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleCheckboxChange(course.id)}
                      />
                    </td>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{course.id}</td>
                    <td>{course.courseName}</td>
                    <td>{course.instructor}</td>
                    <td>{course.lessons}</td>
                    <td>{course.description}</td>
                    <td>{course.startDate}</td>
                    <td>{course.endDate}</td>
                    <td>
                      <i className="fas fa-pencil-alt icon-edit" onClick={() => handleEditCourse(course)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nút phân trang */}
          <div className="pagination-buttons">
            <button onClick={() => handlePageChange(1)}>&laquo;</button>
            {[...Array(totalPages).keys()].map((number) => (
              <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
                {number + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(totalPages)}>&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
