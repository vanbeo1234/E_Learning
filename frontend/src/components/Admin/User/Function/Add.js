import React, { useState } from 'react';
import '../../Style/adum.css';

const AddUserModal = ({
  formData,
  setFormData,
  handleAddUser,
  setAddModalOpen,
  availableCertificates,
  addCertificate,
  removeCertificate,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id?.trim()) newErrors.id = 'Mã định danh là bắt buộc';
    if (!formData.name?.trim()) newErrors.name = 'Họ và tên là bắt buộc';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.status) newErrors.status = 'Trạng thái là bắt buộc';
    if (!formData.dob) newErrors.dob = 'Ngày sinh là bắt buộc';
    if (!formData.role) newErrors.role = 'Vai trò là bắt buộc';

    const phoneRegex = /^[0-9]{9,15}$/;
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (chỉ nhập số, 9-15 chữ số)';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Địa chỉ là bắt buộc';
    }

    if (formData.role === 'Giảng viên') {
      if (!formData.experience) newErrors.experience = 'Năm kinh nghiệm là bắt buộc';
      if (!formData.certifications?.length) newErrors.certifications = 'Phải chọn ít nhất một chứng chỉ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleAddUser();
    }
  };

  // Hàm reset form tùy chọn
  const handleReset = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      phoneCode: '+84',
      gender: '',
      status: '',
      dob: '',
      role: '',
      address: '',
      certifications: [],
      experience: '',
    });
    setErrors({});
  };

  return (
    <div id="addModal" className="modal add-modal">
      <div className="modal-content">
        <span className="modal-close-btn" onClick={() => setAddModalOpen(false)}>×</span>
        <h2 className="modal-h2">Thêm người dùng mới</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-grid">
            <div className="modal-grid-item">
              <label className="field-label">Mã định danh:</label>
              <input
                type="text"
                name="id"
                value={formData.id || ''}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
              />
            </div>

            <div className="modal-grid-item">
              <label className="field-label">Họ và tên:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="modal-grid-item">
              <label className="field-label">Mật khẩu:</label>
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="modal-grid-item">
              <label className="field-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

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

            <div className="modal-grid-item full-width">
              <label className="field-label">Số điện thoại:</label>
              <div className="phone-input-group">
                <select
                  className="phone-code-select"
                  value={formData.phoneCode || '+84'}
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
                  type="number"
                  name="phone"
                  className="phone-number-input"
                  value={formData.phone || ''}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

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
                  />
                  Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formData.gender === 'Nữ'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    required
                  />
                  Nữ
                </label>
              </div>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

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
                  />
                  Hoạt động
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Không hoạt động"
                    checked={formData.status === 'Không hoạt động'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  />
                  Không hoạt động
                </label>
              </div>
              {errors.status && <span className="error">{errors.status}</span>}
            </div>

            <div className="modal-grid-item">
              <label className="field-label">Vai trò:</label>
              <select
                name="role"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">-- Chọn vai trò --</option>
                <option value="Học viên">Học viên</option>
                <option value="Giảng viên">Giảng viên</option>
                <option value="Quản lý">Quản lý</option>
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>

            <div className="modal-grid-item">
              <label className="field-label">Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob || ''}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>

            <div className="modal-grid-item">
              <label className="field-label">Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>

            {formData.role === 'Giảng viên' && (
              <>
                <div className="modal-grid-item">
                  <label className="field-label">Chứng chỉ:</label>
                  <div className="certifications">
                    <select onChange={(e) => addCertificate(e.target.value)} defaultValue="" required>
                      <option value="" disabled>Chọn chứng chỉ</option>
                      {availableCertificates.map((cert, i) => (
                        <option key={i} value={cert}>{cert}</option>
                      ))}
                    </select>
                    <div className="certificate-list">
                      {formData.certifications?.map((cert, idx) => (
                        <div key={idx} className="certificate-item">
                          {cert}
                          <button type="button" onClick={() => removeCertificate(cert)}>x</button>
                        </div>
                      ))}
                    </div>
                    {errors.certifications && <span className="error">{errors.certifications}</span>}
                  </div>
                </div>

                <div className="modal-grid-item">
                  <label className="field-label">Năm kinh nghiệm:</label>
                  <select
                    name="experience"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                  >
                    <option value="">-- Chọn số năm --</option>
                    {[...Array(20).keys()].map((year) => (
                      <option key={year + 1} value={year + 1}>{year + 1}</option>
                    ))}
                  </select>
                  {errors.experience && <span className="error">{errors.experience}</span>}
                </div>
              </>
            )}
          </div>

          <div className="modal-buttons">
            <button type="submit" className="modal-button-submit">Thêm</button>
            <button type="button" className="modal-button-reset" onClick={handleReset}>Reset</button>
            <button type="button" className="modal-button-reset" onClick={() => setAddModalOpen(false)}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;