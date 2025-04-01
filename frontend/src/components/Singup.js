import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
function Singup() {
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
    signupHeader: {
      backgroundColor: "rgb(19, 208, 255)",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    signupLogo: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#008cff",
    },
  
    signupNavContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      margin: "5px",
    },
  
    signupNavLinks: {
      display: "flex",
      justifyContent: "space-between",
      listStyleType: "none",
      margin: "0",
      paddingRight: "150px",
    },
  
    signupNavLink: {
      textDecoration: "none",
      padding: "10px 20px",
      color: "#333",
    },
  
    signupNavLinkHover: {
      color: "#67a9ff",
    },
  
    signupFormContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      maxWidth: "650px",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      margin: "auto",
    },
  
    signupButtonContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "16px",
      backgroundColor: "#7cb5ff",
      padding: "15px",
      borderRadius: "20px",
      transition: "background-color 0.3s",
    },
  
    signupLoginButton: {
      padding: "15px 50px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s",
      backgroundColor: "#edf2f7",
      color: "#005eff",
    },
  
    signupRegisterButton: {
      padding: "15px 50px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s",
      backgroundColor: "#4299e1",
      color: "white",
      marginLeft: "20px",
    },
  
    signupFormFields: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  
    signupFormGroup: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
  
    signupFormLabel: {
      width: "160px",
      fontWeight: "bold",
      textAlign: "left",
      marginRight: "15px",
    },
  
    signupConditionalField: {
      marginTop: "15px",
    },
  
    signupFormInput: {
      flex: "1",
      padding: "12px",
      border: "1px solid #a8cbff",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
  
    signupFormPhone: {
      display: "flex",
      gap: "10px",
      minHeight: "48px",
    },
  
    signupFormPassword: {
      position: "relative",
    },
  
    signupPasswordIcon: {
      position: "absolute",
      right: "30px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
  
    signupFormRadioGroup: {
      display: "flex",
      gap: "10px",
    },
  
    signupFormRadio: {
      display: "flex",
      alignItems: "center",
    },
  
    signupFormExperience: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    },
  
    signupFormFooter: {
      display: "flex",
      justifyContent: "center",
      marginTop: "25px",
    },
  
    signupFormSubmitBtn: {
      padding: "15px 40px",
      border: "none",
      backgroundColor: "#008cff",
      color: "white",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "20px",
      textAlign: "center",
      transition: "background-color 0.3s",
    },
  
    signupCertificateContainer: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "8px",
    },
  
    signupCertificateItem: {
      padding: "8px 16px",
      backgroundColor: "#f0f0f0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      display: "flex",
      alignItems: "center",
    },
  
    signupRemoveCertificateButton: {
      marginLeft: "8px",
      padding: "4px 8px",
      backgroundColor: "#dc3545",
      border: "none",
      borderRadius: "4px",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  
    signupRemoveCertificateButtonHover: {
      backgroundColor: "#c82333",
    },
  
    signupFormSelect: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
  };
  
    return (
      <div className="bg-signup">
        {/* Header */}
        <header className="signup-header">
          <div href="#" className="signup-logo">E LEARNING</div>
          <div className="signup-nav-container">
            <nav className="signup-nav-links">
              <a href="#">Về chúng tôi</a>
              <a href="#">Khóa học</a>
              <a href="#">Liên hệ với chúng tôi</a>
              <a href="#">FAQ's</a>
            </nav>
          </div>
        </header>
  
        {/* Main Form */}
        <main className="signup-form-container">
          <div className="signup-button-container">
            <Link to="/login">
              <button className="signup-login-button">Đăng nhập</button>
            </Link>
            <Link to="/signup">
              <button className="signup-register-button">Đăng kí</button>
            </Link>
          </div>
  
          <form>
            <div className="signup-form-fields">
              {/* Email */}
              <div className="signup-form-group">
                <label htmlFor="email" className="signup-form-label">
                  Địa chỉ email <span className="signup-required">*</span>:
                </label>
                <input
                  type="email"
                  id="email"
                  className="signup-form-input"
                  placeholder="cmc@gmail.com"
                />
              </div>
  
              {/* Phone */}
              <div className="signup-form-group">
                <label htmlFor="phone" className="signup-form-label">
                  Số điện thoại <span className="signup-required">*</span>:
                </label>
                <div className="signup-form-phone">
                  <select id="phone-code" className="signup-form-select">
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
                    className="signup-form-input-phone"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
  
              {/* Name */}
              <div className="signup-form-group">
                <label htmlFor="name" className="signup-form-label">
                  Họ và tên <span className="signup-required">*</span>:
                </label>
                <input
                  type="text"
                  id="name"
                  className="signup-form-input"
                  placeholder="Nhập tên"
                />
              </div>
  
              {/* Username */}
              <div className="signup-form-group">
                <label htmlFor="username" className="signup-form-label">
                  Tên đăng nhập <span className="signup-required">*</span>:
                </label>
                <input
                  type="text"
                  id="username"
                  className="signup-form-input"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
  
              {/* Password */}
              <div className="signup-form-group">
                <label htmlFor="password" className="signup-form-label">
                  Mật khẩu <span className="signup-required">*</span>:
                </label>
                <div className="signup-form-password">
                  <input
                    type="password"
                    id="password"
                    className="signup-form-input"
                    placeholder="Nhập mật khẩu"
                  />
                  <i className="fas fa-eye signup-password-icon"></i>
                </div>
              </div>
  
              {/* Confirm Password */}
              <div className="signup-form-group">
                <label htmlFor="confirm-password" className="signup-form-label">
                  Nhập lại mật khẩu <span className="signup-required">*</span>:
                </label>
                <div className="signup-form-password">
                  <input
                    type="password"
                    id="confirm-password"
                    className="signup-form-input"
                    placeholder="Nhập lại mật khẩu"
                  />
                  <i className="fas fa-eye signup-password-icon"></i>
                </div>
              </div>
  
              {/* Additional Fields */}
              <div className="signup-form-row">
                {/* Date of Birth */}
                <div className="signup-form-group">
                  <label htmlFor="dob" className="signup-form-label">Ngày sinh:</label>
                  <input
                    type="date"
                    id="dob"
                    className="signup-form-input"
                    value={dob}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
  
              {/* Gender */}
              <div className="signup-form-group">
                <label className="signup-form-label">Giới tính:</label>
                <div className="signup-form-radio-group">
                  <label className="signup-form-radio">
                    <input type="radio" name="gender" defaultChecked /> Nam
                  </label>
                  <label className="signup-form-radio">
                    <input type="radio" name="gender" /> Nữ
                  </label>
                </div>
              </div>
  
              {/* Address */}
              <div className="signup-form-group">
                <label htmlFor="address" className="signup-form-label">
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  id="address"
                  className="signup-form-input"
                  placeholder="Nhập địa chỉ"
                />
              </div>
  
              {/* Role */}
              <div className="signup-form-group">
                <label className="signup-form-label">Quyền đăng kí:</label>
                <div className="signup-form-radio-group">
                  <label className="signup-form-radio">
                    <input
                      type="radio"
                      name="role"
                      value="Học viên"
                      checked={role === "Học viên"}
                      onChange={handleRoleChange}
                    /> Học viên
                  </label>
                  <label className="signup-form-radio">
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
                  <div className="signup-form-group conditional-field">
                    <label htmlFor="certificate" className="signup-form-label">Chứng chỉ:</label>
                    <div className="signup-certificate-container">
                      {selectedCertificates.map((certificate, index) => (
                        <div key={index} className="signup-certificate-item">
                          {certificate}
                          <button
                            type="button"
                            className="signup-remove-certificate-button"
                            onClick={() => removeCertificate(certificate)}
                          >
                            x
                          </button>
                        </div>
                      ))}
                      {selectedCertificates.length < 10 && (
                        <select
                          className="signup-form-select"
                          onChange={(e) => addCertificate(e.target.value)}
                        >
                          <option value="" disabled selected>Select a certificate</option>
                          {availableCertificates.map((certificate, index) => (
                            <option key={index} value={certificate}>{certificate}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
  
                  {/* Experience */}
                  <div className="signup-form-group conditional-field">
                    <label htmlFor="experience" className="signup-form-label">Năm kinh nghiệm:</label>
                    <div className="signup-form-experience">
                      <select id="experience" className="signup-form-select">
                        {[...Array(20).keys()].map((year) => (
                          <option key={year + 1} value={year + 1}>{year + 1}</option>
                        ))}
                      </select>
                      <span>(năm)</span>
                    </div>
                  </div>
                </>
              )}
            </div>
  
            {/* Submit Button */}
            <div className="signup-form-footer">
              <button type="submit" className="signup-form-submit-btn">Đăng kí</button>
            </div>
          </form>
        </main>
      </div>
    );
  }
  
  export default Singup;