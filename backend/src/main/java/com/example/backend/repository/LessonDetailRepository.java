package com.example.backend.repository;

import com.example.backend.model.Course;
import com.example.backend.model.LessonDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonDetailRepository extends JpaRepository<LessonDetail, Long> {

    List<LessonDetail> findByCourseId(Long courseId); //Truy vấn danh sách bài học theo khóa học, sắp xếp tăng dần theo thứ tự bài học (lessonOrder)
    List<LessonDetail> findByCourseOrderByLessonOrderAsc(Course course); //Truy vấn danh sách bài học theo ID của khóa học
    List<LessonDetail> findByCourse_IdOrderByLessonOrderAsc(Long courseId);


}
