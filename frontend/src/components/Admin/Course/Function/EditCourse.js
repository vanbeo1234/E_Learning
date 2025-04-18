import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modala from '../../Modala';

const EditCourse = ({ courses, setCourses }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    courseName: '',
    instructor: '',
    lessons: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Hoạt động',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [objectives, setObjectives] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [errors, setErrors] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const course = courses.find(course => course.id === parseInt(id));
    if (course) {
      setFormData({
        courseName: course.courseName,
        instructor: course.instructor,
        lessons: course.lessons,
        description: course.description,
        startDate: course.startDate,
        endDate: course.endDate,
        status: course.status,
      });
      setCoverImage(course.coverImage);
      setObjectives(course.objectives || []);
      setLectures(course.lectures || []);
    }
  }, [id, courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddObjective = () => setObjectives([...objectives, '']);
  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const handleRemoveObjective = (index) => {
    const newObjectives = [...objectives];
    newObjectives.splice(index, 1);
    setObjectives(newObjectives);
  };

  const handleAddLecture = () => {
    setLectures([...lectures, { order: '', name: '', videoType: 'url', video: '', document: '' }]);
  };

  const handleLectureChange = (index, field, value) => {
    const newLectures = [...lectures];
    newLectures[index][field] = value;
    setLectures(newLectures);
  };

  const handleRemoveLecture = (index) => {
    const newLectures = [...lectures];
    newLectures.splice(index, 1);
    setLectures(newLectures);
  };

  const handleFileUpload = (index, file) => {
    const videoUrl = URL.createObjectURL(file);
    handleLectureChange(index, 'video', videoUrl);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const instructors = [
    { id: 1, name: 'Giảng viên A' },
    { id: 2, name: 'Giảng viên B' },
    { id: 3, name: 'Giảng viên C' },
    { id: 4, name: 'Giảng viên D' },
  ];

  const handleSave = () => {
    const newErrors = {};
    if (!formData.courseName) newErrors.courseName = 'Tên khóa học không được bỏ trống';
    if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    if (!formData.endDate) newErrors.endDate = 'Ngày kết thúc là bắt buộc';
    lectures.forEach((lecture, index) => {
      if (!lecture.name) newErrors[`lectureName${index}`] = 'Tên bài giảng không được để trống';
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updatedCourses = courses.map(course =>
        course.id === parseInt(id) ? { ...course, ...formData, objectives, lectures, coverImage } : course
      );
      setCourses(updatedCourses);
      setShowSuccessModal(true);
      // Redirect to the course management page after save
      setTimeout(() => {
        navigate('/course-management'); // Navigate to course management page after successful update
      }, 1500); // Optional delay before redirecting
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
    // Redirect to course management page after cancel
    setTimeout(() => {
      navigate('/course-management'); // Redirect to course management page after cancel
    }, 1500); // Optional delay before redirecting
  };

  return (
    <div className="edit-course-details">
      <div className="edit-course-section">
        <h2>Sửa thông tin khóa học</h2>

        <div className="edit-course-input-group">
          <label htmlFor="course-name">Tên khóa học</label>
          <input
            type="text"
            id="course-name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
          {errors.courseName && <span className="error">{errors.courseName}</span>}
        </div>

        <div className="edit-course-input-group">
          <label htmlFor="course-content">Nội dung</label>
          <textarea
            id="course-content"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="section">
        <h2>Mục tiêu</h2>
        <div className="add-new" onClick={handleAddObjective}>
          <i className="fas fa-plus"></i> <span>Thêm mới</span>
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
          <i className="fas fa-plus"></i> <span>Thêm mới</span>
        </div>
        {lectures.map((lecture, index) => (
          <div className="course-content" key={index}>
            <div className="input-group">
              <label>Thứ tự</label>
              <input
                type="text"
                placeholder="Nhập thứ tự"
                value={lecture.order}
                onChange={(e) => handleLectureChange(index, 'order', e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>
                Tên bài giảng <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập tên bài giảng"
                value={lecture.name}
                onChange={(e) => handleLectureChange(index, 'name', e.target.value)}
              />
              {errors[`lectureName${index}`] && (
                <span className="error">{errors[`lectureName${index}`]}</span>
              )}
            </div>

            <div className="input-group">
              <label>Chọn loại video</label>
              <select
                value={lecture.videoType || 'url'}
                onChange={(e) => handleLectureChange(index, 'videoType', e.target.value)}
              >
                <option value="url">Dán đường link video</option>
                <option value="file">Tải video lên</option>
              </select>
            </div>

            {lecture.videoType === 'url' ? (
              <div className="input-group">
                <label>Video URL</label>
                <input
                  type="text"
                  placeholder="Nhập URL video"
                  value={lecture.video}
                  onChange={(e) => handleLectureChange(index, 'video', e.target.value)}
                />
              </div>
            ) : (
              <div className="input-group">
                <label>Tải lên video</label>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(index, e.target.files[0])}
                />
              </div>
            )}

            <div className="input-group">
              <label>Tài liệu</label>
              <input
                type="text"
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
        <div className="cover-image" style={{ backgroundImage: coverImage ? `url(${coverImage})` : 'none' }}>
          {!coverImage && <i className="fas fa-plus upload-icon"></i>}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="cover-image-upload"
            onChange={(e) => setCoverImage(URL.createObjectURL(e.target.files[0]))}
          />
        </div>
      </div>

      <div className="learning-time-section">
        <h2>Thời gian học</h2>
        <div className="learning-time-row">
          <div className="learning-time-input">
            <label>Ngày bắt đầu</label>
            <input type="date" value={formData.startDate} name="startDate" onChange={handleChange} />
          </div>
          <div className="learning-time-input">
            <label>Ngày kết thúc</label>
            <input type="date" value={formData.endDate} name="endDate" onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="input-group">
        <label>Giảng viên</label>
        <input type="text" value={formData.instructor} onChange={handleChange} name="instructor" />
      </div>

      <div className="input-group">
        <label>Trạng thái</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Không hoạt động">Không hoạt động</option>
        </select>
      </div>

      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>Lưu</button>
        <button className="cancel-btn" onClick={handleCancel}>Hủy</button>
      </div>

      {showCancelModal && (
        <Modala
          type="cancel"
          title="Xác nhận hủy"
          content="Bạn có chắc chắn muốn hủy không?"
          onClose={() => setShowCancelModal(false)}
          onConfirm={() => navigate('/courses')}
        />
      )}

      {showSuccessModal && (
        <Modala
          type="success"
          title="Cập nhật thành công"
          content="Khóa học đã được cập nhật thành công!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default EditCourse;
