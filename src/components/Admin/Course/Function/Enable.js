// components/CourseManagement/Function/Enable.jsx
import React from 'react';
import '../../Style/adcm.css';

const EnableCourses = ({ selectedCourses, setCourses, setSelectedCourses }) => {
  const handleEnable = () => {
    setCourses(prev =>
      prev.map(course =>
        selectedCourses.includes(course.id)
          ? { ...course, status: 'Hoạt động' }
          : course
      )
    );
    setSelectedCourses([]);
  };

  return (
    <button className="btn btn-yellow" onClick={handleEnable}>
      Kích hoạt
    </button>
  );
};

export default EnableCourses;
