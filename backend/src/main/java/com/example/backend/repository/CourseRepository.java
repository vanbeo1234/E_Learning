package com.example.backend.repository;

import com.example.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    /**
     * Tìm khóa học theo mã khóa học (courseCode).
     *
     * @param courseCode mã định danh của khóa học (ví dụ: "C001")
     * @return Trả về một Optional chứa thông tin khóa học nếu tìm thấy,
     *         hoặc Optional rỗng nếu không có khóa học nào khớp.
     */
    Optional<Course> findByCourseCode(String courseCode);

}
