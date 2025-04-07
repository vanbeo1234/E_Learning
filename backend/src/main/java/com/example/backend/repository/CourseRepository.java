package com.example.backend.repository;

import com.example.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Có thể thêm các phương thức tìm kiếm, ví dụ theo course code
    Course findByCourseCode(String courseCode);
}
