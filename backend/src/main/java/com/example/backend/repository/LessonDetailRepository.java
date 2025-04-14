package com.example.backend.repository;

import com.example.backend.model.Course;
import com.example.backend.model.LessonDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonDetailRepository extends JpaRepository<LessonDetail, Long> {

    List<LessonDetail> findByCourseId(Long courseId);

    List<LessonDetail> findByCourseOrderByLessonOrderAsc(Course course);

    List<LessonDetail> findByCourse_IdOrderByLessonOrderAsc(Long courseId);

}
