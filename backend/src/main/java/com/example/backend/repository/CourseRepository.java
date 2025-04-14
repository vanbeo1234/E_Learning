package com.example.backend.repository;

import com.example.backend.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository thao tác với bảng COURSE trong database.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

  /**
   * Tìm khóa học theo mã khóa học.
   */
  Course findByCourseCode(String courseCode);

  @Query("SELECT c FROM Course c WHERE LOWER(c.courseCode) = LOWER(:courseCode)")
  Course findByCourseCodeIgnoreCase(@Param("courseCode") String courseCode);

  /**
   * Tìm kiếm khóa học theo nhiều tiêu chí (không phân trang).
   */
  @Query(value = """
      SELECT DISTINCT c.* FROM COURSE c
      LEFT JOIN INSTRUCTOR_ENROLLMENT ie ON c.ID = ie.COURSE_ID
      LEFT JOIN USER u ON ie.INSTRUCTOR_ID = u.ID
      WHERE (:courseName IS NULL OR c.COURSE_NAME LIKE CONCAT('%', :courseName, '%'))
        AND (:instructorName IS NULL OR u.NAME LIKE CONCAT('%', :instructorName, '%'))
        AND (:createdDate IS NULL OR DATE(c.CREATED_AT) = :createdDate)
        AND (:statusCode IS NULL OR c.STATUS_CODE = :statusCode)
      """, nativeQuery = true)
  List<Course> searchCourses(
      @Param("courseName") String courseName,
      @Param("instructorName") String instructorName,
      @Param("createdDate") LocalDate createdDate,
      @Param("statusCode") String statusCode);

  /**
   * Tìm kiếm khóa học theo nhiều tiêu chí (có phân trang).
   */
  @Query(value = """
      SELECT DISTINCT c.* FROM COURSE c
      LEFT JOIN INSTRUCTOR_ENROLLMENT ie ON c.ID = ie.COURSE_ID
      LEFT JOIN USER u ON ie.INSTRUCTOR_ID = u.ID
      WHERE (:courseName IS NULL OR c.COURSE_NAME LIKE CONCAT('%', :courseName, '%'))
        AND (:instructorName IS NULL OR u.NAME LIKE CONCAT('%', :instructorName, '%'))
        AND (:createdDate IS NULL OR DATE(c.CREATED_AT) = :createdDate)
        AND (:statusCode IS NULL OR c.STATUS_CODE = :statusCode)
        AND (:createdBy IS NULL OR c.CREATED_BY = :createdBy)
      """, countQuery = """
      SELECT COUNT(DISTINCT c.ID) FROM COURSE c
      LEFT JOIN INSTRUCTOR_ENROLLMENT ie ON c.ID = ie.COURSE_ID
      LEFT JOIN USER u ON ie.INSTRUCTOR_ID = u.ID
      WHERE (:courseName IS NULL OR c.COURSE_NAME LIKE CONCAT('%', :courseName, '%'))
        AND (:instructorName IS NULL OR u.NAME LIKE CONCAT('%', :instructorName, '%'))
        AND (:createdDate IS NULL OR DATE(c.CREATED_AT) = :createdDate)
        AND (:statusCode IS NULL OR c.STATUS_CODE = :statusCode)
        AND (:createdBy IS NULL OR c.CREATED_BY = :createdBy)
      """, nativeQuery = true)
  Page<Course> searchCoursesPaging(
      @Param("courseName") String courseName,
      @Param("instructorName") String instructorName,
      @Param("createdDate") LocalDate createdDate,
      @Param("statusCode") String statusCode,
      @Param("createdBy") String createdBy,
      Pageable pageable);
}
/*
 * public interface CourseRepository extends JpaRepository<Course, Long> {
    /**
     * Tìm khóa học theo mã khóa học (courseCode).
     *
     * @param courseCode mã định danh của khóa học (ví dụ: "C001")
     * @return Trả về một Optional chứa thông tin khóa học nếu tìm thấy,
     *         hoặc Optional rỗng nếu không có khóa học nào khớp.
     */
  //  Optional<Course> findByCourseCode(String courseCode);

//}
