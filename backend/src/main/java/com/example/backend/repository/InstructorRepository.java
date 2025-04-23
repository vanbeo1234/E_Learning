package com.example.backend.repository;

import com.example.backend.model.Course;
import com.example.backend.model.InstructorEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.example.backend.model.User;

import java.util.List;

@Repository
public interface InstructorRepository extends JpaRepository<InstructorEnrollment, Long> {

    List<InstructorEnrollment> findByCourseId(Long courseId);

    List<InstructorEnrollment> findByInstructorId(Long instructorId);

    Optional<InstructorEnrollment> findByCourseAndInstructor(Course course, User instructor);

    @Modifying
    @Query("DELETE FROM InstructorEnrollment ie WHERE ie.course.courseCode = :courseCode AND ie.instructor.userCode = :userCode")
    void deleteInstructorFromCourse(@Param("courseCode") String courseCode, @Param("userCode") String userCode);

    List<InstructorEnrollment> findByCourse(Course course);
}
