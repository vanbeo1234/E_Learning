package com.example.backend.service.implement;

import com.example.backend.dto.request.CourseSearchReq;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.response.CourseResp;
import com.example.backend.dto.response.InstructorResp;
import com.example.backend.dto.response.LessonResp;
import com.example.backend.dto.response.CourseDetailResp;
import com.example.backend.dto.response.InstructorSimpleResp;
import com.example.backend.dto.response.LessonSimpleResp;
import com.example.backend.model.Course;
import com.example.backend.model.Instructor;
import com.example.backend.model.LessonDetail;
import com.example.backend.model.User;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.InstructorRepository;
import com.example.backend.repository.LessonDetailRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Lớp triển khai cung cấp các chức năng xử lý liên quan đến khóa học,
 */
@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private LessonDetailRepository lessonDetailRepository;

    @Autowired
    private UserRepository userRepository;

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

    /**
     * Đức thêm
     * Phương thức này trả về danh sách các khóa học với phân trang.
     *
     * @param pageable thông tin phân trang
     * @return danh sách các khóa học với phân trang
     */
    @Override
    public Page<CourseResp> getCoursesPaging(Pageable pageable) {
        return courseRepository.findAll(pageable)
                .map(this::buildCourseRespWithInstructorAndLessons);
    }

    /**
     *
     * Tạo mới một khóa học với thông tin từ yêu cầu.
     *
     * @param req thông tin khóa học cần tạo
     * @return thông tin khóa học đã được tạo
     */
    @Override
    public CourseResp createCourse(CreateCourseReq req) {
        Course course = Course.builder()
                .courseCode(generateCourseCode())
                .courseName(req.getCourseName())
                .description(req.getDescription())
                .learningOutcome(req.getLearningOutcome())
                .backgroundImg(req.getBackgroundImg())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .lessonCount(req.getLessonCount())
                .statusCode(req.getStatusCode())
                .createdBy("admin")
                .build();

        Course saved = courseRepository.save(course);

        // Đức thêmthêm
        // Gán giảng viên vào khóa học
        if (req.getInstructorIds() != null) {
            for (Long instructorId : req.getInstructorIds()) {
                User instructor = userRepository.findById(instructorId)
                        .orElseThrow(() -> new RuntimeException("Instructor not found"));
                Instructor ins = Instructor.builder()
                        .course(saved)
                        .instructor(instructor)
                        .build();
                instructorRepository.save(ins);
            }
        }

        return buildCourseRespWithInstructorAndLessons(saved);
    }

    // Lấy chi tiết khóa học theo ID
    @Override
    public CourseDetailResp getCourseDetail(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        CourseDetailResp resp = new CourseDetailResp();
        resp.setId(course.getId());
        resp.setCourseCode(course.getCourseCode());
        resp.setCourseName(course.getCourseName());
        resp.setDescription(course.getDescription());
        resp.setLearningOutcome(course.getLearningOutcome());
        resp.setBackgroundImg(course.getBackgroundImg());
        resp.setStartDate(course.getStartDate());
        resp.setEndDate(course.getEndDate());
        resp.setLessonCount(course.getLessonCount());
        resp.setStatusCode(course.getStatusCode());

        List<Instructor> instructors = instructorRepository.findByCourseId(courseId);
        if (!instructors.isEmpty()) {
            User u = instructors.get(0).getInstructor();
            InstructorSimpleResp i = new InstructorSimpleResp();
            i.setUserCode(u.getUserCode());
            i.setName(u.getName());
            i.setEmail(u.getEmail());
            i.setPhone(u.getPhone());
            i.setDateOfBirth(u.getDateOfBirth().toLocalDate().toString());
            i.setExperience(u.getExperience());
            i.setStatusCode(u.getStatusCode());
            i.setRoleId("Giảng viên");
            resp.setInstructor(i);
        }

        List<LessonDetail> lessons = lessonDetailRepository.findByCourse_IdOrderByLessonOrderAsc(courseId);
        List<LessonSimpleResp> lessonList = lessons.stream().map(l -> {
            LessonSimpleResp r = new LessonSimpleResp();
            r.setLessonId(l.getId());
            r.setLessonName(l.getLessonName());
            r.setVideoLink(l.getVideoLink());
            r.setResourceLink(l.getResourceLink());
            return r;
        }).collect(Collectors.toList());
        resp.setLessons(lessonList);

        return resp;
    }

    private String generateCourseCode() {
        long count = courseRepository.count() + 1;
        return "KH" + String.format("%03d", count);
    }
}
