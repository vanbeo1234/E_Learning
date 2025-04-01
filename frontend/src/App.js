import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import CourseList from './components/giangvien/CourseList.js';
import FeedbackList from './components/giangvien/FeedbackList.js';
import CourseTable from './components/giangvien/CourseTable.js';
import CourseForm from './components/giangvien/CourseForm.js';
import CourseInfo from './components/giangvien/CourseInfo.js';
import Login from './components/Login.js';
import Signup from './components/Singup.js'; // Import the Signup component
import Singup from './components/Singup.js';
import ELearning from './components/Hocvien/Trangchu.js';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

      return (
        <Router>
  <ELearning/>
        </Router>
      );
    };
    
export default App;