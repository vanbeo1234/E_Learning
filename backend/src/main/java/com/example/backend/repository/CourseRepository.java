package com.example.backend.repository;

import com.example.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    // Tìm khóa học theo mã
    Course findByCourseCode(String courseCode);

    /**
     * Đức thêmthêm
     * Tìm kiếm khóa học theo nhiều tiêu chí: tên khóa học, tên giảng viên, ngày
     * tạo, trạng thái
     *
     * @param courseName     tên khóa học
     * @param instructorName tên giảng viên
     * @param createdDate    ngày tạo
     * @param statusCode     mã trạng thái
     * @return danh sách khóa học thỏa mãn
     */
    @Query(value = "SELECT DISTINCT c.* FROM COURSE c " +
            "LEFT JOIN INSTRUCTOR_ENROLLMENT ie ON c.ID = ie.COURSE_ID " +
            "LEFT JOIN USER u ON ie.INSTRUCTOR_ID = u.ID " +
            "WHERE (:courseName IS NULL OR c.COURSE_NAME LIKE CONCAT('%', :courseName, '%')) " +
            "AND (:instructorName IS NULL OR u.NAME LIKE CONCAT('%', :instructorName, '%')) " +
            "AND (:createdDate IS NULL OR DATE(c.CREATED_AT) = :createdDate) " +
            "AND (:statusCode IS NULL OR c.STATUS_CODE = :statusCode)", nativeQuery = true)
    List<Course> searchCourses(
            @Param("courseName") String courseName,
            @Param("instructorName") String instructorName,
            @Param("createdDate") LocalDate createdDate,
            @Param("statusCode") String statusCode);
}
