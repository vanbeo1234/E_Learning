import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Hocvien/Sidebar';
import Header from './components/Hocvien/Header';
import Home from './components/Hocvien/Home';
import MyCourse from './components/Hocvien/MyCourse';
import LearningProgress from './components/Hocvien/LearningProgress';
import Article from './components/Hocvien/Article';
import CourseReactJS from './components/Hocvien/Course Information/CourseReactJS';
import Learn1 from './components/Hocvien/Course Information/Study Course/Learn1';
import UserManagement from './components/Admin/UserManagement';
import CourseManagement from './components/Admin/CourseManagement';
import Headera from './components/Admin/Headera';
import Sidebara from './components/Admin/Sidebara';
import Modala from './components/Admin/Modala';
import AddCourseModal from './components/Admin/AddCourse';
import CourseForm from './components/Giangvien/CourseForm';
import FeedbackList from './components/Giangvien/FeedbackList';
import CourseTable from './components/Giangvien/CourseTable';
import CourseList from './components/Giangvien/CourseList';
import CourseInfo from './components/Giangvien/CourseInfo';
import Sidebars from './components/Giangvien/Sidebar';
import Headers from './components/Giangvien/Header';
import Homeg from './components/Giangvien/Homeg';
import Feature from './components/Giangvien/Feature';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Change to false to test un-authenticated view
  const [isAdmin, setIsAdmin] = useState(false); // Admin flag
  const [isInstructor, setIsInstructor] = useState(true); // Instructor flag

  const courses = [
    { id: 1, title: "Khóa học ReactJS" },
    { id: 2, title: "Khóa học NodeJS" },
    // Thêm các khóa học khác nếu cần
  ];

  return (
    <Router>
<div className="container">
        <Sidebara />
        <Routes>
                    <Route path="/user-management" element={<><Headera title="Quản lý người dùng" /><UserManagement /></>} />
                    <Route path="/course-management" element={<><Headera title="Quản lý khóa học" /><CourseManagement courses={courses} /></>} />
                    <Route path="/add-course" element={<><Headera title="Thêm khóa học" /><AddCourseModal /></>} />
                    <Route path="/" element={<Navigate to="/admin/course-management" />} />
                  </Routes>
        </div>
    </Router>
  );
};

export default App;

  
  
  
  
/**            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/course-management" element={<CourseManagement />} />
            <Route path="*" element={<Navigate to="/user-management" />} />

/**      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/home" element={<><Header title="Trang chủ" isSearch={true} /><Home /></>} />
            <Route path="/my-course" element={<><Header title="Khóa học của tôi" /><MyCourse /></>} />
            <Route path="/progress" element={<><Header title="Tiến độ học tập" /><LearningProgress /></>} />
            <Route path="/article" element={<><Header title="Bài viết" /><Article /></>} />
            <Route path="/course/:courseId" element={<><Header title="Thông tin khóa học" /><CourseReactJS courses={courses} /></>} />
            <Route path="/learn1" element={<><Header title="Học ReactJS" /><Learn1 /></>} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div> */


      /**        <div className="container">
        <Sidebara />
        <Routes>
                    <Route path="/user-management" element={<><Headera title="Quản lý người dùng" /><UserManagement /></>} />
                    <Route path="/course-management" element={<><Headera title="Quản lý khóa học" /><CourseManagement courses={courses} /></>} />
                    <Route path="/add-course" element={<><Headera title="Thêm khóa học" /><AddCourseModal /></>} />
                    <Route path="/" element={<Navigate to="/admin/course-management" />} />
                  </Routes>
        </div> */


      /*giangvien
                <div className="container">
        {isInstructor && <Sidebars />}
        <div className="content">
          {isInstructor && <Headers title="E Learning" />}
          <Routes>
            {isInstructor && (
              <>
                <Route path="/" element={<Homeg />} />
                <Route path="/homeg" element={<Homeg />} />
                <Route path="/courses" element={<CourseTable />} />
                <Route path="/course-info/:id" element={<CourseInfo />} />
                <Route path="/course/:id" element={<CourseInfo />} />
                <Route path="/edit-course/:id" element={<Feature isEdit={true} />} />
                <Route path="/create-course" element={<CourseForm isEdit={false} />} />
                <Route path="/feedback" element={<FeedbackList />} />
                <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
              </>
            )}
          </Routes>
        </div>
      </div>*/
