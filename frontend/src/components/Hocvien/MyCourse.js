import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  // API giả (dữ liệu khóa học)
  const fetchCoursesFromApi = async () => {
    try {
      // API giả cho các khóa học đã đăng ký
      const registeredData = {
        "registeredCourses": [
          {
            "image": "/logo512.png",
            "category": "Java",
            "duration": "3 Month",
            "title": "Java Core",
            "description": "Cung cấp kiến thức cơ bản về OOP, design pattern"
          },
          {
            "image": "/logo512.png",
            "category": "Python",
            "duration": "2 Month",
            "title": "Python Foundation",
            "description": "Học cú pháp cơ bản, xử lý dữ liệu và lập trình hướng đối tượng"
          },
          {
            "image": "/logo512.png",
            "category": "JavaScript",
            "duration": "1.5 Month",
            "title": "JavaScript ES6",
            "description": "Nắm vững cú pháp hiện đại, DOM, event, async/await"
          }
        ]
      };

      // API giả cho các khóa học tiếp tục
      const continuingData = {
        "continuingCourses": [
          {
            "image": "/logo512.png",
            "category": "Ruby",
            "duration": "2.5 Month",
            "title": "Ruby on Rails",
            "description": "Lập trình web với Ruby, Rails framework"
          },
          {
            "image": "/logo512.png",
            "category": "Swift",
            "duration": "2 Month",
            "title": "iOS Development",
            "description": "Phát triển ứng dụng iOS với Swift và Xcode"
          },
          {
            "image": "/logo512.png",
            "category": "C#",
            "duration": "3 Month",
            "title": "C# Programming",
            "description": "Lập trình C# cơ bản và các ứng dụng desktop"
          }
        ]
      };

      // API giả cho các khóa học đã hoàn thành
      const completedData = {
        "completedCourses": [
          {
            "image": "/logo512.png",
            "category": "Go",
            "duration": "2 Month",
            "title": "Go Basics",
            "description": "Lập trình cơ bản với Go và các ứng dụng backend"
          },       {
            "image": "/logo512.png",
            "category": "Go",
            "duration": "2 Month",
            "title": "Go Basics",
            "description": "Lập trình cơ bản với Go và các ứng dụng backend"
          }, 
       
    
        ]
      };

      // Cập nhật dữ liệu khóa học vào state
      setRegisteredCourses(registeredData.registeredCourses);
      setContinuingCourses(continuingData.continuingCourses);
      setCompletedCourses(completedData.completedCourses);

      // Dữ liệu từ API thật sẽ ở đây
      // const response = await fetch("https://api.example.com/courses");
      // const data = await response.json();
      // setRegisteredCourses(data.registeredCourses);
      // setContinuingCourses(data.continuingCourses);
      // setCompletedCourses(data.completedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCoursesFromApi();
  }, []);

  const coursesPerPage = 4;
  const totalPages = Math.ceil(registeredCourses.length / coursesPerPage);
  const currentCourses = registeredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const formatCourseTitle = (title) => {
    return title.replace('#', '-sharp').toLowerCase().replace(/ /g, '-');
  };
  
  return (
    <main className="mycourse-main-content">
      <section className="mycourse-courses">
        <div className="mycourse-courses-header">
          <h2>Khóa học đã đăng ký</h2>
        </div>
        <div className="mycourse-course-grid">
          {currentCourses.map((course, index) => (
            <Link 
              to={{
                pathname: `/course/${formatCourseTitle(course.title)}`,
                state: { course }
              }} 
              key={index}
              className="mycourse-course-card"
            >
              <img src={course.image} alt={course.title} className="mycourse-course-image" />
              <div className="mycourse-course-header">
                <span>{getCategoryIcon(course.category)} {course.category}</span>
                <span><i className="fas fa-clock"></i> {course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </Link>
          ))}
        </div>
  
        <div className="mycourse-courses-header">
          <h2>Khóa học tiếp tục</h2>
        </div>
        <div className="mycourse-course-grid">
          {continuingCourses.map((course, index) => (
            <Link 
              to={{
                pathname: `/course/${formatCourseTitle(course.title)}`,
                state: { course }
              }} 
              key={index}
              className="mycourse-course-card"
            >
              <img src={course.image} alt={course.title} className="mycourse-course-image" />
              <div className="mycourse-course-header">
                <span>{getCategoryIcon(course.category)} {course.category}</span>
                <span><i className="fas fa-clock"></i> {course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </Link>
          ))}
        </div>
  
        <div className="mycourse-courses-header">
          <h2>Khóa học đã hoàn thành</h2>
        </div>
        <div className="mycourse-course-grid">
          {completedCourses.map((course, index) => (
            <Link 
              to={{
                pathname: `/course/${formatCourseTitle(course.title)}`,
                state: { course }
              }} 
              key={index}
              className="mycourse-course-card"
            >
              <img src={course.image} alt={course.title} className="mycourse-course-image" />
              <div className="mycourse-course-header">
                <span>{getCategoryIcon(course.category)} {course.category}</span>
                <span><i className="fas fa-clock"></i> {course.duration}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </Link>
          ))}
        </div>
  
        <div className="mycourse-pagination-buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? 'mycourse-active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};  

export default MyCourse;
