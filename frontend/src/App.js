import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Hocvien/Footer';
import Sidebar from './components/Hocvien/Sidebar';
import Header from './components/Hocvien/Header';
import Home from './components/Hocvien/Home';
import MyCourse from './components/Hocvien/MyCourse';
import LearningProgress from './components/Hocvien/LearningProgress';
import Article from './components/Hocvien/Article';
import CourseReactJS from './components/Hocvien/Course Information/CourseReactJS';
import Learn1 from './components/Hocvien/Course Information/Study Course/Learn1';
import UserManagement from './components/Admin/User/UserManagement';
import CourseManagement from './components/Admin/Course/CourseManagement';
import Headera from './components/Admin/Headera';
import Sidebara from './components/Admin/Sidebara';
import Modala from './components/Admin/Modala';
import AddCourseModal from './components/Admin/Course/Function/AddCourse';
import EditCourse from './components/Admin/Course/Function/EditCourse';
import CourseForm from './components/giangvien/CourseForm';
import FeedbackList from './components/giangvien/FeedbackList';
import CourseTable from './components/giangvien/CourseTable';
import CourseList from './components/giangvien/CourseList';
import CourseInfo from './components/giangvien/CourseInfo';
import Sidebars from './components/giangvien/Sidebar';
import Headers from './components/giangvien/Header';
import Homeg from './components/giangvien/Homeg';
import Feature from './components/giangvien/Feature';

function App() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      courseName: 'Java Core',
      instructor: 'Nguyễn Văn A',
      lessons: 20,
      description: 'Cung cấp kiến thức cơ bản về OOP, design pattern',
      startDate: '2023-01-01',
      endDate: '2023-03-31',
      status: 'Hoạt động',
      coverImage: null,
      objectives: [],
      lectures: [],
    },
    {
      id: 2,
      courseName: 'ReactJS',
      instructor: 'Trần Thị B',
      lessons: 15,
      description: 'Học cách xây dựng ứng dụng với ReactJS',
      startDate: '2023-02-01',
      endDate: '2023-04-30',
      status: 'Không hoạt động',
      coverImage: null,
      objectives: [],
      lectures: [],
    },
  ]);

  return (
    <Router>
      <div className="container">
        <Sidebara />
        <Routes>
          <Route
            path="/user-management"
            element={
              <>
                <Headera title="Quản lý người dùng" />
                <UserManagement />
              </>
            }
          />
          <Route
            path="/course-management"
            element={
              <>
                <Headera title="Quản lý khóa học" />
                <CourseManagement courses={courses} setCourses={setCourses} />
              </>
            }
          />
          <Route
            path="/add-course"
            element={
              <>
                <Headera title="Thêm khóa học" />
                <AddCourseModal />
              </>
            }
          />
          <Route
            path="/edit-course/:id"
            element={
              <>
                <Headera title="Sửa khóa học" />
                <EditCourse courses={courses} setCourses={setCourses} />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/course-management" />} />
        </Routes>
      </div>
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