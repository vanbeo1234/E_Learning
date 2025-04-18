import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Common
import Login from './components/Login';
import Signup from './components/Signup';

// Admin
import Sidebara from './components/Admin/Sidebara';
import Headera from './components/Admin/Headera';
import UserManagement from './components/Admin/User/UserManagement';
import CourseManagement from './components/Admin/Course/CourseManagement';
import AddCourseModal from './components/Admin/Course/Function/AddCourse';

// Student (Học viên)
import Sidebar from './components/Hocvien/Sidebar';
import Header from './components/Hocvien/Header';
import Home from './components/Hocvien/Home';
import MyCourse from './components/Hocvien/MyCourse';
import LearningProgress from './components/Hocvien/LearningProgress';
import Article from './components/Hocvien/Article';
import CourseReactJS from './components/Hocvien/Course Information/CourseReactJS';
import Learn1 from './components/Hocvien/Course Information/Study Course/Learn1';

// Instructor (Giảng viên)
import Sidebars from './components/giangvien/Sidebar';
import Headers from './components/giangvien/Header';
import Homeg from './components/giangvien/Homeg';
import CourseTable from './components/giangvien/CourseTable';
import CourseInfo from './components/giangvien/CourseInfo';
import CourseForm from './components/giangvien/CourseForm';
import FeedbackList from './components/giangvien/FeedbackList';
import Feature from './components/giangvien/Feature';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(""); // 'admin' | 'student' | 'instructor'
  const [courses, setCourses] = useState([]);

  return (
    <Router>
      <Routes>
      <Route
        path="/user-management"
        element={
          localStorage.getItem("token")
            ? <><Sidebara /><Headera title="Quản lý người dùng" /><UserManagement /></>
            : <Navigate to="/login" />
        }
      />
        {/* Đăng nhập và Đăng ký */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={`/${role === 'admin' ? 'user-management' : role === 'student' ? 'home' : 'user-management'}`} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />
            )
          }
        />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

        {/* Admin */}
        {isAuthenticated && role === 'admin' && (
          <>
            <Route
              path="/user-management"
              element={
                <div className="container">
                  <Sidebara />
                  <Headera title="Quản lý người dùng" />
                  <UserManagement />
                </div>
              }
            />
            <Route
              path="/course-management"
              element={
                <div className="container">
                  <Sidebara />
                  <Headera title="Quản lý khóa học" />
                  <CourseManagement courses={courses} />
                </div>
              }
            />
            <Route
              path="/add-course"
              element={
                <div className="container">
                  <Sidebara />
                  <Headera title="Thêm khóa học" />
                  <AddCourseModal />
                </div>
              }
            />
          </>
        )}

        {/* Học viên */}
        {isAuthenticated && role === 'student' && (
          <Route
            path="*"
            element={
              <div className="container">
                <Sidebar />
                <div className="content">
                  <Routes>
                    <Route path="/home" element={<><Header title="Trang chủ" isSearch={true} /><Home /></>} />
                    <Route path="/my-course" element={<><Header title="Khóa học của tôi" /><MyCourse /></>} />
                    <Route path="/progress" element={<><Header title="Tiến độ học tập" /><LearningProgress /></>} />
                    <Route path="/article" element={<><Header title="Bài viết" /><Article /></>} />
                    <Route path="/course/:courseId" element={<><Header title="Thông tin khóa học" /><CourseReactJS courses={courses} /></>} />
                    <Route path="/learn1" element={<><Header title="Học ReactJS" /><Learn1 /></>} />
                    <Route path="*" element={<Navigate to="/user-management" />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}

        {/* Giảng viên */}
        {isAuthenticated && role === 'instructor' && (
          <Route
            path="*"
            element={
              <div className="container">
                <Sidebars />
                <div className="content">
                  <Headers title="E Learning" />
                  <Routes>
                    <Route path="/homeg" element={<Homeg />} />
                    <Route path="/courses" element={<CourseTable />} />
                    <Route path="/course-info/:id" element={<CourseInfo />} />
                    <Route path="/edit-course/:id" element={<Feature isEdit={true} />} />
                    <Route path="/create-course" element={<CourseForm isEdit={false} />} />
                    <Route path="/feedback" element={<FeedbackList />} />
                    <Route path="*" element={<Navigate to="/user-management" />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}

        {/* Mặc định chuyển hướng khi chưa đăng nhập */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
