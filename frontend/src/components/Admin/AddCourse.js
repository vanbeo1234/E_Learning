import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modala'; // Sửa đúng path nếu cần

const AddCourse = () => {
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
  const [students, setStudents] = useState([]); // Danh sách học viên được chọn

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  const isEdit = false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddObjective = () => {
    setObjectives([...objectives, '']);
  };

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

  const handleStudentSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setStudents(selected);
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
      const fullData = {
        ...formData,
        objectives,
        lectures,
        students,
        coverImage,
      };
      console.log('Dữ liệu khóa học:', fullData);
      setShowSuccessModal(true);
    }
  };

  const handleCancel = () => setShowCancelModal(true);

  return (
    <div className="add-course-details">
      <div className="add-course-section">
        <h2>Mô tả</h2>
        <div className="add-course-input-group">
          <label htmlFor="course-name">Tên khóa học</label>
          <input
            type="text"
            id="course-name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
          <i className="fas fa-pencil-alt add-course-edit-icon"></i>
          {errors.courseName && <span className="error">{errors.courseName}</span>}
        </div>

        <div className="add-course-input-group">
          <label htmlFor="course-content">Nội dung</label>
          <textarea
            id="course-content"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <i className="fas fa-pencil-alt add-course-edit-icon"></i>
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
            style={{ display: 'none' }}
            id="cover-image-upload"
            onChange={handleCoverImageChange}
          />
        </div>
      </div>

      <div className="learning-time-section">
        <h2>Thời gian học</h2>
        <div className="learning-time-row">
          <div className="learning-time-input">
            <label>Ngày bắt đầu<span style={{ color: 'red' }}>*</span></label>
            <input
              type="date"
              value={formData.startDate}
              name="startDate"
              onChange={handleChange}
            />
            {errors.startDate && <span className="learning-time-error">{errors.startDate}</span>}
          </div>
          <div className="learning-time-input">
            <label>Ngày kết thúc<span style={{ color: 'red' }}>*</span></label>
            <input
              type="date"
              value={formData.endDate}
              name="endDate"
              onChange={handleChange}
            />
            {errors.endDate && <span className="learning-time-error">{errors.endDate}</span>}
          </div>
        </div>

        <div className="select-instructor-group">
  <label htmlFor="instructor">Chọn giảng viên</label>
  <select
    name="instructor"
    value={formData.instructor}
    onChange={handleChange}
    className="instructor-select"
  >
    <option value="">Chọn giảng viên</option>
    {instructors.map((instructor) => (
      <option key={instructor.id} value={instructor.name}>
        {instructor.name}
      </option>
    ))}
  </select>
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
        onConfirm={() => navigate('/')}
        onCancel={() => setShowSuccessModal(false)}
      />
      <Modal
        show={showCancelModal}
        title="Bạn chắc chắn muốn hủy?"
        onConfirm={() => navigate('/')}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
};

export default AddCourse;
