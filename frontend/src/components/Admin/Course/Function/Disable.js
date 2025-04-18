// components/CourseManagement/Function/Disable.jsx
import React from 'react';

const DisableCourses = ({ selectedCourses, setCourses, setSelectedCourses }) => {
  const handleDisable = () => {
    setCourses(prev =>
      prev.map(course =>
        selectedCourses.includes(course.id)
          ? { ...course, status: 'Không hoạt động' }
          : course
      )
    );
    setSelectedCourses([]);
  };

  return (
    <button className="btn btn-red" onClick={handleDisable}>
      Vô hiệu hóa
    </button>
  );
};

export default DisableCourses;
