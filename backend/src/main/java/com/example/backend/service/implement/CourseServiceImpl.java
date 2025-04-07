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
/**
 * Lớp triển khai {@link CourseService} cung cấp các chức năng xử lý liên quan đến khóa học,
 * bao gồm lấy tất cả khóa học, lấy khóa học theo ID hoặc mã khóa học,
 * đồng thời tích hợp dữ liệu giảng viên tham gia từng khóa học.
 *
 * <p>Lớp này đóng vai trò trung gian giữa lớp Controller và tầng Repository,
 * thực hiện việc tổng hợp dữ liệu từ nhiều nguồn trước khi trả về client.</p>
 */
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
                .map(course -> {
                    CourseResp courseResp = mapToCourseResp(course);

                    // Lấy danh sách Instructor theo từng course
                    List<Instructor> instructorEnrollments = instructorRepository.findByCourseId(course.getId());

                    List<InstructorResp> instructors = instructorEnrollments.stream()
                            .map(enrollment -> {
                                InstructorResp instructorResp = new InstructorResp();
                                instructorResp.setId(enrollment.getInstructor().getId());
                                instructorResp.setName(enrollment.getInstructor().getName());
                                return instructorResp;
                            })
                            .collect(Collectors.toList());

                    courseResp.setInstructors(instructors);

                    return courseResp;
                })
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
