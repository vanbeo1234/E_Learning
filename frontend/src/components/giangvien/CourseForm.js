import React, { useState } from 'react';
import Modal from './Modal';
import "./giangvien.css";
const CourseForm = ({ isEdit }) => {
  const [courseName, setCourseName] = useState(isEdit ? 'Java core' : '');
  const [courseContent, setCourseContent] = useState(isEdit ? 'Java cơ bản' : '');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSave = () => setShowSuccessModal(true);
  const handleCancel = () => setShowCancelModal(true);

  return (
    <div className="course-details">
      <div className="section">
        <h2>Mô tả</h2>
        <div className="input-group">
          <label htmlFor="course-name">Tên khóa học</label>
          <input
            type="text"
            id="course-name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <i className="fas fa-pencil-alt edit-icon"></i>
        </div>
        <div className="input-group">
          <label htmlFor="course-content">Nội dung</label>
          <textarea
            id="course-content"
            value={courseContent}
            onChange={(e) => setCourseContent(e.target.value)}
          />
          <i className="fas fa-pencil-alt edit-icon"></i>
        </div>
      </div>
      <div className="section">
        <h2>Ảnh bìa</h2>
        <div className="cover-image">
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div className="section">
        <h2>Mục tiêu</h2>
        <div className="add-new">
          <i className="fas fa-plus"></i>
          <span>Thêm mới</span>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div className="input-group" key={i}>
            <input type="text" placeholder="Nhập mục tiêu" />
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Nội dung khóa học</h2>
        <div className="add-new">
          <i className="fas fa-plus"></i>
          <span>Thêm mới</span>
        </div>
        <div className="course-content">
          <div className="input-group">
            <label htmlFor="order">Thứ tự</label>
            <input type="text" id="order" placeholder="Nhập thứ tự" />
          </div>
          <div className="input-group">
            <label htmlFor="lecture-name">Tên bài giảng<span style={{ color: 'red' }}>*</span></label>
            <input type="text" id="lecture-name" placeholder="Nhập tên bài giảng" />
          </div>
          <div className="input-group">
            <label htmlFor="video">Video</label>
            <input type="text" id="video" placeholder="Tải lên video" />
            <i className="fas fa-upload upload-icon"></i>
          </div>
          <div className="input-group">
            <label htmlFor="document">Tài liệu</label>
            <input type="text" id="document" placeholder="Tải lên tài liệu" />
          </div>
          <div className="buttons">
            <button className="save-btn">Lưu</button>
            <button className="cancel-btn">Hủy</button>
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
        title={isEdit ? 'Cập nhật khóa học thành công' : 'Thêm khóa học mới thành công'}
        onConfirm={() => (window.location.href = '/create-course')}
        onCancel={() => setShowSuccessModal(false)}
      />
      <Modal
        show={showCancelModal}
        title="Bạn chắc chắn muốn hủy?"
        onConfirm={() => (window.location.href = '/create-course')}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
};

export default CourseForm;