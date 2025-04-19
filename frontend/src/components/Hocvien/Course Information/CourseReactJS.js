import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CListGroup } from '@coreui/react';
import './course.css';

const CourseReactJS = () => {
  const [courseData, setCourseData] = useState({
    courseContent: [],
    courseInfo: {},
    courseVideo: "",
    courseDateTime: {},
    instructorName: "",
    learnWhatYouGet: []
  });

  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fakeApiResponse = {
      courseContent: [
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
      ],
      courseInfo: {
        title: "Xây Dựng Website với ReactJS",
        description: "Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ có một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này."
      },
      courseVideo: "https://www.youtube.com/embed/dGcsHMXbSOA",
      courseDateTime: {
        date: "03/04/2025",
        time: "09:32 AM"
      },
      instructorName: "Nguyễn Văn A",
      learnWhatYouGet: [
        "Hiểu và làm chủ ReactJS từ cơ bản đến nâng cao.",
        "Sử dụng JSX để tạo giao diện động.",
        "Quản lý trạng thái (State) và thuộc tính (Props) trong React.",
        "Làm quen với các phương thức vòng đời của React components.",
        "Sử dụng hooks như useState, useEffect, và các hooks khác trong React.",
        "Tạo ứng dụng React hoàn chỉnh và sử dụng React Router để điều hướng giữa các trang.",
        "Hiểu cách sử dụng Redux để quản lý state trong các ứng dụng React lớn."
      ]
    };

    setTimeout(() => {
      setCourseData(fakeApiResponse);
      setLoading(false);
    }, 2000);
  }, []);

  const handleRegister = () => {
    setShowPopup(true);
    setIsRegistered(true);
    // Tự động ẩn popup sau 2s
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleStartCourse = () => {
    navigate("/learn1");
  };

  return (
    <>
      <div className="courseReactJS-container">
        <div className="courseReactJS-info">
          <h2>{loading ? "Đang tải..." : courseData.courseInfo.title}</h2>
          <p>{loading ? "Đang tải mô tả khóa học..." : courseData.courseInfo.description}</p>

          <CListGroup className="courseReactJS-stars">
            <h2>Bạn sẽ được học những gì?</h2>
            {loading ? (
              <p>Đang tải nội dung...</p>
            ) : (
              courseData.learnWhatYouGet.map((item, index) => (
                <div className="courseReactJS-item" key={index}>
                  <i className="fas fa-arrow-right"></i> {item}
                </div>
              ))
            )}
          </CListGroup>
        </div>

        <div className="courseReactJS-image-section">
          <div className="courseReactJS-video-wrapper">
            {loading ? (
              <p>Đang tải video...</p>
            ) : (
              <iframe
                width="100%"
                height="215"
                src={courseData.courseVideo}
                title="ReactJS Course Intro"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className="courseReactJS-register-button">
            <button onClick={isRegistered ? handleStartCourse : handleRegister}>
              {isRegistered ? "Học ngay" : "Đăng ký ngay"}
            </button>
          </div>

          <div className="courseReactJS-date-time">
            {loading ? (
              <p>Đang tải thông tin ngày giờ...</p>
            ) : (
              <>
                <p><i className="fas fa-calendar-alt"></i> Ngày: {courseData.courseDateTime.date}</p>
                <p><i className="fas fa-clock"></i> Giờ: {courseData.courseDateTime.time}</p>
                <p><i className="fas fa-chalkboard-teacher"></i> Giảng viên: {courseData.instructorName}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="courseReactJS-content">
        <h3>Nội dung khóa học</h3>
        <div className="courseReactJS-accordion">
          {loading ? (
            <p>Đang tải nội dung khóa học...</p>
          ) : (
            courseData.courseContent.map((item, index) => (
              <div className="courseReactJS-accordion-item" key={index}>
                <button>
                  <span><i className="fas fa-book-open"></i> {index + 1}. {item.title}</span>
                  <i className="fas fa-lock"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup-confirmation">
          <div className="popup-content">
            <h3>Đăng ký thành công!</h3>
            <p>Chúc mừng bạn đã đăng ký thành công khóa học!</p>
            <button onClick={handleClosePopup}>Đóng</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseReactJS;
