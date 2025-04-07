package com.example.backend.service.implement;
import com.example.backend.repository.InstructorRepository;
import com.example.backend.dto.response.CourseResp;
import com.example.backend.dto.response.InstructorResp;
import com.example.backend.model.Course;
import com.example.backend.model.Instructor;
import com.example.backend.repository.CourseRepository;
import com.example.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Override
    public List<CourseResp> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream()
                .map(course -> mapToCourseResp(course))
                .collect(Collectors.toList());
    }

    @Override
public CourseResp getCourseById(Long id) {
    Course course = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));

    // Lấy danh sách Instructor (thực ra là InstructorEnrollment)
    List<Instructor> instructorEnrollments = instructorRepository.findByCourseId(id);

    // Chuyển sang InstructorResp
    List<InstructorResp> instructors = instructorEnrollments.stream()
            .map(instructorEnrollment -> {
                InstructorResp instructorResp = new InstructorResp();
                instructorResp.setId(instructorEnrollment.getInstructor().getId());
                instructorResp.setName(instructorEnrollment.getInstructor().getName());
                return instructorResp;
            })
            .collect(Collectors.toList());

    // Gán vào CourseResp
    CourseResp courseResp = mapToCourseResp(course);
    courseResp.setInstructors(instructors);

    return courseResp;
}

    @Override
    public CourseResp getCourseByCode(String courseCode) {
        Course course = courseRepository.findByCourseCode(courseCode);
        return mapToCourseResp(course);
    }

    private CourseResp mapToCourseResp(Course course) {
        CourseResp responseDTO = new CourseResp();
        responseDTO.setId(course.getId());
        responseDTO.setCourseCode(course.getCourseCode());
        responseDTO.setCourseName(course.getCourseName());
        responseDTO.setDescription(course.getDescription());
        responseDTO.setLessonCount(course.getLessonCount());
        responseDTO.setStartDate(course.getStartDate());
        responseDTO.setEndDate(course.getEndDate());
        responseDTO.setStatusCode(course.getStatusCode());
        return responseDTO;
    }
}
