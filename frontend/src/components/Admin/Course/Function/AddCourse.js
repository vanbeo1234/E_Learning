// src/components/AddCourse.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modala from './Modala';
import '../../Style/adcm.css';
import { v4 as uuidv4 } from 'uuid';
import { useCourseContext } from '../Function/Context/CourseContext';

const AddCourse = () => {
  const { addCourse } = useCourseContext();
  const navigate = useNavigate();

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
  const [students, setStudents] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [instructorPage, setInstructorPage] = useState(1);
  const instructorsPerPage = 5;

  useEffect(() => {
    if (isSaved && showSuccessModal) {
      navigate('/course-management', { state: { newCourseAdded: true } });
    }
  }, [isSaved, showSuccessModal, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.courseName.trim()) newErrors.courseName = 'Tên khóa học không được bỏ trống';
    else if (formData.courseName.length > 100) newErrors.courseName = 'Tên khóa học không được vượt quá 100 ký tự';

    if (!formData.instructor) newErrors.instructor = 'Vui lòng chọn một giảng viên';

    if (!formData.lessons) newErrors.lessons = 'Số lượng bài học không được bỏ trống';
    else if (isNaN(formData.lessons) || Number(formData.lessons) <= 0) newErrors.lessons = 'Số lượng bài học phải là số dương';

    if (!formData.description.trim()) newErrors.description = 'Nội dung không được bỏ trống';
    else if (formData.description.length > 500) newErrors.description = 'Nội dung không được vượt quá 500 ký tự';

    if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    if (!formData.endDate) newErrors.endDate = 'Ngày kết thúc là bắt buộc';
    else if (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    objectives.forEach((objective, index) => {
      if (!objective.trim()) newErrors[`objective${index}`] = 'Mục tiêu không được để trống';
      else if (objective.length > 200) newErrors[`objective${index}`] = 'Mục tiêu không được vượt quá 200 ký tự';
    });

    if (lectures.length === 0) {
      newErrors.lectures = 'Phải có ít nhất một bài giảng';
    } else {
      lectures.forEach((lecture, index) => {
        if (!lecture.order) newErrors[`lectureOrder${index}`] = 'Thứ tự bài giảng không được để trống';
        else if (isNaN(lecture.order) || Number(lecture.order) <= 0) newErrors[`lectureOrder${index}`] = 'Thứ tự phải là số dương';

        if (!lecture.name.trim()) newErrors[`lectureName${index}`] = 'Tên bài giảng không được để trống';
        else if (lecture.name.length > 100) newErrors[`lectureName${index}`] = 'Tên bài giảng không được vượt quá 100 ký tự';

        if (!lecture.video) newErrors[`lectureVideo${index}`] = 'Video bài giảng không được để trống';
        if (!lecture.document) newErrors[`lectureDocument${index}`] = 'Tài liệu bài giảng không được để trống';
      });
    }

    if (!coverImage) newErrors.coverImage = 'Ảnh bìa là bắt buộc';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAddObjective = () => setObjectives([...objectives, '']);

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
    setErrors((prev) => ({ ...prev, [`objective${index}`]: '' }));
  };

  const handleRemoveObjective = (index) => {
    const newObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(newObjectives);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`objective${index}`];
      return newErrors;
    });
  };

  const handleAddLecture = () => {
    setLectures([...lectures, { order: '', name: '', videoType: 'url', video: '', document: '' }]);
  };

  const handleLectureChange = (index, field, value) => {
    const newLectures = [...lectures];
    newLectures[index][field] = value;
    setLectures(newLectures);
    setErrors((prev) => ({ ...prev, [`lecture${field}${index}`]: '' }));
  };

  const handleRemoveLecture = (index) => {
    const newLectures = lectures.filter((_, i) => i !== index);
    setLectures(newLectures);
    setErrors((prev) => {
      const newErrors = { ...prev };
      ['order', 'name', 'video', 'document'].forEach((field) => {
        delete newErrors[`lecture${field}${index}`];
      });
      return newErrors;
    });
  };

  const handleFileUpload = (index, file) => {
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      handleLectureChange(index, 'video', videoUrl);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setErrors((prev) => ({ ...prev, coverImage: '' }));
    }
  };

  const handleStudentSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setStudents(selected);
  };

  const instructors = [
    { id: 1, code: 'US0001', name: 'Nguyễn Văn A', email: 'nva@gmail.com', phone: '0123456789', dob: '01/01/1990', experience: 2 },
    { id: 2, code: 'US0002', name: 'Trần Thị B', email: 'ttb@gmail.com', phone: '0987654321', dob: '15/05/1985', experience: 5 },
    { id: 3, code: 'US0003', name: 'Lê Văn C', email: 'lvc@gmail.com', phone: '0912345678', dob: '20/10/1992', experience: 3 },
    { id: 4, code: 'US0004', name: 'Phạm Thị D', email: 'ptd@gmail.com', phone: '0932145678', dob: '30/12/1988', experience: 4 },
    { id: 5, code: 'US0005', name: 'Hoàng Văn E', email: 'hve@gmail.com', phone: '0941234567', dob: '10/03/1995', experience: 1 },
    { id: 6, code: 'US0006', name: 'Nguyễn Thị F', email: 'ntf@gmail.com', phone: '0951234567', dob: '05/07/1990', experience: 6 },
    { id: 7, code: 'US0007', name: 'Trần Văn G', email: 'tvg@gmail.com', phone: '0961234567', dob: '12/09/1987', experience: 4 },
  ];

  const filteredInstructors = instructors.filter((instructor) =>
    (searchCode ? instructor.code.toLowerCase().includes(searchCode.toLowerCase()) : true) &&
    (searchName ? instructor.name.toLowerCase().includes(searchName.toLowerCase()) : true)
  );

  const totalInstructorPages = Math.ceil(filteredInstructors.length / instructorsPerPage);
  const currentInstructors = filteredInstructors.slice(
    (instructorPage - 1) * instructorsPerPage,
    instructorPage * instructorsPerPage
  );

  const handleInstructorSelect = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleConfirmInstructor = () => {
    if (selectedInstructor) {
      setFormData((prev) => ({ ...prev, instructor: selectedInstructor.name }));
      setErrors((prev) => ({ ...prev, instructor: '' }));
    } else {
      setErrors((prev) => ({ ...prev, instructor: 'Vui lòng chọn một giảng viên' }));
      return;
    }
    setShowInstructorModal(false);
    setSearchCode('');
    setSearchName('');
    setSelectedInstructor(null);
    setInstructorPage(1);
  };

  const handleCancelInstructor = () => {
    setShowInstructorModal(false);
    setSearchCode('');
    setSearchName('');
    setSelectedInstructor(null);
    setInstructorPage(1);
  };

  const handleSave = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const newCourse = {
          id: uuidv4(),
          ...formData,
          lessons: Number(formData.lessons),
          objectives,
          lectures,
          students,
          coverImage,
        };
        addCourse(newCourse); // Sử dụng addCourse từ Context
        setIsSaved(true);
        setShowSuccessModal(true);
      } catch (error) {
        setErrors({ general: 'Lỗi khi tạo khóa học. Vui lòng thử lại.' });
      }
    }
    setIsLoading(false);
  };

  const handleCancel = () => setShowCancelModal(true);

  const handleOpenInstructorModal = () => {
    setShowInstructorModal(true);
    setInstructorPage(1);
  };

  const handleInstructorPageChange = (page) => {
    setInstructorPage(page);
  };

  return (
    <div className="add-course-details">
      <div className="add-course-section">
        <h2>Mô tả</h2>
        <div className="add-course-input-group">
          <label htmlFor="course-name">Tên khóa học <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="course-name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
            maxLength={100}
          />
          {errors.courseName && <span className="error">{errors.courseName}</span>}
        </div>

        <div className="add-course-input-group">
          <label htmlFor="lessons">Số lượng bài học <span style={{ color: 'red' }}>*</span></label>
          <input
            type="number"
            id="lessons"
            name="lessons"
            value={formData.lessons}
            onChange={handleChange}
            required
            min={1}
          />
          {errors.lessons && <span className="error">{errors.lessons}</span>}
        </div>

        <div className="add-course-input-group">
          <label htmlFor="course-content">Nội dung <span style={{ color: 'red' }}>*</span></label>
          <textarea
            id="course-content"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={500}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
      </div>

      <div className="section">
        <h2>Mục tiêu <span style={{ color: 'red' }}>*</span></h2>
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
              maxLength={200}
            />
            <button className="remove-btn" onClick={() => handleRemoveObjective(index)}>
              <i className="fas fa-trash"></i>
            </button>
            {errors[`objective${index}`] && <span className="error">{errors[`objective${index}`]}</span>}
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Nội dung khóa học <span style={{ color: 'red' }}>*</span></h2>
        <div className="add-new" onClick={handleAddLecture}>
          <i className="fas fa-plus"></i> <span>Thêm mới</span>
        </div>
        {errors.lectures && <span className="error">{errors.lectures}</span>}
        {lectures.map((lecture, index) => (
          <div className="course-content" key={index}>
            <div className="input-group">
              <label>Thứ tự <span style={{ color: 'red' }}>*</span></label>
              <input
                type="number"
                placeholder="Nhập thứ tự"
                value={lecture.order}
                onChange={(e) => handleLectureChange(index, 'order', e.target.value)}
                min={1}
              />
              {errors[`lectureOrder${index}`] && (
                <span className="error">{errors[`lectureOrder${index}`]}</span>
              )}
            </div>

            <div className="input-group">
              <label>Tên bài giảng <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                placeholder="Nhập tên bài giảng"
                value={lecture.name}
                onChange={(e) => handleLectureChange(index, 'name', e.target.value)}
                maxLength={100}
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
                <label>Video URL <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="url"
                  placeholder="Nhập URL video"
                  value={lecture.video}
                  onChange={(e) => handleLectureChange(index, 'video', e.target.value)}
                />
                {errors[`lectureVideo${index}`] && (
                  <span className="error">{errors[`lectureVideo${index}`]}</span>
                )}
              </div>
            ) : (
              <div className="input-group">
                <label>Tải lên video <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(index, e.target.files[0])}
                />
                {errors[`lectureVideo${index}`] && (
                  <span className="error">{errors[`lectureVideo${index}`]}</span>
                )}
              </div>
            )}

            <div className="input-group">
              <label>Tài liệu <span style={{ color: 'red' }}>*</span></label>
              <input
                type="url"
                placeholder="Nhập URL tài liệu"
                value={lecture.document}
                onChange={(e) => handleLectureChange(index, 'document', e.target.value)}
              />
              {errors[`lectureDocument${index}`] && (
                <span className="error">{errors[`lectureDocument${index}`]}</span>
              )}
            </div>

            <div className="buttons">
              <button className="save-btn" onClick={() => console.log('Lưu bài giảng', lecture)}>
                Lưu
              </button>
              <button className="cancel-btn" onClick={() => handleRemoveLecture(index)}>
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Ảnh bìa <span style={{ color: 'red' }}>*</span></h2>
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
        {errors.coverImage && <span className="error">{errors.coverImage}</span>}
      </div>

      <div className="learning-time-section">
        <h2>Thời gian học</h2>
        <div className="learning-time-row">
          <div className="learning-time-input">
            <label>Ngày bắt đầu <span style={{ color: 'red' }}>*</span></label>
            <input
              type="date"
              value={formData.startDate}
              name="startDate"
              onChange={handleChange}
            />
            {errors.startDate && <span className="learning-time-error">{errors.startDate}</span>}
          </div>
          <div className="learning-time-input">
            <label>Ngày kết thúc <span style={{ color: 'red' }}>*</span></label>
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
          <h2>Chọn giảng viên <span style={{ color: 'red' }}>*</span></h2>
          <button className="select-instructor-btn" onClick={handleOpenInstructorModal}>
            {formData.instructor || 'Chọn giảng viên'}
          </button>
          {errors.instructor && <span className="error">{errors.instructor}</span>}
        </div>
      </div>

      <div className="footer-buttons">
        <button className="create-btn" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Đang tạo...' : 'Tạo mới'}
        </button>
        <button className="cancel-btn" onClick={handleCancel} disabled={isLoading}>
          Hủy
        </button>
      </div>

      {errors.general && <div className="error general-error">{errors.general}</div>}

      <Modala
        show={showSuccessModal}
        title="Tạo khóa học thành công"
        onConfirm={() => {
          setShowSuccessModal(false);
          setIsSaved(true);
        }}
        onCancel={() => {
          setShowSuccessModal(false);
          setIsSaved(true);
        }}
        confirmText="Xác nhận"
        cancelText="Hủy"
        modalClass="add-modal"
      />

      <Modala
        show={showCancelModal}
        title="Bạn chắc chắn muốn hủy?"
        onConfirm={() => navigate('/course-management')}
        onCancel={() => setShowCancelModal(false)}
        confirmText="Xác nhận"
        cancelText="Hủy"
        modalClass="add-modal"
      />

      <Modala
        show={showInstructorModal}
        title="Tìm kiếm giảng viên"
        onConfirm={handleConfirmInstructor}
        onCancel={handleCancelInstructor}
        confirmText="Xác nhận"
        cancelText="Hủy"
        modalClass="instructor-modal"
      >
        <div className="instructor-search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Mã giảng viên"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Tên giảng viên"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">Tìm kiếm</button>
          </div>
          <div className="instructor-table-container">
            <table className="instructor-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Stt</th>
                  <th>Mã định danh</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Ngày sinh</th>
                  <th>Năm kinh nghiệm</th>
                </tr>
              </thead>
              <tbody>
                {currentInstructors.map((instructor, index) => (
                  <tr key={instructor.id}>
                    <td>
                      <input
                        type="radio"
                        name="instructor"
                        checked={selectedInstructor?.id === instructor.id}
                        onChange={() => handleInstructorSelect(instructor)}
                      />
                    </td>
                    <td>{index + 1 + (instructorPage - 1) * instructorsPerPage}</td>
                    <td>{instructor.code}</td>
                    <td>{instructor.name}</td>
                    <td>{instructor.email}</td>
                    <td>{instructor.phone}</td>
                    <td>{instructor.dob}</td>
                    <td>{instructor.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => handleInstructorPageChange(1)}
              disabled={instructorPage === 1}
            >
              «
            </button>
            {[...Array(totalInstructorPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => handleInstructorPageChange(number + 1)}
                className={instructorPage === number + 1 ? 'active' : ''}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => handleInstructorPageChange(totalInstructorPages)}
              disabled={instructorPage === totalInstructorPages}
            >
              »
            </button>
          </div>
        </div>
      </Modala>
    </div>
  );
};

export default AddCourse;