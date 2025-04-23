
// authService.js
/**
 * Gọi API đăng nhập tài khoản người dùng.
 * @param {string} userCode - Mã người dùng.
 * @param {string} password - Mật khẩu người dùng.
 * @returns {Promise<Object>} Phản hồi từ server gồm token và thông tin người dùng nếu thành công.
 */
export const loginUser = async (userCode, password) => {
  const response = await fetch('http://localhost:8081/v1/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userCode, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Đăng nhập thất bại');
  }

  const data = await response.json();
  return data;
};

/**
 * Gọi API đăng ký tài khoản mới.
 * @param {Object} registerData - Thông tin đăng ký, gồm tên, email, mật khẩu, roleId, v.v.
 * @param {string} [token] - Token xác thực nếu đăng ký role Admin (tùy chọn).
 * @returns {Promise<Object>} Kết quả phản hồi từ server.
 */
export const registerUser = async (registerData, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch('http://localhost:8081/v1/api/auth/register', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Lỗi khi đăng ký');
  }

  const data = await response.json();
  return data;
};
