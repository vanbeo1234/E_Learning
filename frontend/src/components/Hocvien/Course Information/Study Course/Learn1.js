import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './learn.css';

const Learn1 = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [showQA, setShowQA] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const totalLessons = 10;

  useEffect(() => {
    // Fetch progress data from API
    fetch('https://api.example.com/progress')
      .then(response => response.json())
      .then(data => setCompletedLessons(data.completedLessons))
      .catch(error => console.error('Error fetching progress data:', error));

    // Fetch comments data from API
    fetch('https://api.example.com/comments')
      .then(response => response.json())
      .then(data => setComments(data.comments))
      .catch(error => console.error('Error fetching comments data:', error));
  }, []);

  const progressPercentage = (completedLessons / totalLessons) * 100;

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  const toggleQA = () => {
    setShowQA(!showQA);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return; // Prevent adding empty comments
    const newCommentData = {
      user: 'Current User',
      content: newComment,
      timestamp: new Date().toLocaleString(),
      avatar: 'path_to_avatar_image.jpg', // Add avatar path
    };
    setComments((prevComments) => [...prevComments, newCommentData]);
    setNewComment('');
  };

  return (
    <div className="learn1-container">
      <div className="learn1-left-section">
        <div className="learn1-video-and-controls">
          <div className="learn1-video-section">
            <h2>1. Giới thiệu ReactJS. Tại sao nên học ReactJS?</h2>
            <video controls>
              <source src="path_to_your_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="learn1-progress-notes-qa">
            <button onClick={toggleNotes} aria-label="Toggle Notes" className="notes-button">
              <i className="fas fa-plus"></i> Thêm ghi chú tại 00:00
            </button>
            {showNotes && (
              <div className="notes-popup">
                <h3 className="notes-title">Ghi chú của tôi</h3>
                <div className="notes-dropdown">
                  <select>
                    <option>Trong chương hiện tại</option>
                    <option>Mới nhất</option>
                  </select>
                </div>
                <textarea className="notes-input" placeholder="Nhập ghi chú của bạn..."></textarea>
                <button onClick={toggleNotes} aria-label="Close Notes" className="close-notes-button">Đóng</button>
              </div>
            )}

         <button onClick={toggleQA} aria-label="Toggle Q&A" className="qa-button">
           <i className="fas fa-comment-dots"></i> Hỏi đáp
         </button>
         {showQA && (
           <div className="qa-popup">
             <button onClick={toggleQA} aria-label="Close Q&A" className="close-qa-button">X</button>
             <div className="comments-list">
               {comments.map((comment, index) => (
                 <div key={index} className="comment">
                   <img src={comment.avatar} alt="Avatar" className="comment-avatar" />
                   <div className="comment-details">
                     <div className="comment-user">{comment.user}</div>
                     <div className="comment-timestamp">{comment.timestamp}</div>
                     <div className="comment-content">{comment.content}</div>
                   </div>
                 </div>
               ))}
             </div>
             <div className="new-comment-section">
               <textarea
                 className="new-comment-input"
                 placeholder="Nhập câu hỏi hoặc bình luận của bạn..."
                 value={newComment}
                 onChange={(e) => setNewComment(e.target.value)}
               ></textarea>
               <button onClick={handleAddComment} className="send-comment-button">
                 <i className="fas fa-paper-plane"></i>
               </button>
             </div>
           </div>
         )}
       </div>
     </div>
     <div className="navigation-buttons">
       <Link to="/previous-lesson">
         <button aria-label="Previous Lesson">
           <i className="fas fa-arrow-left"></i> Bài trước
         </button>
       </Link>
       <Link to="/next-lesson">
         <button aria-label="Next Lesson">
           Tiếp theo <i className="fas fa-arrow-right"></i>
         </button>
       </Link>
     </div>
   </div>
   <div className="learn1-content-rating">
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
         <li>10. Deploy ứng dụng lên Headde</li>         <li>1. Giới thiệu</li>
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
     <button className="rate-button">
       <i className="fas fa-star"></i> Đánh giá khóa học
     </button>
   </div>
 </div>
);
};

export default Learn1;
