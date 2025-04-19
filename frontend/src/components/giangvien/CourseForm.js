import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './giangvien.css';

const CourseForm = ({ isEdit, courseId }) => {
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

  // Hàm kiểm tra hợp lệ form
  const validateForm = () => {
    const newErrors = {};
    if (!courseName.trim()) newErrors.courseName = 'Tên khóa học là bắt buộc';
    if (!courseContent.trim()) newErrors.courseContent = 'Nội dung khóa học là bắt buộc';
    if (!startDate) newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    if (!endDate) newErrors.endDate = 'Ngày kết thúc là bắt buộc';
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.dateRange = 'Ngày bắt đầu phải trước ngày kết thúc';
    }
    if (!coverImage) newErrors.coverImage = 'Ảnh bìa là bắt buộc';
    if (objectives.length === 0) newErrors.objectives = 'Mục tiêu là bắt buộc';
    if (lectures.length === 0) newErrors.lectures = 'Ít nhất một bài giảng phải có';
    
    lectures.forEach((lecture, index) => {
      if (!lecture.name.trim()) {
        newErrors[`lectureName${index}`] = 'Tên bài giảng là bắt buộc';
      }
      if (!lecture.video && !lecture.document) {
        newErrors[`lectureFile${index}`] = 'Phải có ít nhất một file video hoặc tài liệu';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm lưu khóa học
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

  // Hàm thay đổi ảnh bìa
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  // Hàm thay đổi video
  const handleFileUpload = (index, e) => {
    const file = e.target.files[0];
    const updatedLectures = [...lectures];
    updatedLectures[index].video = file;
    setLectures(updatedLectures);
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
<div className="section">
  <h2>Nội dung khóa học</h2>
  <div className="add-new" onClick={handleAddLecture}>
    <i className="fas fa-plus"></i>
    <span>Thêm mới</span>
  </div>
  {lectures.map((lecture, index) => (
    <div className="course-content" key={index}>
      <div className="input-group">
        <label htmlFor={`order-${index}`}>Thứ tự</label>
        <input
          type="text"
          id={`order-${index}`}
          placeholder="Nhập thứ tự"
          value={lecture.order}
          onChange={(e) => handleLectureChange(index, 'order', e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor={`lecture-name-${index}`}>
          Tên bài giảng<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          id={`lecture-name-${index}`}
          placeholder="Nhập tên bài giảng"
          value={lecture.name}
          onChange={(e) => handleLectureChange(index, 'name', e.target.value)}
        />
        {errors[`lectureName${index}`] && (
          <span className="error">{errors[`lectureName${index}`]}</span>
        )}
      </div>
      <div className="input-group">
        <label htmlFor={`video-type-${index}`}>Chọn loại video</label>
        <select
          id={`video-type-${index}`}
          value={lecture.videoType || 'url'}
          onChange={(e) => handleLectureChange(index, 'videoType', e.target.value)}
        >
          <option value="url">Dán đường link video</option>
          <option value="file">Tải video lên</option>
        </select>
      </div>

      {lecture.videoType === 'url' ? (
        <div className="input-group">
          <label htmlFor={`video-url-${index}`}>Video URL</label>
          <input
            type="text"
            id={`video-url-${index}`}
            placeholder="Nhập đường dẫn video"
            value={lecture.video}
            onChange={(e) => handleLectureChange(index, 'video', e.target.value)}
          />
        </div>
      ) : (
        <div className="input-group">
          <label htmlFor={`video-upload-${index}`}>Tải lên video</label>
          <input
            type="file"
            id={`video-upload-${index}`}
            onChange={(e) => handleFileUpload(index, e.target.files[0])}
          />
          <i className="fas fa-upload upload-icon"></i>
        </div>
      )}

      <div className="input-group">
        <label htmlFor={`document-${index}`}>Tài liệu</label>
        <input
          type="text"
          id={`document-${index}`}
          placeholder="Tải lên tài liệu"
          value={lecture.document}
          onChange={(e) => handleLectureChange(index, 'document', e.target.value)}
        />
      </div>
      <div className="buttons">
        <button className="save-btn">Lưu</button>
        <button className="cancel-btn" onClick={() => handleRemoveLecture(index)}>
          Xóa
        </button>
      </div>
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

export default CourseForm;
