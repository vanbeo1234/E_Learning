// src/components/EditCourse.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modala from './Modala';
import '../../Style/adcm.css';
import { useCourseContext } from '../Function/Context/CourseContext';

// Định nghĩa type cho DnD
const ItemTypes = {
  LECTURE: 'lecture',
};

// Component cho từng bài học có thể kéo thả
const LectureItem = ({ lecture, index, moveLecture, handleEditLecture, handleRemoveLecture }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LECTURE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.LECTURE,
    hover: (item) => {
      if (item.index !== index) {
        moveLecture(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="lecture-item"
      style={{ opacity: isDragging ? 0.5 : 1, display: 'flex', alignItems: 'center', marginBottom: '10px' }}
    >
      <span style={{ marginRight: '10px', width: '30px' }}>{index + 1}.</span>
      <span style={{ flex: 1 }}>{lecture.name || 'Bài học chưa có tên'}</span>
      <button onClick={() => handleEditLecture(index)} style={{ marginRight: '10px' }}>
        <i className="fas fa-edit"></i>
      </button>
      <button className="remove-btn" onClick={() => handleRemoveLecture(index)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

const EditCourse = () => {
  const { updateCourse } = useCourseContext();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  const [formData, setFormData] = useState({
    courseName: course?.courseName || '',
    instructor: course?.instructor || '',
    lessons: course?.lessons || '',
    description: course?.description || '',
    startDate: course?.startDate || '',
    endDate: course?.endDate || '',
    status: course?.status || 'Hoạt động',
  });

  const [coverImage, setCoverImage] = useState(course?.coverImage || null);
  const [objectives, setObjectives] = useState(course?.objectives || []);
  const [lectures, setLectures] = useState(course?.lectures || []);
  const [tempLectures, setTempLectures] = useState(course?.lectures || []);
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState(course?.students || []);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(null);
  const [currentLectureData, setCurrentLectureData] = useState(null);
  const [searchCode, setSearchCode] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    if (!course) {
      navigate('/course-management');
    }
  }, [course, navigate]);

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
    const newLecture = { order: lectures.length + 1, name: '', videoType: 'url', video: '', document: '' };
    setLectures([...lectures, newLecture]);
    setTempLectures([...lectures, newLecture]);
  };

  const handleRemoveLecture = (index) => {
    const newLectures = [...lectures];
    newLectures.splice(index, 1);
    newLectures.forEach((lecture, idx) => {
      lecture.order = idx + 1;
    });
    setLectures(newLectures);
    setTempLectures(newLectures);
  };

  const handleEditLecture = (index) => {
    setCurrentLectureIndex(index);
    setCurrentLectureData({ ...lectures[index] });
    setShowLectureModal(true);
  };

  const handleLectureChange = (field, value) => {
    setCurrentLectureData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file) => {
    const videoUrl = URL.createObjectURL(file);
    handleLectureChange('video', videoUrl);
  };

  const handleSaveLecture = () => {
    const newLectures = [...lectures];
    newLectures[currentLectureIndex] = { ...currentLectureData };
    setLectures(newLectures);
    setTempLectures(newLectures);
    setShowLectureModal(false);
    setCurrentLectureIndex(null);
    setCurrentLectureData(null);
  };

  const handleCancelLecture = () => {
    setShowLectureModal(false);
    setCurrentLectureIndex(null);
    setCurrentLectureData(null);
  };

  const moveLecture = (fromIndex, toIndex) => {
    const newLectures = [...tempLectures];
    const [movedLecture] = newLectures.splice(fromIndex, 1);
    newLectures.splice(toIndex, 0, movedLecture);
    newLectures.forEach((lecture, idx) => {
      lecture.order = idx + 1;
    });
    setTempLectures(newLectures);
  };

  const handleSaveSort = () => {
    setLectures([...tempLectures]);
    setIsSorting(false);
    console.log('Danh sách bài học đã lưu:', tempLectures);
  };

  const handleCancelSort = () => {
    setTempLectures([...lectures]);
    setIsSorting(false);
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
    { id: 1, code: 'US0001', name: 'Nguyễn Văn A', email: 'nva@gmail.com', phone: '0123456789', dob: '01/01/1990', experience: 2 },
    { id: 2, code: 'US0002', name: 'Trần Thị B', email: 'ttb@gmail.com', phone: '0987654321', dob: '15/05/1985', experience: 5 },
    { id: 3, code: 'US0003', name: 'Lê Văn C', email: 'lvc@gmail.com', phone: '0912345678', dob: '20/10/1992', experience: 3 },
    { id: 4, code: 'US0004', name: 'Phạm Thị D', email: 'ptd@gmail.com', phone: '0932145678', dob: '30/12/1988', experience: 4 },
  ];

  const filteredInstructors = instructors.filter((instructor) =>
    (searchCode ? instructor.code.toLowerCase().includes(searchCode.toLowerCase()) : true) &&
    (searchName ? instructor.name.toLowerCase().includes(searchName.toLowerCase()) : true)
  );

  const handleInstructorSelect = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleConfirmInstructor = () => {
    if (selectedInstructor) {
      setFormData((prev) => ({ ...prev, instructor: selectedInstructor.name }));
      console.log('Giảng viên đã chọn:', selectedInstructor);
    }
    setShowInstructorModal(false);
    setSearchCode('');
    setSearchName('');
    setSelectedInstructor(null);
  };

  const handleCancelInstructor = () => {
    setShowInstructorModal(false);
    setSearchCode('');
    setSearchName('');
    setSelectedInstructor(null);
  };

  const handleSave = () => {
     const newErrors = {};
    
     // Kiểm tra dữ liệu đầu vào
     if (!formData.courseName) newErrors.courseName = 'Tên khóa học không được bỏ trống';
     if (!formData.instructor) newErrors.instructor = 'Giảng viên là bắt buộc';
     if (!formData.lessons) newErrors.lessons = 'Số lượng bài học không được bỏ trống';
     if (!formData.description) newErrors.description = 'Nội dung không được bỏ trống';
     if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
     if (!formData.endDate) newErrors.endDate = 'Ngày kết thúc là bắt buộc';
    
     objectives.forEach((objective, index) => {
      if (!objective) newErrors[`objective${index}`] = 'Mục tiêu không được để trống';
     });
    
     if (lectures.length === 0) {
      newErrors.lectures = 'Phải có ít nhất một bài giảng';
     } else {
      lectures.forEach((lecture, index) => {
       if (!lecture.order) newErrors[`lectureOrder${index}`] = 'Thứ tự bài giảng không được để trống';
       if (!lecture.name) newErrors[`lectureName${index}`] = 'Tên bài giảng không được để trống';
       if (!lecture.video) newErrors[`lectureVideo${index}`] = 'Video bài giảng không được để trống';
       if (!lecture.document) newErrors[`lectureDocument${index}`] = 'Tài liệu bài giảng không được để trống';
      });
     }
    
     if (!coverImage) newErrors.coverImage = 'Ảnh bìa là bắt buộc';
    
     setErrors(newErrors);
    
     if (Object.keys(newErrors).length === 0) {
      const updatedCourse = {
       id: course.id,
       ...formData,
       lessons: Number(formData.lessons),
       objectives,
       lectures,
       students,
       coverImage,
      };
    
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
    
      fetch('http://localhost:8080/v1/api/course', {
       method: 'PUT',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
       },
       body: JSON.stringify(updatedCourse),
      })
      .then((res) => {
       if (!res.ok) {
        throw new Error('Cập nhật khóa học thất bại');
       }
       return res.json();
      })
      .then((data) => {
       console.log('Khóa học đã được cập nhật:', data);
       setShowSuccessModal(true);
       setTimeout(() => {
        navigate('/course-management');
       }, 2000);
      })
      .catch((error) => {
       console.error('Lỗi khi cập nhật khóa học:', error);
       alert('Đã xảy ra lỗi khi cập nhật khóa học!');
      });
     }
    };
    
  const handleCancel = () => setShowCancelModal(true);

  const handleOpenInstructorModal = () => {
    setShowInstructorModal(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="edit-course-details">
        <div className="edit-course-section">
          <h2>Mô tả</h2>
          <div className="edit-course-input-group">
            <label htmlFor="course-name">Tên khóa học <span style={{ color: 'red' }}>*</span></label>
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
            <label htmlFor="lessons">Số lượng bài học <span style={{ color: 'red' }}>*</span></label>
            <input
              type="number"
              id="lessons"
              name="lessons"
              value={formData.lessons}
              onChange={handleChange}
              required
            />
            {errors.lessons && <span className="error">{errors.lessons}</span>}
          </div>

          <div className="edit-course-input-group">
            <label htmlFor="course-content">Nội dung <span style={{ color: 'red' }}>*</span></label>
            <textarea
              id="course-content"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div className="add-new" onClick={handleAddLecture}>
              <i className="fas fa-plus"></i> <span>Thêm mới</span>
            </div>
            <button
              className="sort-btn"
              onClick={() => setIsSorting(!isSorting)}
              style={{ marginLeft: '10px', padding: '5px 10px' }}
            >
              <i className="fas fa-sort"></i> Thứ tự
            </button>
          </div>
          {errors.lectures && <span className="error">{errors.lectures}</span>}
          <div>
            {isSorting ? (
              <>
                {tempLectures.map((lecture, index) => (
                  <LectureItem
                    key={index}
                    index={index}
                    lecture={lecture}
                    moveLecture={moveLecture}
                    handleEditLecture={handleEditLecture}
                    handleRemoveLecture={handleRemoveLecture}
                  />
                ))}
                <div style={{ marginTop: '10px' }}>
                  <button className="save-btn" onClick={handleSaveSort} style={{ marginRight: '10px' }}>
                    Lưu
                  </button>
                  <button className="cancel-btn" onClick={handleCancelSort}>
                    Hủy
                  </button>
                </div>
              </>
            ) : (
              lectures.map((lecture, index) => (
                <div
                  key={index}
                  className="lecture-item"
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                >
                  <span style={{ marginRight: '10px', width: '30px' }}>{index + 1}.</span>
                  <span style={{ flex: 1 }}>{lecture.name || 'Bài học chưa có tên'}</span>
                  <button onClick={() => handleEditLecture(index)} style={{ marginRight: '10px' }}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="remove-btn" onClick={() => handleRemoveLecture(index)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>
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
          <button className="create-btn" onClick={handleSave}>Cập nhật</button>
          <button className="cancel-btn" onClick={handleCancel}>Hủy</button>
        </div>

        <Modala
          show={showSuccessModal}
          title="Cập nhật khóa học thành công"
          onConfirm={() => navigate('/course-management')}
          onCancel={() => setShowSuccessModal(false)}
          modalClass="add-modal"
        />

        <Modala
          show={showCancelModal}
          title="Bạn chắc chắn muốn hủy?"
          onConfirm={() => navigate('/course-management')}
          onCancel={() => setShowCancelModal(false)}
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
                  {filteredInstructors.map((instructor, index) => (
                    <tr key={instructor.id}>
                      <td>
                        <input
                          type="radio"
                          name="instructor"
                          checked={selectedInstructor?.id === instructor.id}
                          onChange={() => handleInstructorSelect(instructor)}
                        />
                      </td>
                      <td>{index + 1}</td>
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
          </div>
        </Modala>

        <Modala
          show={showLectureModal}
          title="Chỉnh sửa bài học"
          onConfirm={handleSaveLecture}
          onCancel={handleCancelLecture}
          confirmText="Cập nhật"
          cancelText="Hủy"
          modalClass="lecture-modal"
        >
          {currentLectureData && (
            <div className="lecture-edit-form">
              <div className="input-group">
                <label>Tên bài giảng <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  placeholder="Nhập tên bài giảng"
                  value={currentLectureData.name}
                  onChange={(e) => handleLectureChange('name', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Chọn loại video <span style={{ color: 'red' }}>*</span></label>
                <select
                  value={currentLectureData.videoType || 'url'}
                  onChange={(e) => handleLectureChange('videoType', e.target.value)}
                >
                  <option value="url">Dán đường link video</option>
                  <option value="file">Tải video lên</option>
                </select>
              </div>

              {currentLectureData.videoType === 'url' ? (
                <div className="input-group">
                  <label>Link video <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="Nhập URL video"
                    value={currentLectureData.video}
                    onChange={(e) => handleLectureChange('video', e.target.value)}
                  />
                </div>
              ) : (
                <div className="input-group">
                  <label>Tải lên video <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                  />
                </div>
              )}

              <div className="input-group">
                <label>Tài liệu <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  placeholder="Nhập tài liệu"
                  value={currentLectureData.document}
                  onChange={(e) => handleLectureChange('document', e.target.value)}
                />
              </div>
            </div>
          )}
        </Modala>
      </div>
    </DndProvider>
  );
};

export default EditCourse;