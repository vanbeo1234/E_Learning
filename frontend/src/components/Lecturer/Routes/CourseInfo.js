import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CListGroup, CListGroupItem } from '@coreui/react';
import '../Style/giangvien.css';

const CourseInfo = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const selectedCourse = storedCourses.find((c) => c.id === parseInt(id));
    if (selectedCourse) {
      setCourse(selectedCourse);
      setCourseContent(selectedCourse.lectures || []);
    }
  }, [id]);

  if (!course) {
    return <div>Không tìm thấy khóa học</div>;
  }

  return (
    <div>
      <div className="course-info">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <CListGroup className="stars">
          <h2>Bạn sẽ được học những gì?</h2>
          {course.objectives && course.objectives.length > 0 ? (
            course.objectives.map((objective, index) => (
              <CListGroupItem key={index}>{objective}</CListGroupItem>
            ))
          ) : (
            <CListGroupItem>Chưa có mục tiêu nào được liệt kê</CListGroupItem>
          )}
        </CListGroup>
      </div>
      <div className="course-content">
        <h3>Nội dung khóa học</h3>
        <div className="accordion">
          {courseContent.length > 0 ? (
            courseContent.map((item, index) => (
              <div className="accordion-item" key={index}>
                <button>
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
            ))
          ) : (
            <div>Chưa có nội dung khóa học</div>
          )}
        </div>
      </div>
      <div className="edit-button">
        <a href={`/edit-course/${id}`}>
          <button>Chỉnh sửa</button>
        </a>
      </div>
    </div>
  );
};

export default CourseInfo;