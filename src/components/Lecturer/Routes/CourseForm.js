import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Modal from '../Layouts/Modal';
import '../Style/giangvien.css';

const CourseForm = ({ isEdit, courseId }) => {
  const navigate = useNavigate(); // Use navigate for SPA routing
  const [courseName, setCourseName] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [lectures, setLectures] = useState([{ order: '', name: '', video: '', document: '', videoType: 'url' }]);
  const [coverImage, setCoverImage] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructor, setInstructor] = useState(''); // New state for instructor
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showInstructorModal, setShowInstructorModal] = useState(false); // New state for instructor modal
  const [errors, setErrors] = useState({});

  // Fetch course data for editing
  useEffect(() => {
    if (isEdit && courseId) {
      try {
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        const courseToEdit = storedCourses.find((course) => course.id === courseId);
        if (courseToEdit) {
          setCourseName(courseToEdit.name);
          setCourseContent(courseToEdit.description);
          setObjectives(courseToEdit.objectives);
          setLectures(courseToEdit.lectures.map((lecture) => ({
            ...lecture,
            videoType: lecture.videoType || 'url', // Ensure videoType is set
          })));
          setCoverImage(courseToEdit.image);
          setStartDate(courseToEdit.startDate);
          setEndDate(courseToEdit.endDate);
          setInstructor(courseToEdit.instructor || ''); // Set instructor
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    }
  }, [isEdit, courseId]);

  // Validate form
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
    if (!instructor) newErrors.instructor = 'Giảng viên là bắt buộc'; // Validate instructor

    lectures.forEach((lecture, index) => {
      if (!lecture.name.trim()) {
        newErrors[`lectureName${index}`] = 'Tên bài giảng là bắt buộc';
      }
      if (lecture.videoType === 'url' && !lecture.video.trim()) {
        newErrors[`lectureFile${index}`] = 'Phải cung cấp URL video hoặc tài liệu';
      } else if (lecture.videoType === 'file' && !lecture.video) {
        newErrors[`lectureFile${index}`] = 'Phải tải lên video hoặc tài liệu';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save course
  const handleSave = () => {
    if (validateForm()) {
      const newCourse = {
        id: isEdit ? courseId : Date.now(),
        name: courseName,
        description: courseContent,
        image: coverImage || 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg',
        objectives,
        lectures,
        startDate,
        endDate,
        creationDate: new Date().toISOString().split('T')[0],
        status: 'Hoạt động',
        instructor, // Use state value
        lessons: lectures.length,
      };

      try {
        const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        if (isEdit) {
          const updatedCourses = existingCourses.map((course) =>
            course.id === newCourse.id ? newCourse : course
          );
          localStorage.setItem('courses', JSON.stringify(updatedCourses));
        } else {
          localStorage.setItem('courses', JSON.stringify([...existingCourses, newCourse]));
        }
        setShowSuccessModal(true);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Lỗi khi lưu khóa học. Vui lòng thử lại.');
      }
    }
  };

  // Handle video file upload
  const handleFileUpload = (index, file) => {
    if (file) {
      const updatedLectures = [...lectures];
      updatedLectures[index].video = URL.createObjectURL(file); // Store URL instead of File
      setLectures(updatedLectures);
    }
  };

  // Instructor modal handler (placeholder implementation)
  const handleOpenInstructorModal = () => {
    setShowInstructorModal(true);
  };

  const handleSelectInstructor = (selectedInstructor) => {
    setInstructor(selectedInstructor);
    setShowInstructorModal(false);
  };

  // Navigation handlers
  const handleConfirmCancel = () => {
    navigate('/courses'); // Redirect to course list
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/courses'); // Redirect to course list
  };

  // Other unchanged handlers (summarized for brevity)
  const handleCancel = () => setShowCancelModal(true);
  const handleCloseCancelModal = () => setShowCancelModal(false);
  const handleAddObjective = () => setObjectives([...objectives, '']);
  const handleRemoveObjective = (index) => setObjectives(objectives.filter((_, i) => i !== index));
  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };
  const handleAddLecture = () => setLectures([...lectures, { order: '', name: '', video: '', document: '', videoType: 'url' }]);
  const handleRemoveLecture = (index) => setLectures(lectures.filter((_, i) => i !== index));
  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    setLectures(updatedLectures);
  };
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  return (
    <div className="course-details">
      {/* Mô tả Section (unchanged) */}
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

      {/* Mục tiêu Section (unchanged) */}
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

      {/* Nội dung khóa học Section */}
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
                type="number"
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
                value={lecture.videoType}
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
                  accept="video/*"
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

      {/* Ảnh bìa Section (unchanged) */}
      <div className="section">
        <h2>Ảnh bìa</h2>
        <div
          className="cover-image"
          style={{
            backgroundImage: coverImage ? `url(${coverImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={() => document.getElementById('cover-image-upload').click()}
        >
          {!coverImage && <i className="fas fa-plus upload-icon"></i>}
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            style={{ display: 'none' }}
            id="cover-image-upload"
          />
        </div>
      </div>

      {/* Thời gian học Section (unchanged) */}
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

      {/* Chọn giảng viên Section */}
      <div className="select-instructor-group">
        <h2>Chọn giảng viên <span style={{ color: 'red' }}>*</span></h2>
        <button className="select-instructor-btn" onClick={handleOpenInstructorModal}>
          {instructor || 'Chọn giảng viên'}
        </button>
        {errors.instructor && <span className="error">{errors.instructor}</span>}
      </div>

      {/* Footer Buttons */}
      <div className="footer-buttons">
        <button className="create-btn" onClick={handleSave}>
          {isEdit ? 'Cập nhật' : 'Tạo mới'}
        </button>
        <button className="cancel-btn" onClick={handleCancel}>Hủy</button>
      </div>

      {/* Modals */}
      <Modal
        show={showSuccessModal}
        title={isEdit ? 'Cập nhật khóa học thành công' : 'Thêm khóa học thành công'}
        onConfirm={handleCloseSuccessModal}
        onCancel={handleCloseSuccessModal}
      />
      <Modal
        show={showCancelModal}
        title="Bạn chắc chắn muốn hủy?"
        onConfirm={handleConfirmCancel}
        onCancel={handleCloseCancelModal}
      />
      {/* Placeholder Instructor Modal */}
      <Modal
        show={showInstructorModal}
        title="Chọn giảng viên"
        onCancel={() => setShowInstructorModal(false)}
      >
        {/* Placeholder: Replace with actual instructor selection UI */}
        <div>
          <button onClick={() => handleSelectInstructor('Giảng viên A')}>Giảng viên A</button>
          <button onClick={() => handleSelectInstructor('Giảng viên B')}>Giảng viên B</button>
        </div>
      </Modal>
    </div>
  );
};

export default CourseForm;