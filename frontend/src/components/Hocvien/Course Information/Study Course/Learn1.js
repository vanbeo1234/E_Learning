import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './learn.css';

const Learn1 = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(4); // Example: 4 lessons completed out of 10

  const totalLessons = 10;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div className="learn1-container">
      <div className="learn1-left-section">
        <div className="learn1-video-section">
          <h2>1. Giới thiệu ReactJS. Tại sao nên học ReactJS?</h2>
          <video controls>
            <source src="path_to_your_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="learn1-info-section">
          <div className="learn1-progress-notes">
            <div className="learn1-progress">
              <p>Hoàn thành: {progressPercentage}% ({completedLessons}/{totalLessons} bài học)</p>
              <div className="progress-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${progressPercentage}, 100`}
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">{`${Math.round(progressPercentage)}%`}</text>
                </svg>
              </div>
            </div>
            <button onClick={toggleNotes}>
              <i className="fas fa-sticky-note"></i> Ghi chú
            </button>
            {showNotes && (
              <div className="notes-popup">
                <h3>Ghi chú</h3>
                <p>Đây là ghi chú của bạn...</p>
                <button onClick={toggleNotes}>Đóng</button>
              </div>
            )}
          </div>
          <div className="learn1-qa-rate">
            <button className="qa-button">
              <i className="fas fa-question-circle"></i> Hỏi đáp
            </button>
            <button className="rate-button">
              <i className="fas fa-star"></i> Đánh giá khóa học
            </button>
          </div>
        </div>
        <div className="learn1-navigation">
          <Link to="/previous-lesson">
            <button>Bài trước</button>
          </Link>
          <Link to="/next-lesson">
            <button>Tiếp theo</button>
          </Link>
        </div>
      </div>
      <div className="learn1-content-list">
        <h3>Nội dung khóa học</h3>
        <ul>
          <li>1. Giới thiệu</li>
          <li>2. Lập trình ES6++</li>
          <li>3. React, Redux</li>
          <li>4. JSX, Components, Props</li>
          <li>5. Create React App</li>
          <li>6. Hooks</li>
          <li>7. CSS, SCSS và CSS Modules</li>
          <li>8. React Router V6</li>
          <li>9. Redux (quản lý state)</li>
          <li>10. Deploy ứng dụng lên Headde</li>
        </ul>
      </div>
    </div>
  );
};

export default Learn1;
