package com.example.backend.repository;

import com.example.backend.model.LessonComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonCommentRepository extends JpaRepository<LessonComment, Integer> {

       /**
        * Lấy toàn bộ danh sách bình luận dựa trên mã khóa học.
        * (Ghi chú: Phương thức này không được sử dụng trong LessonCommentServiceImpl,
        * xem xét xóa nếu không cần.)
        *
        * @param courseCode mã định danh của khóa học (ví dụ: "C001")
        * @return Danh sách các bình luận thuộc khóa học đó.
        */
       List<LessonComment> findByCourseCode(String courseCode);

       /**
        * Lấy mỗi bình luận mới nhất (id cao nhất) tương ứng với từng khóa học.
        * (Ghi chú: Phương thức này không hỗ trợ phân trang và không được sử dụng trong
        * LessonCommentServiceImpl, xem xét xóa hoặc sửa nếu cần.)
        *
        * @return Danh sách các bình luận mới nhất của từng khóa học.
        */
       @Query("SELECT c FROM LessonComment c WHERE c.id IN (" +
                     "SELECT MAX(c2.id) FROM LessonComment c2 GROUP BY c2.courseCode)")
       List<LessonComment> findLastCommentsPerCourse();

       /**
        * Lấy bình luận theo khóa học với phân trang.
        *
        * @param courseCode mã khóa học
        * @param pageable   phân trang
        * @return Trang các bình luận thuộc khóa học đó.
        */
       Page<LessonComment> findByCourseCode(String courseCode, Pageable pageable);

       /**
        * Lấy bình luận theo người gửi, tên khóa học và ngày bình luận với phân trang.
        *
        * @param senderName  tên người gửi bình luận (có thể null)
        * @param courseName  tên khóa học (có thể null)
        * @param commentDate ngày gửi bình luận (có thể null, định dạng yyyy-MM-dd)
        * @param pageable    phân trang kết quả
        * @return Trang các bình luận thỏa mãn điều kiện
        */
       @Query("SELECT c FROM LessonComment c " +
                     "JOIN User u ON c.sendUserId = u.userCode " +
                     "JOIN Course course ON c.courseCode = course.courseCode " +
                     "WHERE (:senderName IS NULL OR u.name LIKE %:senderName%) " +
                     "AND (:courseName IS NULL OR course.courseName LIKE %:courseName%) " +
                     "AND (:commentDate IS NULL OR CAST(c.commentTime AS date) = CAST(:commentDate AS date))")
       Page<LessonComment> findBySenderNameAndCourseNameAndCommentDate(
                     @Param("senderName") String senderName,
                     @Param("courseName") String courseName,
                     @Param("commentDate") String commentDate,
                     Pageable pageable);

}