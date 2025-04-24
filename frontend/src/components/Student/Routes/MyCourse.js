import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Style/hocvien.css';

// Hàm trả về icon dựa vào category
const getCategoryIcon = (category) => {
  switch (category) {
    case "Java":
      return <i className="fab fa-java"></i>;
    case "Python":
      return <i className="fab fa-python"></i>;
    case "JavaScript":
      return <i className="fab fa-js"></i>;
    case "PHP":
      return <i className="fab fa-php"></i>;
    case "Ruby":
      return <i className="fab fa-ruby"></i>;
    case "Swift":
      return <i className="fab fa-swift"></i>;
    case "C#":
      return <i className="fab fa-cuttlefish"></i>;
    case "Go":
      return <i className="fab fa-go"></i>;
    case "Kotlin":
      return <i className="fab fa-java"></i>;
    case "TypeScript":
      return <i className="fab fa-js"></i>;
    default:
      return <i className="fas fa-code"></i>;
  }
};

const MyCourse = () => {
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [continuingCourses, setContinuingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  // API giả (dữ liệu khóa học với thêm dữ liệu)
  const fetchCoursesFromApi = async () => {
    try {
      // API giả cho các khóa học đã đăng ký (8 khóa học)
      const registeredData = {
        registeredCourses: [
          {
            image: "/logo512.png",
            category: "Java",
            duration: "3 Month",
            title: "Java Core",
            description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
          },
          {
            image: "/logo512.png",
            category: "Python",
            duration: "2 Month",
            title: "Python Foundation",
            description: "Học cú pháp cơ bản, xử lý dữ liệu và lập trình hướng đối tượng",
          },
          {
            image: "/logo512.png",
            category: "JavaScript",
            duration: "1.5 Month",
            title: "JavaScript ES6",
            description: "Nắm vững cú pháp hiện đại, DOM, event, async/await",
          },

        ],
      };

      // API giả cho các khóa học tiếp tục (8 khóa học)
      const continuingData = {
        continuingCourses: [
          {
            image: "/logo512.png",
            category: "Ruby",
            duration: "2.5 Month",
            title: "Ruby on Rails",
            description: "Lập trình web với Ruby, Rails framework",
          },
          {
            image: "/logo512.png",
            category: "Swift",
            duration: "2 Month",
            title: "iOS Development",
            description: "Phát triển ứng dụng iOS với Swift và Xcode",
          },
          {
            image: "/logo512.png",
            category: "C#",
            duration: "3 Month",
            title: "C# Programming",
            description: "Lập trình C# cơ bản và các ứng dụng desktop",
          },
          {
            image: "/logo512.png",
            category: "Kotlin",
            duration: "2 Month",
            title: "Android Development",
            description: "Phát triển ứng dụng Android với Kotlin",
          },
          {
            image: "/logo512.png",
            category: "Ruby",
            duration: "3 Month",
            title: "Advanced Rails",
            description: "Xây dựng ứng dụng web nâng cao với Rails",
          },
          {
            image: "/logo512.png",
            category: "Swift",
            duration: "2.5 Month",
            title: "SwiftUI",
            description: "Xây dựng giao diện iOS hiện đại với SwiftUI",
          },

        ],
      };

      // API giả cho các khóa học đã hoàn thành (8 khóa học)
      const completedData = {
        completedCourses: [
          {
            image: "/logo512.png",
            category: "Go",
            duration: "2 Month",
            title: "Go Basics",
            description: "Lập trình cơ bản với Go và các ứng dụng backend",
          },
          {
            image: "/logo512.png",
            category: "TypeScript",
            duration: "2 Month",
            title: "TypeScript Basics",
            description: "Học TypeScript cơ bản và ứng dụng với Angular",
          },
          {
            image: "/logo512.png",
            category: "Go",
            duration: "2.5 Month",
            title: "Go Microservices",
            description: "Xây dựng hệ thống microservices với Go",
          },
          {
            image: "/logo512.png",
            category: "TypeScript",
            duration: "2 Month",
            title: "Advanced TypeScript",
            description: "Nâng cao kỹ năng lập trình với TypeScript",
          },
          {
            image: "/logo512.png",
            category: "Go",
            duration: "3 Month",
            title: "Go Cloud",
            description: "Phát triển ứng dụng cloud với Go",
          },

        ],
      };

      // Cập nhật dữ liệu khóa học vào state
      setRegisteredCourses(registeredData.registeredCourses);
      setContinuingCourses(continuingData.continuingCourses);
      setCompletedCourses(completedData.completedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCoursesFromApi();
  }, []);

  const coursesPerPage = 4;

  // Tính số trang tối đa dựa trên danh sách có nhiều khóa học nhất
  const totalPages = Math.max(
    Math.ceil(registeredCourses.length / coursesPerPage),
    Math.ceil(continuingCourses.length / coursesPerPage),
    Math.ceil(completedCourses.length / coursesPerPage)
  );

  // Cắt danh sách khóa học theo trang hiện tại
  const currentRegisteredCourses = registeredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  const currentContinuingCourses = continuingCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  const currentCompletedCourses = completedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatCourseTitle = (title) => {
    return title.replace('#', '-sharp').toLowerCase().replace(/ /g, '-');
  };

  return (
    <main className="mycourse-main-content">
      <div className="mycourse-page-content">
        <section className="mycourse-courses">
          {/* Khóa học đã đăng ký */}
          <div className="mycourse-courses-header">
            <h2>Khóa học đã đăng ký</h2>
          </div>
          <div className="mycourse-course-grid">
            {currentRegisteredCourses.map((course, index) => (
              <Link
                to={`/course/${formatCourseTitle(course.title)}`}
                key={index}
                className="mycourse-course-card"
              >
                <img src={course.image} alt={course.title} className="mycourse-course-image" />
                <div className="mycourse-course-header">
                  <span>
                    {getCategoryIcon(course.category)} {course.category}
                  </span>
                  <span>
                    <i className="fas fa-clock"></i> {course.duration}
                  </span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </Link>
            ))}
          </div>

          {/* Khóa học tiếp tục */}
          <div className="mycourse-courses-header">
            <h2>Khóa học tiếp tục</h2>
          </div>
          <div className="mycourse-course-grid">
            {currentContinuingCourses.map((course, index) => (
              <Link
                to={`/course/${formatCourseTitle(course.title)}`}
                key={index}
                className="mycourse-course-card"
              >
                <img src={course.image} alt={course.title} className="mycourse-course-image" />
                <div className="mycourse-course-header">
                  <span>
                    {getCategoryIcon(course.category)} {course.category}
                  </span>
                  <span>
                    <i className="fas fa-clock"></i> {course.duration}
                  </span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </Link>
            ))}
          </div>

          {/* Khóa học đã hoàn thành */}
          <div className="mycourse-courses-header">
            <h2>Khóa học đã hoàn thành</h2>
          </div>
          <div className="mycourse-course-grid">
            {currentCompletedCourses.map((course, index) => (
              <Link
                to={`/course/${formatCourseTitle(course.title)}`}
                key={index}
                className="mycourse-course-card"
              >
                <img src={course.image} alt={course.title} className="mycourse-course-image" />
                <div className="mycourse-course-header">
                  <span>
                    {getCategoryIcon(course.category)} {course.category}
                  </span>
                  <span>
                    <i className="fas fa-clock"></i> {course.duration}
                  </span>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </Link>
            ))}
          </div>

          {/* Nút phân trang */}
          <div className="mycourse-pagination-buttons">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={currentPage === 1 ? 'mycourse-disabled' : ''}
            >
              «
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={currentPage === number + 1 ? 'mycourse-active' : ''}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={currentPage === totalPages ? 'mycourse-disabled' : ''}
            >
              »
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyCourse;