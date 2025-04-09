import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Signup = () => {
  const [role, setRole] = useState("Học viên");
  const [dob, setDob] = useState(""); // State to manage date of birth

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDob(selectedDate); // Update the state with the selected date
    console.log("Selected Date:", selectedDate);
  };

  const availableCertificates = ["AWS", "OCPJP", "Azure", "GCP", "CCNA", "PMP", "ITIL", "CISSP", "CEH", "CompTIA"];
  const [selectedCertificates, setSelectedCertificates] = useState([]);

  const addCertificate = (certificate) => {
    if (selectedCertificates.length < 10 && !selectedCertificates.includes(certificate)) {
      setSelectedCertificates([...selectedCertificates, certificate]);
    }
  };

  const removeCertificate = (certificate) => {
    setSelectedCertificates(selectedCertificates.filter((item) => item !== certificate));
  };

  const styles = {
    signupBgMain: {
      backgroundColor: 'white',
    },
    signupHeader: {  
      backgroundColor: 'rgb(128, 229, 255)',  
      padding: '20px',  
      display: 'flex',  
      justifyContent: 'space-between',  
      alignItems: 'center',  
    },  
    signupLogo: {  
      fontSize: '30px',  
      fontWeight: 'bold',  
      color: '#008cff',  
    },  
    signupNavContainer: {  
      display: 'flex',  
      alignItems: 'center',  
      gap: '16px',  
      margin: '5px',  
    },  
    signupNavLinks: {  
      display: 'flex',  
      justifyContent: 'space-between',  
      listStyleType: 'none',  
      margin: '0',   
      paddingRight: '150px',                 
    },  
    signupNavLink: {  
      textDecoration: 'none',  
      padding: '10px 20px',  
      color: '#333',  
    },  
    signupNavLinkHover: {  
      color: '#67a9ff',  
    },  
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
    signupFormFields: {  
      display: 'flex',  
      flexDirection: 'column',  
      gap: '20px',  
    },  
    signupFormGroup: {  
      display: 'flex',  
      flexDirection: 'row',  
      alignItems: 'center',  
      width: '100%',  
    },  
    signupFormLabel: {  
      width: '160px',  
      fontWeight: 'bold',  
      textAlign: 'left',  
      marginRight: '15px',  
    },  
    signupConditionalField: {  
      marginTop: '15px',  
    },  
    signupFormInput: {  
      flex: 1,  
      padding: '12px',  
      border: '1px solid #a8cbff',  
      borderRadius: '4px',  
      boxSizing: 'border-box',  
    },  
    signupFormInputPhone: {  
      flex: 1,  
      padding: '12px',  
      border: '1px solid #a8cbff',  
      borderRadius: '4px',  
      boxSizing: 'border-box',  
    },  
    signupFormSelect: {  
      flex: 1,  
      padding: '12px',  
      border: '1px solid #a8cbff',  
      borderRadius: '4px',  
      boxSizing: 'border-box',  
    },  
    signupFormPhone: {  
      display: 'flex',  
      gap: '10px',  
      minHeight: '48px',  
    },  
    signupFormPassword: {  
      position: 'relative',  
    },  
    signupPasswordIcon: {  
      position: 'absolute',  
      right: '30px',  
      top: '50%',  
      transform: 'translateY(-50%)',  
      cursor: 'pointer',  
    },  
    signupFormRadioGroup: {  
      display: 'flex',  
      gap: '10px',  
    },  
    signupFormRadio: {  
      display: 'flex',  
      alignItems: 'center',  
    },  
    signupFormExperience: {  
      display: 'flex',  
      alignItems: 'center',  
      gap: '10px',  
      marginBottom: '20px',  
    },  
    signupFormFooter: {  
      display: 'flex',  
      justifyContent: 'center',  
      marginTop: '25px',  
    },  
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
    signupCertificateContainer: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
    },
    signupCertificateItem: {
      padding: '8px 16px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
    },
    signupRemoveCertificateButton: {
      marginLeft: '8px',
      padding: '4px 8px',
      backgroundColor: '#dc3545',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    signupRemoveCertificateButtonHover: {
      backgroundColor: '#c82333',
    },
  };

  return (
    <div style={styles.signupBgMain}>
      {/* Header */}
      <header style={styles.signupHeader}>
        <div href="#" style={styles.signupLogo}>E LEARNING</div>
        <div style={styles.signupNavContainer}>
          <nav style={styles.signupNavLinks}>
            <a href="#" style={styles.signupNavLink}>Về chúng tôi</a>
            <a href="#" style={styles.signupNavLink}>Khóa học</a>
            <a href="#" style={styles.signupNavLink}>Liên hệ với chúng tôi</a>
            <a href="#" style={styles.signupNavLink}>FAQ's</a>
          </nav>
        </div>
      </header>

      {/* Main Form */}
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
          {/* Email */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="email" style={styles.signupFormLabel}>
              Địa chỉ email <span className="signup-required">*</span>:
            </label>
            <input
              type="email"
              id="email"
              style={styles.signupFormInput}
              placeholder="cmc@gmail.com"
            />
          </div>

          {/* Phone */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="phone" style={styles.signupFormLabel}>
              Số điện thoại <span className="signup-required">*</span>:
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
              />
            </div>
          </div>

          {/* Name */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="name" style={styles.signupFormLabel}>
              Họ và tên <span className="signup-required">*</span>:
            </label>
            <input
              type="text"
              id="name"
              style={styles.signupFormInput}
              placeholder="Nhập tên"
            />
          </div>

          {/* Username */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="username" style={styles.signupFormLabel}>
              Tên đăng nhập <span className="signup-required">*</span>:
            </label>
            <input
              type="text"
              id="username"
              style={styles.signupFormInput}
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          {/* Password */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="password" style={styles.signupFormLabel}>
              Mật khẩu <span className="signup-required">*</span>:
            </label>
            <div style={styles.signupFormPassword}>
              <input
                type="password"
                id="password"
                style={styles.signupFormInput}
                placeholder="Nhập mật khẩu"
              />
              <i className="fas fa-eye" style={styles.signupPasswordIcon}></i>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="confirm-password" style={styles.signupFormLabel}>
              Nhập lại mật khẩu <span className="signup-required">*</span>:
            </label>
            <div style={styles.signupFormPassword}>
              <input
                type="password"
                id="confirm-password"
                style={styles.signupFormInput}
                placeholder="Nhập lại mật khẩu"
              />
              <i className="fas fa-eye" style={styles.signupPasswordIcon}></i>
            </div>
          </div>

          {/* Additional Fields */}
          <div style={styles.signupFormRow}>
            {/* Date of Birth */}
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
          </div>

          {/* Gender */}
          <div style={styles.signupFormGroup}>
            <label style={styles.signupFormLabel}>Giới tính:</label>
            <div style={styles.signupFormRadioGroup}>
              <label style={styles.signupFormRadio}>
                <input type="radio" name="gender" defaultChecked /> Nam
              </label>
              <label style={styles.signupFormRadio}>
                <input type="radio" name="gender" /> Nữ
              </label>
            </div>
          </div>

          {/* Address */}
          <div style={styles.signupFormGroup}>
            <label htmlFor="address" style={{ ...styles.signupFormLabel, padding: '20px 0' }}>Địa chỉ:</label>
            <input
              type="text"
              id="address"
              style={styles.signupFormInput}
              placeholder="Nhập địa chỉ"
            />
          </div>

          {/* Role */}
          <div style={styles.signupFormGroup}>
            <label style={styles.signupFormLabel}>Quyền đăng ký:</label>
            <div style={styles.signupFormRadioGroup}>
              <label style={styles.signupFormRadio}>
                <input
                  type="radio"
                  name="role"
                  value="Học viên"
                  checked={role === "Học viên"}
                  onChange={handleRoleChange}
                /> Học viên
              </label>
              <label style={styles.signupFormRadio}>
                <input
                  type="radio"
                  name="role"
                  value="Giảng viên"
                  checked={role === "Giảng viên"}
                  onChange={handleRoleChange}
                /> Giảng viên
              </label>
            </div>
          </div>

          {/* Conditional Fields */}
          {role === "Giảng viên" && (
            <>
              {/* Certificate */}
              <div style={{ ...styles.signupFormGroup, ...styles.signupConditionalField }}>
                <label htmlFor="certificate" style={styles.signupFormLabel}>Chứng chỉ:</label>
                <div style={styles.signupCertificateContainer}>
                  {selectedCertificates.map((certificate, index) => (
                    <div key={index} style={styles.signupCertificateItem}>
                      {certificate}
                      <button type="button" style={styles.signupRemoveCertificateButton} onClick={() => removeCertificate(certificate)}>x</button>
                    </div>
                  ))}
                  {selectedCertificates.length < 10 && (
                    <select style={styles.signupFormSelect} onChange={(e) => addCertificate(e.target.value)}>
                      <option value="" disabled selected>Select a certificate</option>
                      {availableCertificates.map((certificate, index) => (
                        <option key={index} value={certificate}>{certificate}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div style={{ ...styles.signupFormGroup, ...styles.signupConditionalField }}>
                <label htmlFor="experience" style={styles.signupFormLabel}>Năm kinh nghiệm:</label>
                <div style={styles.signupFormExperience}>
                  <select id="experience" style={styles.signupFormSelect}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                  </select>
                  <span>(năm)</span>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div style={styles.signupFormFooter}>
            <button type="submit" style={styles.signupFormSubmitBtn}>Đăng ký</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;