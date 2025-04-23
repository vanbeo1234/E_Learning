import React, { useState } from 'react';  
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../../../services/authService';  // Đảm bảo đường dẫn đúng
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = ({ setIsAuthenticated }) => {
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await loginUser(userCode, password);  // Gọi loginUser từ dịch vụ
      if (data?.token) {
        localStorage.setItem('access_token', data.token);  // Chuẩn key mà các file khác đang dùng
        localStorage.setItem('userCode', data.userCode);
        setIsAuthenticated(true);
        toast.success('Đăng nhập thành công!');
        navigate('/dashboard');  // Chuyển hướng đến trang dashboard
      } else {
        toast.error('Đăng nhập thất bại!');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
