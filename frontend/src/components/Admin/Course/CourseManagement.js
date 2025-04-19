import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adcm.css';
import ConfirmModal from './Function/Confirm';

const CourseManagement = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    courseName: '',
    instructor: '',
    creationDate: '',
    status: ''
  });

  const [courses, setCourses] = useState([
    {
      id: 1,
      courseName: 'Java Core',
      instructor: 'Nguyễn Văn A',
      lessons: 20,
      description: 'Cung cấp kiến thức cơ bản về OOP, design pattern',
      startDate: '2023-01-01',
      endDate: '2023-03-31',
      status: 'Hoạt động'
    },
    {
      id: 2,
      courseName: 'ReactJS',
      instructor: 'Trần Thị B',
      lessons: 15,
      description: 'Học cách xây dựng ứng dụng với ReactJS',
      startDate: '2023-02-01',
      endDate: '2023-04-30',
      status: 'Không hoạt động'
    }
  ]);

  const [filteredCourses, setFilteredCourses] = useState(courses);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredCourses(courses); // Initial load
  }, [courses]);

  const handleAddCourse = () => {
    navigate('/add-course');
  };

  const toggleSelectAll = () => {
    if (!selectAll) {
      setSelectedCourses(filteredCourses.map(course => course.id));
    } else {
      setSelectedCourses([]);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(courseId => courseId !== id) : [...prev, id]
    );
  };

  const handleEditCourse = (course) => {
    console.log('Navigating to edit course with ID:', course.id, 'Data:', course);
    navigate(`/edit-course/${course.id}`, { state: { course } });
  };

  const showConfirmModal = (action) => {
    setConfirmAction(() => action);
    setConfirmMessage(action === 'disable'
      ? 'Bạn có chắc muốn vô hiệu hóa các khóa học đã chọn?'
      : 'Bạn có chắc muốn kích hoạt lại các khóa học đã chọn?');
    setConfirmModalOpen(true);
  };

  const hideConfirmModal = () => {
    setConfirmModalOpen(false);
    setConfirmAction(null);
  };

  const handleConfirm = () => {
    const updated = courses.map(course =>
      selectedCourses.includes(course.id)
        ? { ...course, status: confirmAction === 'disable' ? 'Không hoạt động' : 'Hoạt động' }
        : course
    );
    setCourses(updated);
    setFilteredCourses(updated);
    setConfirmModalOpen(false);
    setSelectedCourses([]);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = courses.filter(course => {
      return (
        (!searchCriteria.courseName || course.courseName.toLowerCase().includes(searchCriteria.courseName.toLowerCase())) &&
        (!searchCriteria.instructor || course.instructor.toLowerCase().includes(searchCriteria.instructor.toLowerCase())) &&
        (!searchCriteria.creationDate || course.startDate === searchCriteria.creationDate) &&
        (!searchCriteria.status || course.status === searchCriteria.status)
      );
    });
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="course-management-container">
      <div className="course-management-content">
        <div className="course-management-card">
          <div className="course-management-search-form">
            <label htmlFor="courseName">Khóa học<input type="text" name="courseName" placeholder="Tên khóa học" value={searchCriteria.courseName} onChange={handleSearchChange} /></label>
            <label htmlFor="instructor">Giảng viên<input type="text" name="instructor" placeholder="Tên giảng viên" value={searchCriteria.instructor} onChange={handleSearchChange} /></label>
            <label htmlFor="creationDate">Ngày tạo<input type="date" name="creationDate" placeholder="Ngày tạo" value={searchCriteria.creationDate} onChange={handleSearchChange} /></label>
            <label htmlFor="status">Trạng thái<select name="status" value={searchCriteria.status} onChange={handleSearchChange}>
              <option value="">Tất cả</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Không hoạt động">Không hoạt động</option>
            </select></label>
          </div>

          <div className="course-management-action-buttons">
            <div>
              <button className="btn btn-green" onClick={handleAddCourse}>Thêm</button>
              <button className="btn btn-red" onClick={() => showConfirmModal('disable')}>Vô hiệu hóa</button>
              <button className="btn btn-yellow" onClick={() => showConfirmModal('enable')}>Kích hoạt</button>
              <button className="btn btn-blue" onClick={handleSearch}>Tìm kiếm</button>
            </div>
          </div>

          <div className="course-management-pagination">
            <div>
              <label htmlFor="itemsPerPage" style={{ padding: '5px' }}>Hiển thị danh mục</label>
              <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" id="selectAll" checked={selectAll} onChange={toggleSelectAll} /></th>
                  <th>STT</th>
                  <th>Mã khóa học</th>
                  <th>Tên khóa học</th>
                  <th>Tên giảng viên</th>
                  <th>Số bài học</th>
                  <th>Mô tả</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Trạng thái</th>
                  <th>Tính năng</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, index) => (
                  <tr key={course.id}>
                    <td><input type="checkbox" className="row-checkbox" checked={selectedCourses.includes(course.id)} onChange={() => handleCheckboxChange(course.id)} /></td>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{course.id}</td>
                    <td>{course.courseName}</td>
                    <td>{course.instructor}</td>
                    <td>{course.lessons}</td>
                    <td>{course.description}</td>
                    <td>{course.startDate}</td>
                    <td>{course.endDate}</td>
                    <td className="status">{course.status}</td>
                    <td>
                      <i className="fas fa-pencil-alt icon-edit" onClick={() => handleEditCourse(course)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-buttons">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>«</button>
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={currentPage === number + 1 ? 'active' : ''}
              >
                {number + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>»</button>
          </div>
        </div>
      </div>

      {isConfirmModalOpen && (
        <ConfirmModal
          message={confirmMessage}
          onConfirm={handleConfirm}
          onCancel={hideConfirmModal}
        />
      )}
    </div>
  );
};

export default CourseManagement;