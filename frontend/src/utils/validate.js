

/**
 * Hàm validate các input trong form đăng ký
 * @param {Object} formData - Dữ liệu form cần kiểm tra
 * @returns {Object} - Object chứa các lỗi và trạng thái hợp lệ của form
 */
export const validateSignupForm = (formData) => {
    const { userCode, password, confirmPassword, name, email, phone, address, dob, role, experience } = formData;
    let errors = {};
    let isValid = true;
  
    // Validate userCode
    if (!userCode) {
      errors.userCodeError = 'Tên đăng nhập là bắt buộc.';
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(userCode)) {
      errors.userCodeError = 'Tên đăng nhập chỉ được chứa chữ cái và số.';
      isValid = false;
    } else if (userCode.length < 3 || userCode.length > 20) {
      errors.userCodeError = 'Tên đăng nhập phải từ 3 đến 20 ký tự.';
      isValid = false;
    }
  
    // Validate password
    if (!password) {
      errors.passwordError = 'Mật khẩu là bắt buộc.';
      isValid = false;
    } else if (password.length < 12 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      errors.passwordError = 'Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
      isValid = false;
    }
  
    // Validate confirmPassword
    if (confirmPassword !== password) {
      errors.passwordError = 'Mật khẩu xác nhận không khớp.';
      isValid = false;
    }
  
    // Validate name
    if (!name || !/^[a-zA-Z\sÀ-ỹ]+$/.test(name) || name.length < 2 || name.length > 50) {
      errors.nameError = 'Họ và tên phải từ 2 đến 50 ký tự, chỉ chứa chữ cái và khoảng trắng.';
      isValid = false;
    }
  
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.emailError = 'Email không hợp lệ.';
      isValid = false;
    }
  
    // Validate phone
    if (!phone || !/^\d{9,11}$/.test(phone)) {
      errors.phoneError = 'Số điện thoại phải từ 9 đến 11 chữ số.';
      isValid = false;
    }
  
    // Validate address
    if (address && address.length > 255) {
      errors.addressError = 'Địa chỉ không được dài quá 255 ký tự.';
      isValid = false;
    }
  
    // Validate dob
    if (dob) {
      const birthDate = new Date(dob);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      const dayDiff = currentDate.getDate() - birthDate.getDate();
      let adjustedAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        adjustedAge--;
      }
      if (adjustedAge < 16) {
        errors.dobError = 'Bạn phải trên 16 tuổi.';
        isValid = false;
      }
    }
  
    // Validate experience
    if (role === "Giảng viên" && experience) {
      if (isNaN(experience) || experience < 1 || experience > 20) {
        errors.experienceError = 'Năm kinh nghiệm phải từ 1 đến 20.';
        isValid = false;
      }
    }
  
    return { isValid, errors };
  };
  