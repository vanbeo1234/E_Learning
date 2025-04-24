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
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/v1/api/course/detail", {
          params: { courseId: 1 },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Log toàn bộ response để kiểm tra
        console.log("Dữ liệu trả về từ API:", response);
        // Truy cập dữ liệu đúng theo cấu trúc: response.data.body.data
        const course = response?.data?.body?.data;
        if (!course) {
          console.log("Không có dữ liệu trong response.");
        }
        setCourseData({
          courseContent: course?.courseContent || [],
          courseInfo: {
            title: course?.courseName || "Không có tên khóa học",
            description: course?.description || "Không có mô tả",
            learningOutcome: course?.learningOutcome || "Không có kết quả học được"
          },
          courseVideo: course?.courseVideo || "",
          courseDateTime: course?.courseDateTime || {},
          instructorName: course?.instructorName || "Chưa có giảng viên",
          learnWhatYouGet: course?.learnWhatYouGet || []
        });
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khóa học:", error);
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

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
              courseData.courseVideo ? (
                <iframe
                  width="100%"
                  height="215"
                  src={courseData.courseVideo}
                  title="ReactJS Course Intro"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Không có video</p>
              )
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
                <p><i className="fas fa-calendar-alt"></i> Ngày: {courseData.courseDateTime.date || "Không có thông tin"}</p>
                <p><i className="fas fa-clock"></i> Giờ: {courseData.courseDateTime.time || "Không có thông tin"}</p>
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
