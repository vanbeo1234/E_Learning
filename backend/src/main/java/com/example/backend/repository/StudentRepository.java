package com.example.backend.repository;

import com.example.backend.model.Student;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);

    List<Student> findByStudent(User student);
}