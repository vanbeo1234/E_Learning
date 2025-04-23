import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CListGroup, CListGroupItem } from '@coreui/react';
import '../Style/giangvien.css';

const CourseInfo = () => {
  const [courseData, setCourseData] = useState({
    courseContent: [],
    courseInfo: {},
    courseVideo: '',
    courseDateTime: {},
    instructor: '',
    learnWhatYouGet: [],
  });
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const course = location.state?.course;
    if (course) {
      setCourseData({
        courseContent: course.courseContent || [],
        courseInfo: course.courseInfo || {},
        courseVideo: course.courseVideo || '',
        courseDateTime: course.courseDateTime || {},
        instructor: course.instructor || '',
        learnWhatYouGet: course.learnWhatYouGet || [],
      });
      setLoading(false);
    } else {
      setLoading(false);
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleRegister = () => {
    setShowPopup(true);
    setIsRegistered(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleStartCourse = () => {
    navigate('/learn');
  };

  return (
    <div className="course-info-container">
      <div className="course-info">
        <h2>{loading ? 'Đang tải...' : courseData.courseInfo.title}</h2>
        <p>{loading ? 'Đang tải mô tả...' : courseData.courseInfo.description}</p>
        <div className="course-learn-what-you-get">
          <h3>Bạn sẽ được học những gì?</h3>
          {loading ? (
            <p>Đang tải nội dung...</p>
          ) : (
            courseData.learnWhatYouGet.map((item, index) => (
              <div className="course-item" key={index}>
                <i className="fas fa-arrow-right"></i> {item}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="course-image-section">
        <div className="course-video-wrapper">
          {loading ? (
            <p>Đang tải video...</p>
          ) : (
            <iframe
              width="100%"
              height="215"
              src={courseData.courseVideo}
              title={`${courseData.courseInfo.title} Intro`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="course-register-button">
          <button onClick={isRegistered ? handleStartCourse : handleRegister}>
            {isRegistered ? 'Học ngay' : 'Đăng ký ngay'}
          </button>
        </div>
        <div className="course-date-time">
          {loading ? (
            <p>Đang tải thông tin ngày giờ...</p>
          ) : (
            <>
              <p><i className="fas fa-calendar-alt"></i> Ngày: {courseData.courseDateTime.date}</p>
              <p><i className="fas fa-clock"></i> Giờ: {courseData.courseDateTime.time}</p>
              <p><i className="fas fa-chalkboard-teacher"></i> Giảng viên: {courseData.instructor}</p>
            </>
          )}
        </div>
      </div>
      <div className="course-content">
        <h3>Nội dung khóa học</h3>
        <div className="course-accordion">
          {loading ? (
            <p>Đang tải nội dung khóa học...</p>
          ) : (
            courseData.courseContent.map((item, index) => (
              <div className="course-accordion-item" key={index}>
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
    </div>
  );
};

export default CourseInfo;

