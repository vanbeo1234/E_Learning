import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Singup';
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
        {isInstructor ? <Sidebars /> : <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/home" element={isAuthenticated ? <><Headers title="Trang chủ" isSearch={true} /><CourseList /></> : <Navigate to="/login" />} />
            <Route path="/feedback" element={isAuthenticated ? <><Headers title="Danh sách phản hồi" /><FeedbackList /></> : <Navigate to="/login" />} />
            <Route path="/create-course" element={isAuthenticated ? <><Headers title="Danh sách khóa học được tạo" /><CourseTable /></> : <Navigate to="/login" />} />
            <Route path="/add-course" element={isAuthenticated ? <><Headers title="Tạo khóa học mới" /><CourseForm isEdit={false} /></> : <Navigate to="/login" />} />
            <Route path="/edit-course" element={isAuthenticated ? <><Headers title="Chỉnh sửa khóa học" /><CourseForm isEdit={true} /></> : <Navigate to="/login" />} />
            <Route path="/course-info" element={isAuthenticated ? <><Headers title="Thông tin khóa học đã tạo" /><CourseInfo /></> : <Navigate to="/login" />} />
          </Routes>
        </div>
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

      /**      <div className="app-container">
        <Headersa />
        <div className="app-content">
          <Sidebara />
          <div className="main-content">
            <UserManagement />
          </div>
        </div>
      </div> */

      /**      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin" element={isAuthenticated ? (
          <div className="app-container">
            <Sidebara />
            <div className="app-content">
              <Headersa />
              <div className="main-content">
                <UserManagement />
              </div>
            </div>
          </div>
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes> */


      /*giangvien
          <Routes>
            <Route path="/home" element={isAuthenticated ? <><Header title="Trang chủ" isSearch={true} /><CourseList /></> : <Navigate to="/login" />} />
            <Route path="/feedback" element={isAuthenticated ? <><Header title="Danh sách phản hồi" /><FeedbackList /></> : <Navigate to="/login" />} />
            <Route path="/create-course" element={isAuthenticated ? <><Header title="Danh sách khóa học được tạo" /><CourseTable /></> : <Navigate to="/login" />} />
            <Route path="/add-course" element={isAuthenticated ? <><Header title="Tạo khóa học mới" /><CourseForm isEdit={false} /></> : <Navigate to="/login" />} />
            <Route path="/edit-course" element={isAuthenticated ? <><Header title="Chỉnh sửa khóa học" /><CourseForm isEdit={true} /></> : <Navigate to="/login" />} />
            <Route path="/course-info" element={isAuthenticated ? <><Header title="Thông tin khóa học đã tạo" /><CourseInfo /></> : <Navigate to="/login" />} />
          </Routes>*/
