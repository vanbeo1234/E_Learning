import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Page/Login';
import Signup from './components/Page/Signup';
import Welcome from'./components/Page/Welcome';
// Student Components
import Sidebar from './components/Student/Layout/Sidebar';
import Header from './components/Student/Layout/Header';
import Footer from './components/Student/Layout/Footer';
import Home from './components/Student/Routes/Home';
import MyCourse from './components/Student/Routes/MyCourse';
import LearningProgress from './components/Student/Routes/LearningProgress';
import Article from './components/Student/Routes/Article';
import CourseReactJS from './components/Student/Routes/Course Information/CourseReactJS';
import Learn1 from './components/Student/Routes/Course Information/Study Course/Learn1';
import Learn2 from './components/Student/Routes/Course Information/Study Course/Learn2';
import Learn3 from './components/Student/Routes/Course Information/Study Course/Learn3';
// Lecturer Components
import Sidebars from './components/Lecturer/Layouts/Sidebar';
import Headers from'./components/Lecturer/Layouts/Header';
import Homes from './components/Lecturer/Routes/Homes';
import CourseForm from './components/Lecturer/Routes/CourseForm';
import CourseInfo from './components/Lecturer/Routes/CourseInfo';
import CourseTable from './components/Lecturer/Routes/CourseTable';
import CourseList from './components/Lecturer/Routes/CourseList';
import FeedbackList from './components/Lecturer/Routes/FeedbackList';
import Feature from './components/Lecturer/Routes/Feature';

// Admin Components
import Headera from './components/Admin/Layout/Headera';
import Sidebara from './components/Admin/Layout/Sidebara';
import UserManagement from './components/Admin/User/UserManagement';
import AddUserModal from './components/Admin/User/Function/Add';
import ConfirmModal from './components/Admin/Course/Function/Confirm';
import EditUserModal from './components/Admin/User/Function/Edit';
import UserSearchForm from './components/Admin/User/Function/Search';
import CourseManagement from './components/Admin/Course/CourseManagement';
import AddCourse from './components/Admin/Course/Function/AddCourse';
import ConfirmModalCousre from './components/Admin/Course/Function/Confirm';
import EditCourse from './components/Admin/Course/Function/EditCourse';
import SearchCourses from './components/Admin/Course/Function/Search';
import Modala from './components/Admin/Course/Function/Modala';
import { CourseProvider } from './components/Admin/Course/Function/Context/CourseContext';



function App() {
  return (
    <Router>
      <div className="app-wrapper">
          <Sidebars />
          <div className="content">
            <Routes>
              <Route
                path="/homeg"
                element={<><Headers title="Trang chủ giảng viên" /><Homes /></>}
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
        </div>
    </Router>
  );
}

// Make sure you're exporting the App component by default
export default App;



