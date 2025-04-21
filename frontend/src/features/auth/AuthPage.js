import React, { useState } from 'react';  
import { Link, useNavigate } from "react-router-dom";  
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../services/authService';

const AuthPage = ({ setIsAuthenticated }) => {
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
 
  const handleLogin = async () => {
    try {
      const response = await login(userCode, password);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userCode', data.userCode);
        setIsAuthenticated(true);
        toast.success('Đăng nhập thành công!');
        navigate('/user-management');
      } else {
        toast.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <ToastContainer />
      <header style={styles.loginHeader}>
        <div style={styles.loginLogo}>E LEARNING</div>
        <div style={styles.loginNavContainer}>
          <nav style={styles.loginNavLinks}>
            <a href="#" style={styles.loginNavLink}>Về chúng tôi</a>
            <a href="#" style={styles.loginNavLink}>Khóa học</a>
            <a href="#" style={styles.loginNavLink}>Liên hệ với chúng tôi</a>
            <a href="#" style={styles.loginNavLink}>FAQ's</a>
          </nav>
        </div>
      </header>
      <main style={styles.loginMainContainer}>
        <div style={styles.loginFormContainer}>
          <div style={styles.loginButtonContainer}>
            <Link to="/login">
              <button style={styles.loginButton}>Đăng nhập</button>
            </Link>
            <Link to="/signup">
              <button style={styles.registerButton}>Đăng ký</button>
            </Link>
          </div>
          <div style={styles.loginInputFields}>
            <div>
              <label htmlFor="userCode">Tên đăng nhập</label>
              <input
                type="text"
                id="userCode"
                placeholder="Nhập Tên người dùng của bạn"
                style={styles.loginInputField}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                required
                aria-label="User Code"
              />
            </div>
            <div>
              <label htmlFor="password">Mật khẩu</label>
              <div style={styles.loginPasswordContainer}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Nhập mật khẩu của bạn"
                  style={styles.loginInputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
                <i
                  style={{ ...styles.loginPasswordIcon, ...(passwordVisible ? styles.loginPasswordIconActive : {}) }}
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
            </div>
            <button style={ styles.loginSubmitButton} onClick={handleLogin}>Đăng nhập</button>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  loginHeader: { /* styles */ },
  loginLogo: { /* styles */ },
  loginNavContainer: { /* styles */ },
  loginNavLinks: { /* styles */ },
  loginNavLink: { /* styles */ },
  loginMainContainer: { /* styles */ },
  loginFormContainer: { /* styles */ },
  loginButtonContainer: { /* styles */ },
  loginButton: { /* styles */ },
  registerButton: { /* styles */ },
  loginInputFields: { /* styles */ },
  loginInputField: { /* styles */ },
  loginPasswordContainer: { /* styles */ },
  loginPasswordIcon: { /* styles */ },
  loginPasswordIconActive: { /* styles */ },
  loginSubmitButton: { /* styles */ },
};

export default AuthPage;
