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
import Headersa from './components/Admin/Headera';
import Sidebara from './components/Admin/Sidebara';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const courses = [
    {
      image: '/logo512.png',
      category: "Java",
      duration: "3 Month",
      title: "Java Core",
      description: "Cung cấp kiến thức cơ bản về OOP, design pattern",
    },
  ];

  return (
    <Router>
      <div className="app-container">
        <Headersa />
        <div className="app-content">
          <Sidebara />
          <div className="main-content">
            <Routes>
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/course-management" element={<CourseManagement />} />
              <Route path="*" element={<Navigate to="/user-management" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

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