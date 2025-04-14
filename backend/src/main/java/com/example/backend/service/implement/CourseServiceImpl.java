package com.example.backend.service.implement;

import com.example.backend.common.Enum;
import com.example.backend.dto.request.CourseFilterReq;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.request.UpdateCourseReq;
import com.example.backend.dto.request.UpdateLessonReq;
import com.example.backend.dto.response.*;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import java.util.Optional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Lớp triển khai cung cấp các chức năng xử lý liên quan đến khóa học
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

    private CourseResp buildCourseRespWithInstructorAndLessons(Course course) {
        CourseResp responseDTO = new CourseResp();
        responseDTO.setId(course.getId());
        responseDTO.setCourseCode(course.getCourseCode());
        responseDTO.setCourseName(course.getCourseName());
        responseDTO.setDescription(course.getDescription());
        responseDTO.setLearningOutcome(course.getLearningOutcome());
        responseDTO.setLessonCount(course.getLessonCount());
        responseDTO.setStartDate(course.getStartDate());
        responseDTO.setEndDate(course.getEndDate());
        responseDTO.setStatusCode(course.getStatusCode());
        responseDTO.setBackgroundImg(course.getBackgroundImg());

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

        // Lấy thông tin giảng viên từ course
        List<Instructor> instructorEnrollments = instructorRepository.findByCourseId(course.getId());
        List<InstructorResp> instructors = instructorEnrollments.stream()
                .map(enrollment -> {
                    InstructorResp instructorResp = new InstructorResp();
                    instructorResp.setId(enrollment.getInstructor().getId());
                    instructorResp.setName(enrollment.getInstructor().getName());
                    instructorResp.setUserCode(enrollment.getInstructor().getUserCode());
                    return instructorResp;
                }).collect(Collectors.toList());
        responseDTO.setInstructors(instructors);

        return responseDTO;
    }

    @Override
    public CourseResp createCourse(CreateCourseReq req) {
        // Tạo khóa học mới
        String imagePath = req.getBackgroundImg() != null ? "/image/" + req.getBackgroundImg() : null;

        Course course = Course.builder()
                .courseCode(generateCourseCode())
                .courseName(req.getCourseName())
                .description(req.getDescription())
                .learningOutcome(req.getLearningOutcome())
                .backgroundImg(imagePath)
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .lessonCount(req.getLessonCount())
                .statusCode(req.getStatusCode())
                .createdBy(Enum.Role.ADMIN.getText()) // Hoặc dùng người tạo khóa học
                .build();

        // Lưu khóa học vào cơ sở dữ liệu
        Course saved = courseRepository.save(course);

        // Lấy giảng viên từ thông tin người dùng đang đăng nhập
        User instructor = getCurrentInstructor(); // Tự động lấy giảng viên từ token hoặc Spring Security

        if (instructor != null) {
            Instructor ins = Instructor.builder()
                    .course(saved)
                    .instructor(instructor) // Gán giảng viên vào khóa học
                    .build();
            instructorRepository.save(ins); // Lưu thông tin giảng viên vào bảng INSTRUCTOR_ENROLLMENT
        }

        // Thêm bài giảng vào khóa học
        if (req.getLessons() != null && !req.getLessons().isEmpty()) {
            List<LessonDetail> lessons = req.getLessons().stream().map(lessonReq -> {
                return LessonDetail.builder()
                        .lessonCode(lessonReq.getLessonCode())
                        .lessonOrder(lessonReq.getLessonOrder())
                        .lessonName(lessonReq.getLessonName())
                        .videoLink(lessonReq.getVideoLink())
                        .resourceLink(lessonReq.getResourceLink())
                        .course(saved) // Gán khóa học
                        .build();
            }).collect(Collectors.toList());

            lessonDetailRepository.saveAll(lessons); // Lưu các bài giảng vào cơ sở dữ liệu
        }

        // Trả về thông tin khóa học cùng với giảng viên và bài giảng
        return buildCourseRespWithInstructorAndLessons(saved);
    }

    // Lấy giảng viên hiện tại từ Spring Security
    private User getCurrentInstructor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userCode = (String) authentication.getPrincipal(); // Lấy userCode từ token hoặc security context

        Optional<User> optionalInstructor = userRepository.findByUserCode(userCode);

        // Kiểm tra và trả về người dùng là giảng viên
        User instructor = optionalInstructor.orElseThrow(() -> new RuntimeException("Instructor not found"));

        if (!instructor.getRole().equals("INSTRUCTOR")) {
            throw new RuntimeException("User is not a valid instructor");
        }
        return instructor;
    }

    @Override
    public CourseDetailResp getCourseDetail(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid courseId"));

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
        resp.setStatusCode(Enum.Status.valueOf(course.getStatusCode()).getValue());

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
            i.setStatusCode(Enum.Status.valueOf(u.getStatusCode()).getValue());
            i.setRoleId(Enum.Role.INSTRUCTOR.getText());
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

    @Override
    public Page<CourseResp> filterCourses(CourseFilterReq req) {
        Pageable pageable = PageRequest.of(req.getPageNumber(), req.getPageSize());

        Page<Course> page = courseRepository.searchCoursesPaging(
                req.getCourseName(),
                req.getInstructorName(),
                req.getCreatedDate(),
                req.getStatusCode(),
                req.getCreatedBy(),
                pageable);

        return page.map(this::buildCourseRespWithInstructorAndLessons);
    }

    /**
     * Cập nhật thông tin một khóa học và danh sách bài giảng tương ứng.
     *
     * @param req yêu cầu cập nhật thông tin khóa học
     * @return CourseDetailResp chứa thông tin sau khi cập nhật
     * @throws IllegalArgumentException nếu courseCode không tồn tại hoặc lessonId
     *                                  không hợp lệ
     */
    @Override
    public CourseDetailResp updateCourse(UpdateCourseReq req) {
        String trimmedCode = req.getCourseCode().trim();

        Course course = courseRepository.findByCourseCodeIgnoreCase(trimmedCode);

        course.setCourseName(req.getCourseName());
        course.setDescription(req.getDescription());
        course.setLearningOutcome(req.getLearningOutcome());

        String imagePath = req.getBackgroundImg() != null && !req.getBackgroundImg().startsWith("/image/")
                ? "/image/" + req.getBackgroundImg()
                : req.getBackgroundImg();
        course.setBackgroundImg(imagePath);
        course.setStartDate(req.getStartDate());
        course.setEndDate(req.getEndDate());
        course.setLessonCount(req.getLessonCount());
        course.setStatusCode(req.getStatusCode());
        course.setUpdatedBy(req.getUpdatedBy());

        courseRepository.save(course);

        if (req.getLessons() != null) {
            for (UpdateLessonReq lessonReq : req.getLessons()) {
                LessonDetail lesson = lessonDetailRepository.findById(lessonReq.getLessonId())
                        .orElseThrow(() -> new IllegalArgumentException("Lesson not found"));
                lesson.setLessonName(lessonReq.getLessonName());
                lesson.setVideoLink(lessonReq.getVideoLink());
                lesson.setResourceLink(lessonReq.getResourceLink());
                lessonDetailRepository.save(lesson);
            }
        }

        return getCourseDetail(course.getId());
    }

}
