import React, { useState } from 'react';
import { CListGroup } from '@coreui/react';
import { Link } from 'react-router-dom';
import './course.css';

const CourseReactJS = () => {
  const [courseContent, setCourseContent] = useState([
    { title: "Giới thiệu về ReactJS" },
    { title: "Cơ bản về ES6+" },
    { title: "React & React DOM" },
    { title: "JSX và Components" },
    { title: "State và Props" },
    { title: "Lifecycle Methods" },
    { title: "Hooks" },
    { title: "Routing với React Router" },
    { title: "Quản lý State với Redux" },
    { title: "Dự án cuối khóa: Xây dựng ứng dụng giống Tiktok" }
  ]);

  return (
    <>
      <div className="courseReactJS-container">
        <div className="courseReactJS-info">
          <h2>Xây Dựng Website với ReactJS</h2>
          <p>
            Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ có một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.
          </p>
          <CListGroup className="courseReactJS-stars">
            <h2>Bạn sẽ được học những gì?</h2>
            <i className="fas fa-star">A</i>
            <i className="fas fa-star">B</i>
            <i className="fas fa-star">C</i>
            <i className="fas fa-star">D</i>
            <i className="fas fa-star">E</i>
          </CListGroup>
        </div>
        <div className="courseReactJS-image-section">
          <img src="https://placehold.co/300x200" alt="Course" className="courseReactJS-image" />
          <div className="courseReactJS-register-button">
            <Link to="/learn1">
              <button>Đăng ký ngay</button>
            </Link>
          </div>
          <div className="courseReactJS-date-time">
            <p><i className="fas fa-calendar-alt"></i> Ngày: 03/04/2025</p>
            <p><i className="fas fa-clock"></i> Giờ: 09:32 AM</p>
            <p><i className="fas fa-chalkboard-teacher"></i> Giảng viên: Nguyễn Văn A</p>
          </div>
        </div>
      </div>
      <div className="courseReactJS-content">
        <h3>Nội dung khóa học</h3>
        <div className="courseReactJS-accordion">
          {courseContent.map((item, index) => (
            <div className="courseReactJS-accordion-item" key={index}>
              <button>
                <span><i className="fas fa-book-open"></i> {index + 1}. {item.title}</span>  
                <i className="fas fa-lock"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseReactJS;