import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import UserManagement from './components/Admin/User/UserManagement';
import CourseManagement from './components/Admin/Course/CourseManagement';
import Headera from './components/Admin/Headera';
import Sidebara from './components/Admin/Sidebara';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/user-management" /> : 
            <Login setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route
          path="/user-management"
          element={
            isAuthenticated ? (
              <div className="app-container">
                <Sidebara />
                <div className="app-content">
                  <Headera />
                  <div className="main-content">
                    <UserManagement />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/course-management"
          element={
            isAuthenticated ? (
              <div className="app-container">
                <Sidebara />
                <div className="app-content">
                  <Headera />
                  <div className="main-content">
                    <CourseManagement />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route path="/" element={<Navigate to={isAuthenticated ? "/user-management" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;


/**            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/course-management" element={<CourseManagement />} />
            <Route path="*" element={<Navigate to="/user-management" />} />

/**         function AppContent() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();  // Sử dụng useLocation để lấy đường dẫn hiện tại
  const showFooterPaths = ["/home", "/my-course", "/progress", "/article"];
  const shouldShowFooter = showFooterPaths.includes(location.pathname); // Kiểm tra xem footer có hiển thị không

  return (
    <div className="app-wrapper">
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
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 
   */


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
                      <div className="app-wrapper">
          <Sidebars />
          <div className="content">
            <Routes>
              <Route
                path="/homeg"
                element={<><Headers title="Trang chủ giảng viên" /><Homeg /></>}
              />
              <Route
                path="/courses"
                element={<><Headers title="Danh sách khóa học" /><CourseTable /></>}
              />
              <Route
                path="/create-course"
                element={<><Headers title="Tạo khóa học mới" /><CourseForm isEdit={false} /></>}
              />
              <Route
                path="/edit-course/:id"
                element={<><Headers title="Chỉnh sửa khóa học" /><Feature isEdit={true} /></>}
              />
              <Route
                path="/course-info/:id"
                element={<><Headers title="Thông tin khóa học" /><CourseInfo /></>}
              />
              <Route
                path="/feedback"
                element={<><Headers title="Phản hồi từ học viên" /><FeedbackList /></>}
              />
              <Route path="*" element={<Navigate to="/homeg" />} />
            </Routes>
          </div>
        </div>*/


      /**dk,dn   <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/user-management" /> : 
            <Login setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* 
        <Route
        path="/user-management"
        element={
          isAuthenticated ? (
            <div className="app-container">
              <Sidebara />
              <div className="app-content">
                <Headera />
                <div className="main-content">
                  <UserManagement />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      
      <Route
        path="/course-management"
        element={
          isAuthenticated ? (
            <div className="app-container">
              <Sidebara />
              <div className="app-content">
                <Headera />
                <div className="main-content">
                  <CourseManagement />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      
      <Route path="/" element={<Navigate to={isAuthenticated ? "/user-management" : "/login"} />} />
    </Routes>
  </Router>* */