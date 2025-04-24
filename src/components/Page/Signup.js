import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Nam');
  const [address, setAddress] = useState('');
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [experience, setExperience] = useState('');
  const [userCode, setUserCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userCodeError, setUserCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [dobError, setDobError] = useState('');
  const [experienceError, setExperienceError] = useState('');

  const navigate = useNavigate();

  const availableCertificates = [
    'AWS', 'OCPJP', 'Azure', 'GCP', 'CCNA', 'PMP', 'ITIL', 'CISSP', 'CEH', 'CompTIA',
  ];

  useEffect(() => {
    const trimmedUserCode = userCode.trim().toLowerCase();
    if (!trimmedUserCode || trimmedUserCode.length < 3 || !/^[a-zA-Z0-9]+$/.test(trimmedUserCode)) {
      setUserCodeError('Tên đăng nhập phải từ 3 đến 20 ký tự, chỉ bao gồm chữ cái và số.');
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch('http://localhost:8081/v1/api/user', {
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        const users = json.data;

        const userExists = users.some((user) => user.userCode.toLowerCase() === trimmedUserCode);

        if (userExists) {
          setUserCodeError('Tên đăng nhập đã tồn tại.');
        } else {
          setUserCodeError('');
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách người dùng:', err);
        setUserCodeError('Không thể kiểm tra tên đăng nhập.');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [userCode]);

  useEffect(() => {
    const cleanedPassword = password.replace(/[^\x20-\x7E]/g, '').trim();
    const cleanedConfirmPassword = confirmPassword.replace(/[^\x20-\x7E]/g, '').trim();

    if (password && confirmPassword) {
      if (cleanedPassword !== cleanedConfirmPassword) {
        setPasswordError('Mật khẩu xác nhận không khớp.');
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  const handleRoleChange = (event) => {
    const newRole = event.target.value === 'Giảng viên' ? 'Lecturer' : 'Student';
    setRole(newRole);
    if (newRole === 'Student') {
      setSelectedCertificates([]);
      setExperience('');
      setExperienceError('');
    }
  };

  const handleDateChange = (event) => {
    setDob(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const addCertificate = (certificate) => {
    if (certificate && selectedCertificates.length < 10 && !selectedCertificates.includes(certificate)) {
      setSelectedCertificates([...selectedCertificates, certificate]);
    }
  };

  const removeCertificate = (certificate) => {
    setSelectedCertificates(selectedCertificates.filter((item) => item !== certificate));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validateInputs = () => {
    let isValid = true;

    setUserCodeError('');
    setPasswordError('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setAddressError('');
    setDobError('');
    setExperienceError('');

    const cleanedPassword = password.replace(/[^\x20-\x7E]/g, '').trim();
    const cleanedConfirmPassword = confirmPassword.replace(/[^\x20-\x7E]/g, '').trim();

    if (!userCode) {
      setUserCodeError('Tên đăng nhập là bắt buộc.');
      toast.error('Tên đăng nhập là bắt buộc.');
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(userCode)) {
      setUserCodeError('Tên đăng nhập chỉ được chứa chữ cái và số.');
      toast.error('Tên đăng nhập chỉ được chứa chữ cái và số.');
      isValid = false;
    } else if (userCode.length < 3 || userCode.length > 20) {
      setUserCodeError('Tên đăng nhập phải từ 3 đến 20 ký tự.');
      toast.error('Tên đăng nhập phải từ 3 đến 20 ký tự.');
      isValid = false;
    }

    if (!cleanedPassword) {
      setPasswordError('Mật khẩu là bắt buộc.');
      toast.error('Mật khẩu là bắt buộc.');
      isValid = false;
    } else {
      const hasUpperCase = /[A-Z]/.test(cleanedPassword);
      const hasLowerCase = /[a-z]/.test(cleanedPassword);
      const hasDigit = /\d/.test(cleanedPassword);
      const hasSpecialChar = /[^a-zA-Z0-9]/.test(cleanedPassword);
      if (cleanedPassword.length < 12 || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
        setPasswordError('Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
        toast.error('Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
        isValid = false;
      }
    }

    if (!cleanedConfirmPassword) {
      setPasswordError('Nhập lại mật khẩu là bắt buộc.');
      toast.error('Nhập lại mật khẩu là bắt buộc.');
      isValid = false;
    } else if (cleanedPassword !== cleanedConfirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp.');
      toast.error('Mật khẩu xác nhận không khớp.');
      isValid = false;
    }

    if (!name) {
      setNameError('Họ và tên là bắt buộc.');
      toast.error('Họ và tên là bắt buộc.');
      isValid = false;
    } else if (!/^[a-zA-Z\sÀ-ỹ]+$/.test(name)) {
      setNameError('Họ và tên chỉ được chứa chữ cái và khoảng trắng.');
      toast.error('Họ và tên chỉ được chứa chữ cái và khoảng trắng.');
      isValid = false;
    } else if (name.length < 2 || name.length > 50) {
      setNameError('Họ và tên phải từ 2 đến 50 ký tự.');
      toast.error('Họ và tên phải từ 2 đến 50 ký tự.');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email là bắt buộc.');
      toast.error('Email là bắt buộc.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Email không hợp lệ.');
      toast.error('Email không hợp lệ.');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('Số điện thoại là bắt buộc.');
      toast.error('Số điện thoại là bắt buộc.');
      isValid = false;
    } else if (!/^\d{9,11}$/.test(phone)) {
      setPhoneError('Số điện thoại phải từ 9 đến 11 chữ số.');
      toast.error('Số điện thoại phải từ 9 đến 11 chữ số.');
      isValid = false;
    }

    if (address && address.length > 255) {
      setAddressError('Địa chỉ không được dài quá 255 ký tự.');
      toast.error('Địa chỉ không được dài quá 255 ký tự.');
      isValid = false;
    }

    if (dob) {
      const birthDate = new Date(dob);
      const currentDate = new Date('2025-04-24');
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      const dayDiff = currentDate.getDate() - birthDate.getDate();
      let adjustedAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        adjustedAge--;
      }
      if (isNaN(birthDate.getTime())) {
        setDobError('Ngày sinh không hợp lệ.');
        toast.error('Ngày sinh không hợp lệ.');
        isValid = false;
      } else if (adjustedAge < 16) {
        setDobError('Bạn phải trên 16 tuổi.');
        toast.error('Bạn phải trên 16 tuổi.');
        isValid = false;
      }
    }

    if (role === 'Lecturer' && experience) {
      const expValue = parseInt(experience);
      if (isNaN(expValue) || expValue < 1 || expValue > 20) {
        setExperienceError('Năm kinh nghiệm phải từ 1 đến 20.');
        toast.error('Năm kinh nghiệm phải từ 1 đến 20.');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    const roleId = role === 'Student' ? 3 : 2; // Student: 3, Lecturer: 2
    const genderValue = gender === 'Nam' ? 1 : 0;
    const cleanedPassword = password.replace(/[^\x20-\x7E]/g, '').trim();
    const cleanedConfirmPassword = confirmPassword.replace(/[^\x20-\x7E]/g, '').trim();

    const payload = {
      userCode: userCode.trim(),
      name,
      email,
      password: cleanedPassword,
      confirmPassword: cleanedConfirmPassword,
      phone,
      address: address || null,
      dateOfBirth: dob || null,
      roleId,
      statusCode: 'ACTIVE',
      experience: role === 'Lecturer' && experience ? parseInt(experience) : null,
      certification: role === 'Lecturer' && selectedCertificates.length > 0 ? selectedCertificates.join(',') : null,
      gender: genderValue,
      createdBy: 'SYSTEM',
    };

    try {
      const response = await fetch('http://localhost:8081/v1/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response không phải JSON hợp lệ');
      }

      const data = await response.json();

      if ((response.status === 201 || response.status === 200) && data.errorStatus === 900) {
        localStorage.setItem('token', data.token); // Assume token is returned
        localStorage.setItem('userCode', userCode);
        localStorage.setItem('userRole', role);
        toast.success('Đăng ký thành công!', {
          onClose: () => navigate(role === 'Student' ? '/home' : '/homeg'),
        });
      } else {
        let errorMessage = 'Đăng ký thất bại. Vui lòng kiểm tra thông tin.';
        if (data.errorStatus === 901) {
          errorMessage = 'Email hoặc tên đăng nhập đã tồn tại.';
        } else if (data.errorStatus === 902) {
          errorMessage = 'Lỗi hệ thống, vui lòng thử lại sau.';
        } else if (data.errorStatus === 905) {
          errorMessage = 'Mật khẩu xác nhận không khớp.';
        } else if (data.errorStatus === 906) {
          errorMessage = 'Mật khẩu không đủ mạnh. Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
        } else {
          errorMessage = data.message || errorMessage;
        }
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Lỗi trong quá trình đăng ký:', error);
      toast.error('Đã xảy ra lỗi: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    signupBgMain: { backgroundColor: 'white' },
    signupHeader: {
      backgroundColor: 'rgb(128, 229, 255)', // Matches existing, assumed to match welcome-header
      padding: '20px 40px', // Slightly increased padding
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Added for depth
    },
    
    signupLogo: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#008cff', // Matches existing
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    
    signupNavContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    
    // Remove signupNavLinks and signupNavLink since they’re redundant on Signup page
    // Add a CTA button (e.g., "Về Trang Chủ")
    signupCtaButton: {
      padding: '10px 20px',
      borderRadius: '20px',
      backgroundColor: '#4299e1', // Matches signupRegisterButton color
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    
    signupCtaButtonHover: {
      backgroundColor: '#3182ce',
      transform: 'scale(1.05)',
    },
    signupNavLinks: { display: 'flex', justifyContent: 'space-between', listStyleType: 'none', margin: '0', paddingRight: '150px' },
    signupNavLink: { textDecoration: 'none', padding: '10px 20px', color: '#333' },
    signupFormContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '650px',
      backgroundColor: 'rgb(255, 255, 255)',
      padding: '50px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      margin: 'auto',
      border: '1px solid #88d5ff',
    },
    signupButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '16px',
      backgroundColor: '#7cb5ff',
      padding: '15px',
      borderRadius: '20px',
      transition: 'background-color 0.3s',
    },
    signupLoginButton: {
      padding: '15px 50px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      backgroundColor: '#edf2f7',
      color: '#005eff',
      transition: 'background-color 0.3s',
    },
    signupRegisterButton: {
      padding: '15px 50px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      backgroundColor: '#4299e1',
      color: 'white',
      marginLeft: '20px',
      transition: 'background-color 0.3s',
    },
    signupFormFields: { display: 'flex', flexDirection: 'column', gap: '20px' },
    signupFormGroup: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' },
    signupFormLabel: { width: '160px', fontWeight: 'bold', textAlign: 'left', marginRight: '15px' },
    signupConditionalField: { marginLeft: '175px' },
    signupFormInput: { flex: 1, padding: '12px', border: '1px solid #a8cbff', borderRadius: '4px', boxSizing: 'border-box' },
    signupFormInputPhone: { flex: 1, padding: '12px', border: '1px solid #a8cbff', borderRadius: '4px', boxSizing: 'border-box' },
    signupFormSelect: { flex: 1, padding: '12px', border: '1px solid #a8cbff', borderRadius: '4px', boxSizing: 'border-box' },
    signupFormPhone: { display: 'flex', gap: '10px', minHeight: '48px' },
    signupFormPassword: { position: 'relative', flex: '1' },
    signupPasswordIcon: { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' },
    signupFormRadioGroup: { display: 'flex', gap: '10px' },
    signupFormRadio: { display: 'flex', alignItems: 'center' },
    signupFormExperience: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
    signupFormFooter: { display: 'flex', justifyContent: 'center', marginTop: '25px' },
    signupFormSubmitBtn: {
      padding: '15px 40px',
      border: 'none',
      backgroundColor: '#008cff',
      color: 'white',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '20px',
      textAlign: 'center',
      transition: 'background-color 0.3s',
    },
    signupCertificateContainer: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' },
    signupCertificateItem: { padding: '8px 16px', backgroundColor: '#f0f0f0', borderRadius: '4px', border: '1px solid #ccc', display: 'flex', alignItems: 'center' },
    signupRemoveCertificateButton: { marginLeft: '8px', padding: '4px 8px', backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s ease' },
    errorText: { color: 'red', fontSize: '12px', marginTop: '5px', marginLeft: '175px' },
  };

  return (
    <div style={styles.signupBgMain}>
      <ToastContainer />
      <header style={styles.signupHeader}>
        <div style={styles.signupLogo}>E LEARNING</div>
        <div style={styles.signupNavContainer}>
          <nav style={styles.signupNavLinks}>
            <a href="#" style={styles.signupNavLink}>Về chúng tôi</a>
            <a href="#" style={styles.signupNavLink}>Khóa học</a>
            <a href="#" style={styles.signupNavLink}>Liên hệ với chúng tôi</a>
            <a href="#" style={styles.signupNavLink}>FAQ's</a>
          </nav>
        </div>
      </header>

      <main style={styles.signupFormContainer}>
        <div style={styles.signupButtonContainer}>
          <Link to="/login">
            <button style={styles.signupLoginButton}>Đăng nhập</button>
          </Link>
          <Link to="/signup">
            <button style={styles.signupRegisterButton}>Đăng ký</button>
          </Link>
        </div>

        <div style={styles.signupFormFields}>
          {/* 1. userCode */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="userCode" style={styles.signupFormLabel}>
              Tên đăng nhập <span style={{ color: 'red' }}>*</span>:
            </label>
            <input
              type="text"
              id="userCode"
              style={styles.signupFormInput}
              placeholder="Nhập tên đăng nhập"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              required
            />
          </div>
          {userCodeError && <div style={styles.errorText}>{userCodeError}</div>}

          {/* 2. password */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="password" style={styles.signupFormLabel}>
              Mật khẩu <span style={{ color: 'red' }}>*</span>:
            </label>
            <div style={styles.signupFormPassword}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                style={styles.signupFormInput}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
                style={styles.signupPasswordIcon}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>

          {/* 3. confirmPassword */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="confirm-password" style={styles.signupFormLabel}>
              Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span>:
            </label>
            <div style={styles.signupFormPassword}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                style={styles.signupFormInput}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i
                className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
                style={styles.signupPasswordIcon}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>
          </div>
          {passwordError && <div style={styles.errorText}>{passwordError}</div>}

          {/* 4. name */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="name" style={styles.signupFormLabel}>
              Họ và tên <span style={{ color: 'red' }}>*</span>:
            </label>
            <input
              type="text"
              id="name"
              style={styles.signupFormInput}
              placeholder="Nhập họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {nameError && <div style={styles.errorText}>{nameError}</div>}

          {/* 5. email */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="email" style={styles.signupFormLabel}>
              Địa chỉ email <span style={{ color: 'red' }}>*</span>:
            </label>
            <input
              type="email"
              id="email"
              style={styles.signupFormInput}
              placeholder="cmc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {emailError && <div style={styles.errorText}>{emailError}</div>}

          {/* 6. phone */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="phone" style={styles.signupFormLabel}>
              Số điện thoại <span style={{ color: 'red' }}>*</span>:
            </label>
            <div style={styles.signupFormPhone}>
              <select id="phone-code" style={styles.signupFormSelect}>
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
                type="text"
                id="phone"
                style={styles.signupFormInputPhone}
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          {phoneError && <div style={styles.errorText}>{phoneError}</div>}

          {/* 7. address */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="address" style={styles.signupFormLabel}>Địa chỉ:</label>
            <input
              type="text"
              id="address"
              style={styles.signupFormInput}
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {addressError && <div style={styles.errorText}>{addressError}</div>}

          {/* 8. dateOfBirth */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="dob" style={styles.signupFormLabel}>Ngày sinh:</label>
            <input
              type="date"
              id="dob"
              style={styles.signupFormInput}
              value={dob}
              onChange={handleDateChange}
            />
          </div>
          {dobError && <div style={styles.errorText}>{dobError}</div>}

          {/* 9. role */}
          <div style={styles.signupFormGroup}>
            <label style={styles.signupFormLabel}>
              Quyền đăng ký <span style={{ color: 'red' }}>*</span>:
            </label>
            <div style={styles.signupFormRadioGroup}>
              <label style={styles.signupFormRadio}>
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={role === 'Student'}
                  onChange={handleRoleChange}
                /> Học viên
              </label>
              <label style={styles.signupFormRadio}>
                <input
                  type="radio"
                  name="role"
                  value="Lecturer"
                  checked={role === 'Lecturer'}
                  onChange={handleRoleChange}
                /> Giảng viên
              </label>
            </div>
          </div>

          {/* 10. experience (nếu role là Giảng viên) */}
          {role === 'Lecturer' && (
            <div style={{ ...styles.signupFormGroup, ...styles.signupConditionalField }}>
              <label htmlFor="experience" style={styles.signupFormLabel}>Năm kinh nghiệm:</label>
              <div style={styles.signupFormExperience}>
                <select
                  id="experience"
                  style={styles.signupFormSelect}
                  value={experience}
                  onChange={handleExperienceChange}
                >
                  <option value="">Chọn số năm</option>
                  {[...Array(21).keys()].slice(1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span>(năm)</span>
              </div>
            </div>
          )}
          {experienceError && <div style={styles.errorText}>{experienceError}</div>}

          {/* 11. certification (nếu role là Giảng viên) */}
          {role === 'Lecturer' && (
            <div style={{ ...styles.signupFormGroup, ...styles.signupConditionalField }}>
              <label htmlFor="certificate" style={styles.signupFormLabel}>Chứng chỉ:</label>
              <div style={styles.signupCertificateContainer}>
                {selectedCertificates.map((certificate, index) => (
                  <div key={index} style={styles.signupCertificateItem}>
                    {certificate}
                    <button
                      type="button"
                      style={styles.signupRemoveCertificateButton}
                      onClick={() => removeCertificate(certificate)}
                    >
                      x
                    </button>
                  </div>
                ))}
                {selectedCertificates.length < 10 && (
                  <select
                    style={styles.signupFormSelect}
                    onChange={(e) => addCertificate(e.target.value)}
                    value=""
                  >
                    <option value="" disabled>Chọn chứng chỉ</option>
                    {availableCertificates.map((certificate, index) => (
                      <option key={index} value={certificate}>{certificate}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}

          {/* 12. gender */}
          <div style={styles.signupFormGroup}>
            <label style={styles.signupFormLabel}>Giới tính:</label>
            <div style={styles.signupFormRadioGroup}>
              <label style={styles.signupFormRadio}>
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={gender === 'Nam'}
                  onChange={(e) => setGender(e.target.value)}
                /> Nam
              </label>
              <label style={styles.signupFormRadio}>
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={gender === 'Nữ'}
                  onChange={(e) => setGender(e.target.value)}
                /> Nữ
              </label>
            </div>
          </div>

          <div style={styles.signupFormFooter}>
            <button
              type="button"
              style={styles.signupFormSubmitBtn}
              onClick={handleSignup}
              disabled={isLoading || userCodeError || passwordError || nameError || emailError || phoneError || addressError || dobError || experienceError}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;