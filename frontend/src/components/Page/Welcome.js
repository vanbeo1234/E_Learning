import React from 'react';
import "./styles.css";
function Welcome() {
  const courses = [
    { title: 'SQL', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'Java', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'Python', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'C#', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'HTML', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'React', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'JavaScript', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
    { title: 'CSS', image: 'https://storage.googleapis.com/a1aa/image/0TzyXeqJ-3SrhNVPfxvj8ePIWFBxnJLCDSIO-0TWOhU.jpg' },
  ];
 
  return (
    <div className="bg-white">
          <header className="header">
        <div href="#" className="logo" >E-LEARNING</div>
        <div className="nav-container">
            <nav className="nav-links">
                <a href="#">Về chúng tôi</a>
                <a href="#">Khóa học</a>
                <a href="#">Liên hệ với chúng tôi</a>
                <a href="#">FAQ's</a>
            </nav>
            <button className="nav-button">THAM GIA NGAY</button>  
        </div>    
    </header>
 
      {/* Main Section */}
      <main className="main">
      <div className="title-container">
        <button className="carousel-arrow"><i className="fas fa-chevron-left"></i></button>
        <div className="title-content">
          <h1 className="main-title">Nền tảng học trực tuyến tốt nhất</h1>
          <p className="main-text">
            E-learning là phương pháp học tập trực tuyến, linh hoạt và tiện lợi. Nó cung cấp kiến thức đa dạng, dễ tiếp cận, giúp người học tự chủ thời gian và không gian học tập.
          </p>
        </div>
        <button className="carousel-arrow"><i className="fas fa-chevron-right"></i></button>
      </div>
      <div className="main-carousel">
        <div className="carousel-dots">
          <span className="dot"></span>
          <span className="dot dot-active"></span>
          <span className="dot"></span>
        </div>
      </div>
      <section className="main-features">
        <div className="feature">
          <i className="fas fa-chalkboard-teacher feature-icon"></i>
          <h3 className="feature-title">Giảng viên kỹ năng cao</h3>
          <p className="feature-text">
            E-learning là phương pháp học trực tuyến với giảng viên kỹ năng cao. Nó cung cấp kiến thức đa dạng, dễ tiếp cận, giúp người học tự chủ thời gian và không gian học tập.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-laptop feature-icon"></i>
          <h3 className="feature-title">Lớp học trực tuyến</h3>
          <p className="feature-text">
            Lớp học trực tuyến cung cấp kiến thức đa dạng, dễ tiếp cận. Giúp người học tự chủ thời gian và không gian học tập.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-project-diagram feature-icon"></i>
          <h3 className="feature-title">Trang chủ Dự án</h3>
          <p className="feature-text">
            Trang chủ dự án cung cấp kiến thức đa dạng, dễ tiếp cận. Giúp người học tự chủ thời gian và không gian học tập.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-book feature-icon"></i>
          <h3 className="feature-title">Thư viện sách</h3>
          <p className="feature-text">
            Thư viện sách cung cấp kiến thức đa dạng, dễ tiếp cận. Giúp người học tự chủ thời gian và không gian học tập.
          </p>
        </div>
      </section>
    </main>
 
      {/* Welcome Section */}
      <section className="welcome">
        <h1 className="welcome-title">Chào mừng đến với E-LEARNING</h1>
        <p className="welcome-text">
          E-learning là phương pháp học trực tuyến với giảng viên kỹ năng cao. Nó cung cấp kiến thức đa dạng, dễ tiếp cận, giúp người học tự chủ thời gian và không gian học tập.
        </p>
        <p className="welcome-text-extended">
          E-learning là phương pháp học trực tuyến, cho phép người học tiếp cận kiến thức mọi lúc, mọi nơi. Với sự hỗ trợ của công nghệ, e-learning cung cấp các khóa học đa dạng, từ kỹ năng mềm đến chuyên môn sâu. Giảng viên kỹ năng cao hướng dẫn, giúp học viên tự chủ thời gian và không gian học tập.
        </p>
        <div className="welcome-features">
          <ul className="feature-list">
            <li className="feature-item">
              <i className="fas fa-arrow-right feature-icons"></i>
              <span>Giảng viên kỹ năng cao trong lĩnh vực</span>
            </li>
            <li className="feature-item">
              <i className="fas fa-arrow-right feature-icons"></i>
              <span>Nội dung phong phú và đa dạng</span>
            </li>
            <li className="feature-item">
              <i className="fas fa-arrow-right feature-icons"></i>
              <span>Giáo viên chứng chỉ quốc tế</span>
            </li>
          </ul>
          <ul className="feature-list">
            <li className="feature-item">
              <i className="fas fa-arrow-right feature-icons"></i>
              <span>Cung cấp dịch vụ hỗ trợ học viên 24/7</span>
            </li>
            <li className="feature-item">
              <i className="fas fa-arrow-right feature-icons"></i>
              <span>Linh hoạt trong việc học tập</span>
            </li>
            <li className="feature-item">
              <i className="fas fa-arrow-right feature-icons"></i>
              <span>Công nghệ tiên tiến</span>
            </li>
          </ul>
        </div>
      </section>
 
      {/* Course Categories */}
      <section className="courses">
        <h1 className="courses-title">Danh mục khóa học</h1>
        <div className="courses-container">
          <div className="course-row">
            {courses.slice(0, 4).map((course, index) => (
              <article className="course" key={index}>
                <img alt={`Hình minh họa khóa học ${course.title}`} className="course-image" src={course.image} />
                <h2 className="course-title">{course.title}</h2>
                <div className="course-duration">
                  <i className="fas fa-clock"></i>
                  <span>3 tháng</span>
                </div>
                <p className="course-text">Khóa học 3 tháng</p>
                <button className="course-button">Đọc thêm</button>
                <button className="course-button">Tham gia</button>
              </article>
            ))}
          </div>
          <div className="course-row">
            {courses.slice(4).map((course, index) => (
              <article className="course" key={index}>
                <img alt={`Hình minh họa khóa học ${course.title}`} className="course-image" src={course.image} />
                <h2 className="course-title">{course.title}</h2>
                <div className="course-duration">
                  <i className="fas fa-clock"></i>
                  <span>3 tháng</span>
                </div>
                <p className="course-text">Khóa học 3 tháng</p>
                <button className="course-button">Đọc thêm</button>
                <button className="course-button">Tham gia</button>
              </article>
            ))}
          </div>
        </div>
      </section>
 
      {/* Popular Courses */}
      <section className="popular-courses">
        <h1 className="popular-courses-title">Các khóa học phổ biến</h1>
        <div className="popular-courses-container">
          {[1, 2, 3].map((_, index) => (
            <article className="popular-course" key={index}>
              <img
                alt="Hình minh họa khóa học Web"
                className="popular-course-image"
                src="https://storage.googleapis.com/a1aa/image/996Q1kC_BHODSbe9ueOTcZmGW2Ylck3urTM8KJFUtCM.jpg"
                width="200"
                height="150"
              />
              <h2 className="popular-course-title">Khóa học Thiết kế & Phát triển Web dành cho Người mới bắt đầu</h2>
              <div className="popular-course-rating">
                <span>5.0</span>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="popular-course-buttons">
                <button className="popular-course-button">Đọc Thêm</button>
                <button className="popular-course-button">Tham Gia</button>
              </div>
            </article>
          ))}
        </div>
      </section>
 
      {/* Instructors */}
      <section className="instructors">
        <h1 className="instructors-title">Giảng viên chuyên môn</h1>
        <div className="instructors-container">
          {[1, 2, 3, 4].map((_, index) => (
            <div className="instructor" key={index}>
              <img
                alt={`Ảnh giảng viên ${index + 1}`}
                className="instructor-image"
                src="https://storage.googleapis.com/a1aa/image/fzt_zb5xY9rlmhS2Piqv5aEtIK_aEE2zKNJUxAs4uy8.jpg"
                width="100"
                height="100"
              />
              <div className="instructor-name">Tên giảng viên</div>
              <div className="instructor-title">Chức danh</div>
              <div className="instructor-social">
                <a href="https://instagram.com" aria-label="Instagram" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://facebook.com" aria-label="Facebook" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com" aria-label="X" className="social-link">
                  <i className="fab fa-x-twitter"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* Testimonials */}
      <section className="testimonials">
        <h1 className="testimonials-title">Học viên của chúng tôi nói!</h1>
        <div className="testimonial">
          <img
            alt="Ảnh học viên"
            className="testimonial-image"
            src="https://storage.googleapis.com/a1aa/image/R-JYgEGJ4EVoZdlR2ttR37wWKr196gguaIGLleYGnbc.jpg"
            width="100"
            height="100"
          />
          <div className="testimonial-name">Tên học viên</div>
          <div className="testimonial-occupation">Nghề nghiệp</div>
          <div className="testimonial-text">
            "Khóa học e-learning này thật tuyệt vời! Giảng viên kỹ năng cao, nội dung phong phú và dễ hiểu. Tôi có thể học mọi lúc, mọi nơi. Rất hài lòng và sẽ giới thiệu cho bạn bè." 🌟📚
          </div>
          <div className="testimonial-pagination">
            <span className="pagination-dot"></span>
            <span className="pagination-dot"></span>
            <span className="pagination-dot"></span>
          </div>
        </div>
      </section>
 
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2 className="footer-title" aria-label="Thông tin liên hệ E-Learning">Contact</h2>
            <p>Điện thoại: +84 123456789</p>
            <p>Email: <a href="mailto:contact@elearning.vn">contact@elearning.vn</a></p>
            <p>Địa chỉ: <a href="https://maps.google.com/?q=Cau+Giay,+Ha+Noi" target="_blank" rel="noopener noreferrer">Cầu Giấy - Hà Nội</a></p>
            <div className="instructor-social">
              <a href="https://instagram.com/elearningvn" aria-label="Instagram" className="social-link" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/elearningvn" aria-label="Facebook" className="social-link" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/elearningvn" aria-label="X" className="social-link" rel="noopener noreferrer">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 E-Learning. Nền tảng trực tuyến hàng đầu Việt Nam</p>
        </div>
      </footer>
 
      {/* Scroll to Top */}
      <div className="scroll-top">
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
}
 
export default Welcome;