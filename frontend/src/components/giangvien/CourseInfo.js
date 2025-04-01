import React, { useState, useEffect } from 'react';
import { CListGroup, CListGroupItem } from '@coreui/react';
import "./giangvien.css";
const CourseInfo = () => {
  const [courseContent, setCourseContent] = useState([]);

  useEffect(() => {
    // Fetch course content from API
    fetch('https://api.example.com/course-content') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setCourseContent(data))
      .catch(error => console.error('Error fetching course content:', error));
  }, []);

  return (
    <div>
      <div className="course-info">
        <h2>Xây Dựng Website với ReactJS</h2>
        <p>
          Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ có một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.
        </p>
        <CListGroup className="stars">
          <h2>Bạn sẽ được học những gì?</h2>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        </CListGroup>
      </div>
      <div className="course-content">
        <h3>Nội dung khóa học</h3>
        <div className="accordion">
          {courseContent.map((item, index) => (
            <div className="accordion-item" key={index}>
              <button>
                <span>{index + 1}. {item.title}</span>
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="edit-button">
        <a href="/edit-course"><button>Chỉnh sửa</button></a>
      </div>
    </div>
  );
};

export default CourseInfo;