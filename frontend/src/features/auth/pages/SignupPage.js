import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from '../../../services/authService';  // Đảm bảo đường dẫn đúng
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userCode, setUserCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordError('Mật khẩu xác nhận không khớp.');
      } else {
        setPasswordError('');
      }
    }
  }, [password, confirmPassword]);

  const handleSignup = async () => {
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setIsLoading(true);

    const registerData = {
      userCode,
      password,
      confirmPassword,
      email,
      phone
    };

    try {
      const data = await registerUser(registerData);
      if (data?.errorStatus === 900) {
        toast.success('Đăng ký thành công!');
        navigate('/login');
      } else {
        toast.error('Đăng ký thất bại!');
      }
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="signup-container">
        <h2>Đăng ký</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSignup} disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
