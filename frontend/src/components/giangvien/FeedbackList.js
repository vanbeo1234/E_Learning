import React, { useState } from 'react';
import "./giangvien.css";
const FeedbackList = () => {
  const feedbacks = [
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },
    // Add more feedbacks as needed
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },
    // Add more feedbacks as needed
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },
    // Add more feedbacks as needed
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },
    // Add more feedbacks as needed
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },
    // Add more feedbacks as needed
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },
    // Add more feedbacks as needed
    { student: 'Nguyễn Văn A', course: 'Java core', content: 'XYZ', received: '10/3/2021', responded: '10/3/2021' },
    { student: 'Trần Thị B', course: '', content: 'ABC', received: '', responded: '20/3/2021' },

  ];

  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 25; //djust the number of feedbacks per page as needed

  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);
  const currentFeedbacks = feedbacks.slice((currentPage - 1) * feedbacksPerPage, currentPage * feedbacksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <div className="table-controls">
          <label htmlFor="entries">Hiện</label>
          <select id="entries">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>danh mục</span>
        </div>
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
                <td><button>Xem chi tiết</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;