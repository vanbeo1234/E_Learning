package com.example.backend.repository;

import com.example.backend.model.LessonComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonCommentRepository extends JpaRepository<LessonComment, Integer> {
    /**
     * Lấy toàn bộ danh sách bình luận dựa trên mã khóa học.
     *
     * @param courseCode mã định danh của khóa học (ví dụ: "C001)
     * @return Danh sách các bình luận thuộc khóa học đó.
     */
    List<LessonComment> findByCourseCode(String courseCode);

    /**
     * Lấy mỗi bình luận mới nhất (id cao nhất) tương ứng với từng khóa học.
     *
     * @return Danh sách các bình luận mới nhất của từng khóa học.
     */
    @Query("SELECT c FROM LessonComment c WHERE c.id IN (" +
       "SELECT MAX(c2.id) FROM LessonComment c2 GROUP BY c2.courseCode)")
    List<LessonComment> findLastCommentsPerCourse();

}
