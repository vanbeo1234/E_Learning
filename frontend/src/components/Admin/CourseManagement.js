import React, { useState } from 'react';

const CourseManagement = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 25 items per page
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    courseName: '',
    instructor: '',
    creationDate: '',
    status: ''
  });
  const [formData, setFormData] = useState({
    id: null,
    courseName: '',
    instructor: '',
    lessons: 0,
    description: '',
    startDate: '',
    endDate: '',
    status: 'Hoạt động'
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

  const toggleSelectAll = () => {
    if (!selectAll) {
      setSelectedCourses(courses.map(course => course.id));
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

  const handleAddCourse = () => {
    const newCourse = { ...formData, id: courses.length + 1 };
    setCourses(prevCourses => [...prevCourses, newCourse]);
    setAddModalOpen(false);
    resetForm();
  };

  const handleEditCourse = (course) => {
    setFormData(course);
    setEditModalOpen(true);
  };

  const handleUpdateCourse = () => {
    setCourses(prevCourses => prevCourses.map(course => course.id === formData.id ? formData : course));
    setEditModalOpen(false);
    resetForm();
  };

  const handleDeleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const showConfirmModal = (action) => {
    setCurrentAction(() => action);
    setConfirmModalOpen(true);
  };

  const hideConfirmModal = () => {
    setConfirmModalOpen(false);
    setCurrentAction(null);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Implement search logic here
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      courseName: '',
      instructor: '',
      lessons: 0,
      description: '',
      startDate: '',
      endDate: '',
      status: 'Hoạt động'
    });
  };

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const currentCourses = courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
              <button className="btn btn-green" onClick={() => setAddModalOpen(true)}>Thêm</button>
              <button className="btn btn-red" onClick={() => showConfirmModal(handleDeleteCourse)}>Vô hiệu hóa</button>
              <button className="btn btn-yellow" onClick={() => showConfirmModal(handleUpdateCourse)}>Kích hoạt</button>
              <button className="btn btn-blue" onClick={handleSearch}>Tìm kiếm</button>
            </div>
          </div>

          <div className="course-management-pagination">
            <div>
              <label htmlFor="itemsPerPage" style={{ padding: '5px' }}>Hiển thị</label>
              <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
              </select>
              <span style={{ padding: '5px' }}>danh mục</span>
            </div>
          </div>

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
            <button onClick={() => handlePageChange(1)}>&laquo;</button>
            {[...Array(totalPages).keys()].map(number => (
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

export default CourseManagement;