/**     function App() {
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
      objectives: [],
      lectures: [],
      coverImage: null,
      students: []
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
      objectives: [],
      lectures: [],
      coverImage: null,
      students: []
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      userCode: 'user001',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      role: 'Instructor',
      status: 'Active'
    },
    {
      id: 2,
      userCode: 'user002',
      name: 'Trần Thị B',
      email: 'tranb@example.com',
      role: 'Student',
      status: 'Disabled'
    }
  ]);

  const addCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  return (
    <CourseProvider>
    <Router>
      <div className="container">
        <Sidebara />

        <div className="main-content">
          <Header title="Quản trị hệ thống" />

          <Routes>
            <Route path="/user-management" element={<UserManagement users={users} updateUser={updateUser} />} />
            <Route path="/course-management" element={<CourseManagement courses={courses} updateCourse={updateCourse} />} />
            <Route path="/add-course" element={<AddCourse addCourse={addCourse} />} />
            <Route path="/edit-course/:id" element={<EditCourse updateCourse={updateCourse} />} />
            
            <Route path="/" element={<Navigate to="/course-management" />} />
          </Routes>
        </div>
      </div>
    </Router>
    </CourseProvider>
  );
}

export default App;


*/




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


     


  /*import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Page/Login';
import Signup from './components/Page/Signup';
import Welcome from'./components/Page/Welcome';
// Student Components
import Sidebar from './components/Student/Layout/Sidebar';
import Header from './components/Student/Layout/Header';
import Footer from './components/Student/Layout/Footer';
import Home from './components/Student/Routes/Home';
import MyCourse from './components/Student/Routes/MyCourse';
import LearningProgress from './components/Student/Routes/LearningProgress';
import Article from './components/Student/Routes/Article';
import CourseReactJS from './components/Student/Routes/Course Information/CourseReactJS';
import Learn1 from './components/Student/Routes/Course Information/Study Course/Learn1';

// Lecturer Components
import Sidebars from './components/Lecturer/Layouts/Sidebar';
import Homes from './components/Lecturer/Routes/Homes';
import CourseForm from './components/Lecturer/Routes/CourseForm';
import CourseInfo from './components/Lecturer/Routes/CourseInfo';
import CourseTable from './components/Lecturer/Routes/CourseTable';
import CourseList from './components/Lecturer/Routes/CourseList';
import FeedbackList from './components/Lecturer/Routes/FeedbackList';
import Feature from './components/Lecturer/Routes/Feature';

// Admin Components
import Headera from './components/Admin/Layout/Headera';
import Sidebara from './components/Admin/Layout/Sidebara';
import UserManagement from './components/Admin/User/UserManagement';
import AddUserModal from './components/Admin/User/Function/Add';
import ConfirmModal from './components/Admin/Course/Function/Confirm';
import EditUserModal from './components/Admin/User/Function/Edit';
import UserSearchForm from './components/Admin/User/Function/Search';
import CourseManagement from './components/Admin/Course/CourseManagement';
import AddCourse from './components/Admin/Course/Function/AddCourse';
import ConfirmModalCousre from './components/Admin/Course/Function/Confirm';
import EditCourse from './components/Admin/Course/Function/EditCourse';
import SearchCourses from './components/Admin/Course/Function/Search';
import Modala from './components/Admin/Course/Function/Modala';

function AppContent() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const showFooterPaths = ["/home", "/my-course", "/progress", "/article"];
  const shouldShowFooter = showFooterPaths.includes(location.pathname);

  // Check if the current path is either login or signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app-wrapper">
      <div className="container">
        {!isAuthPage && (
          location.pathname.includes("/admin") ? (
            <>
              <Sidebara />
              <Headera title="Admin Panel" />
            </>
          ) : location.pathname.includes("/lecturer") ? (
            <>
              <Sidebars />
              <Headera title="Lecturer Panel" />
            </>
          ) : (
            <>
              <Sidebar />
              <Header title="Student Panel" />
            </>
          )
        )}

        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/my-course" element={<MyCourse />} />
            <Route path="/progress" element={<LearningProgress />} />
            <Route path="/article" element={<Article />} />
            <Route path="/course/:courseId" element={<CourseReactJS courses={courses} />} />
            <Route path="/learn1" element={<Learn1 />} />
            <Route path="/learn2" element={<Learn2 />} />
            <Route path="/learn3" element={<Learn3 />} />

            <Route path="/lecturer/home" element={<Homes />} />
            <Route path="/lecturer/course-form" element={<CourseForm />} />
            <Route path="/lecturer/course-info" element={<CourseInfo />} />
            <Route path="/lecturer/course-table" element={<CourseTable />} />
            <Route path="/lecturer/course-list" element={<CourseList />} />
            <Route path="/lecturer/feedback-list" element={<FeedbackList />} />
            <Route path="/lecturer/feature" element={<Feature />} />

            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/add-user" element={<AddUserModal />} />
            <Route path="/admin/edit-user/:id" element={<EditUserModal />} />
            <Route path="/admin/course-management" element={<CourseManagement courses={courses} />} />
            <Route path="/admin/add-course" element={<AddCourse />} />
            <Route path="/admin/edit-course/:id" element={<EditCourse />} />
            <Route path="/admin/search-courses" element={<SearchCourses />} />
            <Route path="/admin/confirm" element={<ConfirmModal />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

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

// Make sure you're exporting the App component by default
export default App;
*/