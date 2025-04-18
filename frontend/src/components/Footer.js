import React from 'react';

const Footer = () => {
  // Define styles as objects
  const footerStyle = {
    backgroundColor: '#222',
    color: 'white',
    padding: '20px 0',
  };

  const footerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
  };

  const footerSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  };

  const footerLogoStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const footerLogoImgStyle = {
    maxWidth: '100px',
    marginBottom: '10px',
  };

  const companyNameStyle = {
    fontWeight: 'bold',
  };

  const footerContactStyle = {
    margin: '5px 0',
  };

  const dmcaImgStyle = {
    marginTop: '10px',
    width: '100px',
  };

  const footerLinksStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 2,
  };

  const footerLinksDivStyle = {
    width: '30%',
  };

  const footerLinkListStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const footerLinkItemStyle = {
    textDecoration: 'none',
    color: '#bbb',
    marginBottom: '8px',
    display: 'block',
  };

  const footerLinkItemHoverStyle = {
    color: '#fff',
  };

  const footerBottomStyle = {
    backgroundColor: '#111',
    color: '#ccc',
    textAlign: 'center',
    padding: '10px 0',
  };

  const footerSocialsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  };

  const footerSocialIconStyle = {
    color: '#bbb',
    fontSize: '20px',
    textDecoration: 'none',
  };

  const footerCompanyInfoStyle = {
    marginTop: '20px',
  };

  const footerCompanyInfoTitleStyle = {
    fontSize: '18px',
    marginBottom: '10px',
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        <div style={footerSectionStyle}>
          <div style={footerLogoStyle}>
            <img src="logo.png" alt="Logo" style={footerLogoImgStyle} />
            <p style={companyNameStyle}>F8 Học Lập Trình Để Đi Làm</p>
          </div>
          <div style={footerContactStyle}>
            <p><strong>Điện thoại:</strong> 08 1919 8989</p>
            <p><strong>Email:</strong> contact@fullstack.edu.vn</p>
            <p><strong>Địa chỉ:</strong> Số 1, ngõ 41, Trần Duy Hùng, Cầu Giấy, Hà Nội</p>
            <div>
              <img src="dmca-logo.png" alt="DMCA Protected" style={dmcaImgStyle} />
            </div>
          </div>
        </div>

        <div style={footerLinksStyle}>
          <div style={footerLinksDivStyle}>
            <h3>Về F8</h3>
            <ul style={footerLinkListStyle}>
              <li><a href="#" style={footerLinkItemStyle}>Giới thiệu</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Liên hệ</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Điều khoản</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Bảo mật</a></li>
            </ul>
          </div>

          <div style={footerLinksDivStyle}>
            <h3>Sản phẩm</h3>
            <ul style={footerLinkListStyle}>
              <li><a href="#" style={footerLinkItemStyle}>Game Nester</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Game CSS Diner</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Game CSS Selectors</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Game Froggy</a></li>
            </ul>
          </div>

          <div style={footerLinksDivStyle}>
            <h3>Công cụ</h3>
            <ul style={footerLinkListStyle}>
              <li><a href="#" style={footerLinkItemStyle}>Tạo CV xin việc</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Rút gọn liên kết</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Clip-path maker</a></li>
              <li><a href="#" style={footerLinkItemStyle}>Snippet generator</a></li>
            </ul>
          </div>

          <div style={footerCompanyInfoStyle}>
            <h3 style={footerCompanyInfoTitleStyle}>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8</h3>
            <p><strong>Mã số thuế:</strong> 0109922901</p>
            <p><strong>Ngày thành lập:</strong> 04/03/2022</p>
            <p><strong>Lĩnh vực hoạt động:</strong> Giáo dục, công nghệ - lập trình.</p>
          </div>
        </div>
      </div>

      <div style={footerBottomStyle}>
        <p>&copy; 2018 - 2025 F8. Nền tảng học lập trình hàng đầu Việt Nam</p>
        <div style={footerSocialsStyle}>
          <a href="#" style={footerSocialIconStyle}><i className="fab fa-facebook"></i></a>
          <a href="#" style={footerSocialIconStyle}><i className="fab fa-youtube"></i></a>
          <a href="#" style={footerSocialIconStyle}><i className="fab fa-twitter"></i></a>
          <a href="#" style={footerSocialIconStyle}><i className="fab fa-tiktok"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
