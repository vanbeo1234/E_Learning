import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './giangvien.css';

const Feature = ({ isEdit, courseId }) => {
  const [courseName, setCourseName] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [lectures, setLectures] = useState([{ order: '', name: '', video: '', document: '' }]);
  const [coverImage, setCoverImage] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Nếu là chỉnh sửa, lấy thông tin khóa học từ localStorage
  useEffect(() => {
    if (isEdit && courseId) {
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const courseToEdit = storedCourses.find(course => course.id === courseId);
      if (courseToEdit) {
        setCourseName(courseToEdit.name);
        setCourseContent(courseToEdit.description);
        setObjectives(courseToEdit.objectives);
        setLectures(courseToEdit.lectures);
        setCoverImage(courseToEdit.image);
        setStartDate(courseToEdit.startDate);
        setEndDate(courseToEdit.endDate);
      }
    }
  }, [isEdit, courseId]);

  // Hàm thêm mục tiêu
  const handleAddObjective = () => {
    setObjectives([...objectives, '']);
  };

  // Hàm xóa mục tiêu
  const handleRemoveObjective = (index) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  // Hàm thay đổi mục tiêu
  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  // Hàm thêm bài giảng
  const handleAddLecture = () => {
    setLectures([...lectures, { order: '', name: '', video: '', document: '' }]);
  };

  // Hàm xóa bài giảng
  const handleRemoveLecture = (index) => {
    setLectures(lectures.filter((_, i) => i !== index));
  };

  // Hàm thay đổi thông tin bài giảng
  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    setLectures(updatedLectures);
  };
  
  const handleFileUpload = (index, file) => {
    const updatedLectures = [...lectures];
    updatedLectures[index].video = file; // Lưu file vào bài giảng
    setLectures(updatedLectures);
  };

  // Hàm thay đổi ảnh bìa
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  // Hàm kiểm tra hợp lệ form
  const validateForm = () => {
    const newErrors = {};
    if (!courseName.trim()) newErrors.courseName = 'Tên khóa học là bắt buộc';
    if (!courseContent.trim()) newErrors.courseContent = 'Nội dung là bắt buộc';
    if (!startDate) newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    if (!endDate) newErrors.endDate = 'Ngày kết thúc là bắt buộc';
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.dateRange = 'Ngày bắt đầu phải trước ngày kết thúc';
    }
    lectures.forEach((lecture, index) => {
      if (!lecture.name.trim()) {
        newErrors[`lectureName${index}`] = 'Tên bài giảng là bắt buộc';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newCourse = {
        id: isEdit ? courseId : Date.now(), // Giả lập ID, dùng ID cũ khi chỉnh sửa
        name: courseName,
        description: courseContent,
        image: coverImage || 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg',
        objectives,
        lectures,
        startDate,
        endDate,
        creationDate: new Date().toISOString().split('T')[0], // Thêm ngày tạo
        status: 'Hoạt động', // Có thể thay đổi tùy theo trạng thái khóa học
        instructor: 'Giảng viên', // Cập nhật tên giảng viên (nếu có)
        lessons: lectures.length // Số bài học
      };
  
      const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
  
      if (isEdit) {
        // Cập nhật khóa học
        const updatedCourses = existingCourses.map((course) =>
          course.id === newCourse.id ? newCourse : course
        );
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
      } else {
        // Thêm khóa học mới
        localStorage.setItem('courses', JSON.stringify([...existingCourses, newCourse]));
      }
  
      setShowSuccessModal(true);
    }
  };  
  
  // Hàm hủy bỏ và hiển thị modal xác nhận
  const handleCancel = () => {
    setShowCancelModal(true);
  };

  // Hàm xác nhận hủy bỏ
  const handleConfirmCancel = () => {
    window.history.back(); // Trở lại trang trước đó
  };

  // Hàm đóng modal thành công
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // Hàm đóng modal hủy bỏ
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  return (
    <div className="course-details">
      <div className="section">
        <h2>Mô tả</h2>
        <div className="input-group">
          <label htmlFor="course-name">Tên khóa học<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="course-name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          {errors.courseName && <span className="error">{errors.courseName}</span>}

        </div>
        <div className="input-group">
          <label htmlFor="course-content">Nội dung<span style={{ color: 'red' }}>*</span></label>
          <textarea
            id="course-content"
            value={courseContent}
            onChange={(e) => setCourseContent(e.target.value)}
          />
          {errors.courseContent && <span className="error">{errors.courseContent}</span>}
        </div>
      </div>
      <div className="section">
        <h2>Mục tiêu</h2>
        <div className="add-new" onClick={handleAddObjective}>
          <i className="fas fa-plus"></i>
          <span>Thêm mới</span>
        </div>
        {objectives.map((objective, index) => (
          <div className="input-group" key={index}>
            <input
              type="text"
              placeholder="Nhập mục tiêu"
              value={objective}
              onChange={(e) => handleObjectiveChange(index, e.target.value)}
            />
            <button className="remove-btn" onClick={() => handleRemoveObjective(index)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Nội dung khóa học</h2>
        <div className="add-new" onClick={handleAddLecture}>
          <i className="fas fa-plus"></i>
          <span>Thêm mới</span>
        </div>
        {lectures.map((lecture, index) => (
          <div key={index} className="input-group">
            <input
              type="text"
              placeholder="Tên bài giảng"
              value={lecture.name}
              onChange={(e) => handleLectureChange(index, 'name', e.target.value)}
            />
            <button className="remove-btn" onClick={() => handleRemoveLecture(index)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Ảnh bìa</h2>
        <div
          className="cover-image"
          style={{
            backgroundImage: coverImage ? `url(${coverImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => document.getElementById("cover-image-upload").click()}
        >
          {!coverImage && <i className="fas fa-plus upload-icon"></i>}
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            style={{ display: "none" }}
            id="cover-image-upload"
          />
        </div>
      </div>
      <div className="learning-time-section">
        <h2>Thời gian học</h2>
        <div className="learning-time-row">
          <div className="learning-time-input">
            <label htmlFor="start-date">Ngày bắt đầu<span style={{ color: 'red' }}>*</span></label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && <span className="learning-time-error">{errors.startDate}</span>}
          </div>
          <div className="learning-time-input">
            <label htmlFor="end-date">Ngày kết thúc<span style={{ color: 'red' }}>*</span></label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && <span className="learning-time-error">{errors.endDate}</span>}
          </div>
        </div>
      </div>
      <div className="footer-buttons">
        <button className="create-btn" onClick={handleSave}>
          {isEdit ? 'Cập nhật' : 'Tạo mới'}
        </button>
        <button className="cancel-btn" onClick={handleCancel}>Hủy</button>
      </div>

      <Modal
        show={showSuccessModal}
        title={isEdit ? 'Cập nhật khóa học thành công' : 'Thêm khóa học thành công'}
        onConfirm={() => (window.location.href = '/')} // Chuyển hướng về trang danh sách khóa học
        onCancel={() => setShowSuccessModal(false)}
      />
      <Modal
        show={showCancelModal}
        title="Bạn chắc chắn muốn hủy?"
        onConfirm={() => (window.location.href = '/')}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
};

export default Feature;
