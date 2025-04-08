package com.example.backend.service.implement;

import com.example.backend.dto.request.CourseSearchReq;
import com.example.backend.dto.response.CourseResp;
import com.example.backend.dto.response.InstructorResp;
import com.example.backend.dto.response.LessonResp;
import com.example.backend.model.Course;
import com.example.backend.model.Instructor;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.InstructorRepository;
import com.example.backend.repository.LessonDetailRepository;
import com.example.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Lớp triển khai {@link CourseService} cung cấp các chức năng xử lý liên quan
 * đến khóa học,
 * bao gồm lấy tất cả khóa học, lấy khóa học theo ID hoặc mã khóa học,
 * đồng thời tích hợp dữ liệu giảng viên tham gia từng khóa học.
 *
 * <p>
 * Lớp này đóng vai trò trung gian giữa lớp Controller và tầng Repository,
 * thực hiện việc tổng hợp dữ liệu từ nhiều nguồn trước khi trả về client.
 * </p>
 */
@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private LessonDetailRepository lessonDetailRepository;

    @Override
    public List<CourseResp> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream()
                .map(this::buildCourseRespWithInstructorAndLessons)
                .collect(Collectors.toList());
    }

    @Override
    public CourseResp getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return buildCourseRespWithInstructorAndLessons(course);
    }

    @Override
    public CourseResp getCourseByCode(String courseCode) {
        Course course = courseRepository.findByCourseCode(courseCode);
        return buildCourseRespWithInstructorAndLessons(course);
    }

    @Override
    public List<CourseResp> searchCourses(CourseSearchReq request) {
        List<Course> filtered = courseRepository.searchCourses(
                request.getCourseName(),
                request.getInstructorName(),
                request.getCreatedDate(),
                request.getStatusCode());
        return filtered.stream()
                .map(this::buildCourseRespWithInstructorAndLessons)
                .collect(Collectors.toList());
    }

    private CourseResp buildCourseRespWithInstructorAndLessons(Course course) {
        CourseResp responseDTO = new CourseResp();
        responseDTO.setId(course.getId());
        responseDTO.setCourseCode(course.getCourseCode());
        responseDTO.setCourseName(course.getCourseName());
        responseDTO.setDescription(course.getDescription());
        responseDTO.setLessonCount(course.getLessonCount());
        responseDTO.setStartDate(course.getStartDate());
        responseDTO.setEndDate(course.getEndDate());
        responseDTO.setStatusCode(course.getStatusCode());

        var lessonEntities = lessonDetailRepository.findByCourse_IdOrderByLessonOrderAsc(course.getId());
        var lessonDTOs = lessonEntities.stream().map(lesson -> {
            LessonResp lessonResp = new LessonResp();
            lessonResp.setId(lesson.getId());
            lessonResp.setLessonCode(lesson.getLessonCode());
            lessonResp.setLessonOrder(lesson.getLessonOrder());
            lessonResp.setLessonName(lesson.getLessonName());
            lessonResp.setVideoLink(lesson.getVideoLink());
            lessonResp.setResourceLink(lesson.getResourceLink());
            return lessonResp;
        }).collect(Collectors.toList());
        responseDTO.setLessons(lessonDTOs);

        List<Instructor> instructorEnrollments = instructorRepository.findByCourseId(course.getId());
        List<InstructorResp> instructors = instructorEnrollments.stream()
                .map(enrollment -> {
                    InstructorResp instructorResp = new InstructorResp();
                    instructorResp.setId(enrollment.getInstructor().getId());
                    instructorResp.setName(enrollment.getInstructor().getName());
                    return instructorResp;
                }).collect(Collectors.toList());
        responseDTO.setInstructors(instructors);

        return responseDTO;
    }
}
