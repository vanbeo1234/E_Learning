import React, { useState } from 'react';
import Modala from './Modala';
import "./admin.css";

const AddCourseModal = ({ isAddModalOpen, setAddModalOpen, handleAddCourse }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    instructor: '',
    lessons: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSave = () => {
    handleAddCourse();
    setShowSuccessModal(true);
  };

  const handleCancel = () => setShowCancelModal(true);

  return (
    <>
      {isAddModalOpen && (
        <div className="modal">
          <h2>Thêm Khóa Học</h2>
          <form>
            <label>Tên khóa học:
              <input type="text" value={formData.courseName} onChange={(e) => setFormData({ ...formData, courseName: e.target.value })} required />
            </label>
            <label>Giảng viên:
              <input type="text" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} required />
            </label>
            <label>Số bài học:
              <input type="number" value={formData.lessons} onChange={(e) => setFormData({ ...formData, lessons: e.target.value })} required />
            </label>
            <label>Mô tả:
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            </label>
            <label>Ngày bắt đầu:
              <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
            </label>
            <label>Ngày kết thúc:
              <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
            </label>
            <button type="button" onClick={handleSave}>Thêm</button>
            <button type="button" onClick={() => setAddModalOpen(false)}>Đóng</button>
          </form>
        </div>
      )}

      <Modala
        show={showSuccessModal}
        title="Thêm khóa học mới thành công"
        onConfirm={() => (window.location.href = '/create-course')}
        onCancel={() => setShowSuccessModal(false)}
      />
      <Modala
        show={showCancelModal}
        title="Bạn chắc chắn muốn hủy?"
        onConfirm={() => (window.location.href = '/create-course')}
        onCancel={() => setShowCancelModal(false)}
      />
    </>
  );
};

export default AddCourseModal;
