package com.example.backend.repository;

import com.example.backend.model.LessonComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonCommentRepository extends JpaRepository<LessonComment, Integer> {
    List<LessonComment> findByCourseCode(String courseCode);
    @Query("SELECT c FROM LessonComment c WHERE c.id IN (" +
       "SELECT MAX(c2.id) FROM LessonComment c2 GROUP BY c2.courseCode)")
    List<LessonComment> findLastCommentsPerCourse();

}
