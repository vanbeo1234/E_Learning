export const login = async (userCode, password) => {
    try {
      const response = await fetch('http://localhost:8081/v1/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userCode, password }),
      });
      return response;
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
      throw error;
    }
  };
  
  export const signup = async (userCode, password, name, email, phone, address, dob) => {
    try {
      const response = await fetch('http://localhost:8081/v1/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userCode,
          password,
          name,
          email,
          phone,
          address,
          dob,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Đăng ký không thành công');
      }
      
      return response.json(); // Trả về kết quả của API, bạn có thể kiểm tra thông tin phản hồi từ API ở đây
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
      throw error;
    }
  };
  