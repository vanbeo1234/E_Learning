import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './learn.css';

const Learn1 = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [newNote, setNewNote] = useState(''); // Note persists after saving
  const [showQA, setShowQA] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
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

  const toggleRating = () => {
    setShowRating(!showRating);
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

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleConfirmRating = () => {
    // Log or handle rating and comment
    console.log('Rating:', rating, 'Comment:', comment);
    // Optionally reset the rating and comment after confirmation
    setRating(0);
    setComment('');
    toggleRating(); // Close the rating popup
  };

  const handleSaveNote = () => {
    // Handle saving the note
    console.log('Saved Note:', newNote);
    setShowNotes(false); // Close the notes section after saving
    // Note is not cleared, so it persists
  };

  // Course content list with lock icons
  const courseContent = [
    '1. Giới thiệu',
    '2. Lập trình ES6++',
    '3. React, Redux',
    '4. JSX, Components, Props',
    '5. Create React App',
    '6. Hooks',
    '7. CSS, SCSS và CSS Modules',
    '8. React Router V6',
    '9. Redux (quản lý state)',
    '10. Deploy ứng dụng lên Headde', '9. Redux (quản lý state)',
    '10. Deploy ứng dụng lên Headde', '9. Redux (quản lý state)',
    '10. Deploy ứng dụng lên Headde', '9. Redux (quản lý state)',
    '10. Deploy ứng dụng lên Headde', '9. Redux (quản lý state)',
    '10. Deploy ứng dụng lên Headde', '9. Redux (quản lý state)',
    '10. Deploy ứng dụng lên Headde',
  ];

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
              <i className="fas fa-plus"></i> Thêm ghi chú 
            </button>
            {showNotes && (
              <div className="notes-popup">
                <h3 className="notes-title">Ghi chú của tôi</h3>
                <textarea
                  className="notes-input"
                  placeholder="Nhập ghi chú của bạn..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                ></textarea>
                <div className="notes-buttons">
                  <button onClick={handleSaveNote} className="save-note-button">Lưu</button>
                  <button onClick={toggleNotes} className="close-notes-button">Đóng</button>
                </div>
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

        {/* Navigation and Rating buttons section */}
        <div className="navigation-rating-buttons">
          <div className="navigation-buttons">
            <Link to="/previous-lesson">
              <button aria-label="Previous Lesson" className="previous-button">
                <i className="fas fa-arrow-left"></i> Bài trước
              </button>
            </Link>
            <Link to="/next-lesson">
              <button aria-label="Next Lesson" className="next-button">
                Tiếp theo <i className="fas fa-arrow-right"></i>
              </button>
            </Link>
          </div>
          <button onClick={toggleRating} className="rate-button">
            <i className="fas fa-star"></i> Đánh giá khóa học
          </button>
          {showRating && (
            <div className="rating-popup">
              <h3>Đánh giá khóa học</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fas fa-star ${star <= rating ? 'selected' : ''}`}
                    onClick={() => handleRating(star)}
                  ></i>
                ))}
              </div>
              <textarea
                className="comment-input"
                placeholder="Nhập nhận xét của bạn..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button className="confirm-button" onClick={handleConfirmRating}>
                Xác nhận
              </button>
              <button onClick={toggleRating} className="close-rating-button">Đóng</button>
            </div>
          )}
        </div>
      </div>

      <div className="learn1-content-rating">
        <div className="learn1-content-list">
          <h3>Nội dung khóa học</h3>
          <ul>
            {courseContent.map((lesson, index) => (
              <li key={index}>
                {lesson}
                {index !== 0 && (
                  <i className="fas fa-lock" style={{ marginLeft: '8px', color: '#888' }}></i>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Learn1;