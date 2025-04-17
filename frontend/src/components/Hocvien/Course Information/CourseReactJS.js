import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios để gọi API
import { CListGroup } from '@coreui/react';
import { Link } from 'react-router-dom';
import './course.css';

const CourseReactJS = () => {
  const [courseData, setCourseData] = useState({
    courseContent: [],
    courseInfo: {},
    courseVideo: "",
    courseDateTime: {},
    instructorName: "",
    learnWhatYouGet: [] // Mảng lưu trữ dữ liệu mục "Bạn đã học được gì?"
  });

  const [loading, setLoading] = useState(true);

  // Gọi API khi component được mount
  useEffect(() => {
    // API giả để lấy dữ liệu (có thể thay bằng API thật)
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

    // Giả lập phản hồi từ API
    setTimeout(() => {
      setCourseData(fakeApiResponse);
      setLoading(false);
    }, 2000);

    // Nếu sử dụng API thật, bỏ phần dưới và uncomment đoạn axios
    // axios.get('https://api.example.com/course-data') // Thay bằng API thật của bạn
    //   .then((res) => {
    //     setCourseData(res.data); // Cập nhật dữ liệu nhận được vào state
    //     setLoading(false);  // Đặt loading thành false khi tải xong
    //   })
    //   .catch((err) => {
    //     console.error('Lỗi khi lấy dữ liệu từ API:', err);
    //     setLoading(false); // Đảm bảo không bị kẹt ở trạng thái loading nếu có lỗi
    //   });
  }, []);

  return (
    <>
      <div className="courseReactJS-container">
        <div className="courseReactJS-info">
          <h2>{loading ? "Đang tải..." : courseData.courseInfo.title}</h2>
          <p>
            {loading ? "Đang tải mô tả khóa học..." : courseData.courseInfo.description}
          </p>
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
            <Link to="/learn1">
              <button>Đăng ký ngay</button>
            </Link>
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
    </>
  );
};

export default CourseReactJS;
