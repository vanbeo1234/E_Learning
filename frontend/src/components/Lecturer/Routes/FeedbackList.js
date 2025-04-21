import React, { useState } from 'react';
import '../Style/giangvien.css';

const FeedbackList = () => {
  const feedbacks = [
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },
    // Add more feedbacks as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedbackIndex, setSelectedFeedbackIndex] = useState(null);
  const [showQA, setShowQA] = useState(false);
  const [comments, setComments] = useState([
    { user: "Admin", avatar: "https://via.placeholder.com/40", content: "Cảm ơn bạn đã góp ý!", timestamp: "10/3/2021 14:35" },
    { user: "Trần Thị B", avatar: "https://via.placeholder.com/40", content: "Mình thấy bài giảng hơi nhanh.", timestamp: "10/3/2021 15:00" },
  ]);
  const [newComment, setNewComment] = useState("");

  const feedbacksPerPage = 10;
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);
  const currentFeedbacks = feedbacks.slice((currentPage - 1) * feedbacksPerPage, currentPage * feedbacksPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const toggleQA = (index) => {
    if (selectedFeedbackIndex === index && showQA) {
      setShowQA(false);
      setSelectedFeedbackIndex(null);
    } else {
      setSelectedFeedbackIndex(index);
      setShowQA(true);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        user: "Giảng viên",
        avatar: "/images/teacher-avatar.png",
        content: newComment,
        timestamp: new Date().toLocaleString(),
        isTeacher: true
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };
  

  return (
    <div>
      <div className="search-bar">
        <input placeholder="Học viên" type="text" />
        <input placeholder="Khóa học" type="text" />
        <input placeholder="Ngày nhận" type="date" />
        <button>Tìm kiếm</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Học viên</th>
              <th>Khóa học</th>
              <th>Nội dung phản hồi</th>
              <th>Ngày nhận</th>
              <th>Ngày phản hồi</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentFeedbacks.map((fb, index) => (
              <tr key={index}>
                <td>{fb.student}</td>
                <td>{fb.course}</td>
                <td>{fb.content}</td>
                <td>{fb.received}</td>
                <td>{fb.responded}</td>
                <td>
                  <button onClick={() => toggleQA(index)}>
                    <i className="fas fa-comment-dots"></i> Xem chi tiết
                  </button>
                  {showQA && (
  <div className="feedback-popup-overlay">
    <div className="feedback-popup-slide">
      <button onClick={() => setShowQA(false)} className="popup-close-button">✕</button>
      <h3>Chi tiết bình luận</h3>
      <div className="popup-comments-list">
       {comments.map((comment, idx) => (
  <div
    key={idx}
    className={`popup-comment ${comment.isTeacher ? 'teacher' : 'student'}`}
  >
    {!comment.isTeacher && (
      <img src={comment.avatar} alt="Avatar" className="popup-comment-avatar" />
    )}
    <div className="popup-comment-details">
      <div className="popup-comment-user">{comment.user}</div>
      <div className="popup-comment-timestamp">{comment.timestamp}</div>
      <div className="popup-comment-content">{comment.content}</div>
    </div>
    {comment.isTeacher && (
      <img src={comment.avatar} alt="Avatar" className="popup-comment-avatar" />
    )}
  </div>
))}
      </div>
      <div className="popup-new-comment">
        <textarea
          className="popup-new-comment-input"
          placeholder="Nhập câu hỏi hoặc bình luận của bạn..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={handleAddComment} className="popup-send-button">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         {/* Nút phân trang */}
         <div className="pagination-buttons">
            <button onClick={() => handlePageChange(1)}>&laquo;</button>
            {[...Array(totalPages).keys()].map((number) => (
              <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
                {number + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(totalPages)}>&raquo;</button>
          </div>
      </div>
    </div>
  );
};

export default FeedbackList;
