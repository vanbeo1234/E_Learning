import React, { useState } from 'react';

const AddUserModal = ({ formData, setFormData, handleAddUser, setAddModalOpen, availableCertificates, addCertificate, removeCertificate }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate ID
    if (!formData.id.trim()) {
      newErrors.id = 'Mã định danh là bắt buộc';
    }

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Họ và tên là bắt buộc';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Validate Gender
    if (!formData.gender) {
      newErrors.gender = 'Giới tính là bắt buộc';
    }

    // Validate Status
    if (!formData.status) {
      newErrors.status = 'Trạng thái là bắt buộc';
    }

    // Validate Date of Birth
    if (!formData.dob) {
      newErrors.dob = 'Ngày sinh là bắt buộc';
    }

    // Validate Role
    if (!formData.role) {
      newErrors.role = 'Vai trò là bắt buộc';
    }

    // Validate Phone
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    // Validate Address
    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleAddUser();
    }
  };

  return (
    <div id="addModal" className="modal add-modal">
      <div className="modal-content">
        <span className="modal-close-btn" onClick={() => setAddModalOpen(false)}>×</span>
        <h2 className="modal-h2">Thêm người dùng mới</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-grid">
            {/* Mã định danh */}
            <div className="modal-grid-item">
              <label className="field-label">Mã định danh:</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
              />
              {errors.id && <span className="error">{errors.id}</span>}
            </div>
  
            {/* Họ và tên */}
            <div className="modal-grid-item">
              <label className="field-label">Họ và tên:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
  
            {/* Email */}
            <div className="modal-grid-item">
              <label className="field-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
  
            {/* Mật khẩu */}
            <div className="modal-grid-item">
              <label className="field-label">Mật khẩu:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
  
            {/* Xác nhận mật khẩu */}
            <div className="modal-grid-item">
              <label className="field-label">Xác nhận mật khẩu:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
  
            {/* Giới tính */}
            <div className="modal-grid-item horizontal-field">
              <label className="field-label">Giới tính:</label>
              <div className="inline-options">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={formData.gender === 'Nam'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    required
                  /> Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formData.gender === 'Nữ'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    required
                  /> Nữ
                </label>
              </div>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
  
            {/* Trạng thái */}
            <div className="modal-grid-item horizontal-field">
              <label className="field-label">Trạng thái:</label>
              <div className="inline-options">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Hoạt động"
                    checked={formData.status === 'Hoạt động'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  /> Hoạt động
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Không hoạt động"
                    checked={formData.status === 'Không hoạt động'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  /> Không hoạt động
                </label>
              </div>
              {errors.status && <span className="error">{errors.status}</span>}
            </div>
  
            {/* Ngày sinh */}
            <div className="modal-grid-item">
              <label className="field-label">Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
  
            {/* Vai trò */}
            <div className="modal-grid-item">
              <label className="field-label">Vai trò:</label>
              <select
                name="role"
  ani              value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="Học viên">Học viên</option>
                <option value="Giảng viên">Giảng viên</option>
                <option value="Quản lý">Quản lý</option>
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>
  
            {/* Địa chỉ */}
            <div className="modal-grid-item">
              <label className="field-label">Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
  
            {/* Số điện thoại */}
            <div className="modal-grid-item full-width">
              <label className="field-label">Số điện thoại:</label>
              <div className="phone-input-group">
                <select
                  className="phone-code-select"
                  name="phone-code"
                  value={formData.phoneCode}
                  onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                  required
                >
                  <option value="+84">+84</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+81">+81</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+91">+91</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  className="phone-number-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
  
            {/* Năm kinh nghiệm (only for Giảng viên) */}
            {formData.role === 'Giảng viên' && (
              <div className="modal-grid-item">
                <label className="field-label">Năm kinh nghiệm:</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                >
                  {[...Array(20).keys()].map((year) => (
                    <option key={year + 1} value={year + 1}>
                      {year + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
  
            {/* Chứng chỉ (only for Giảng viên) */}
            {formData.role === 'Giảng viên' && (
              <div className="modal-grid-item">
                <label className="field-label">Chứng chỉ:</label>
                <div className="certifications">
                  <select
                    onChange={(e) => addCertificate(e.target.value)}
                    defaultValue=""
                    className="certificate-select"
                  >
                    <option value="" disabled>
                      Chọn chứng chỉ
                    </option>
                    {availableCertificates.map((certificate, index) => (
                      <option key={index} value={certificate}>
                        {certificate}
                      </option>
                    ))}
                  </select>
                  <div className="certificate-list">
                    {formData.certifications?.map((certificate, index) => (
                      <div key={index} className="certificate-item">
                        {certificate}
                        <button type="button" onClick={() => removeCertificate(certificate)}>
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
  
          <div className="modal-buttons">
            <button type="submit" className="modal-button-submit">
              Thêm
            </button>
            <button
              type="reset"
              className="modal-button-reset"
              onClick={() => setAddModalOpen(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddUserModal;