package com.example.backend.service.implement;

import com.example.backend.dto.request.CourseFilterReq;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.request.UpdateCourseReq;
import com.example.backend.dto.response.*;
import com.example.backend.repository.CourseRepository;
//import com.example.backend.repository.InstructorRepository;
import com.example.backend.repository.LessonDetailRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.model.Course;
import com.example.backend.model.User;
import com.example.backend.common.Enum.Role;
import java.util.List;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // @Autowired
    // private InstructorRepository instructorRepository;

    @Autowired
    private LessonDetailRepository lessonDetailRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Lấy tất cả các khóa học từ repository và trả về danh sách khóa học
     * với giảng viên và bài học (nếu có).
     * 
     * @return Danh sách khóa học với giảng viên và bài học.
     */
    @Override
    public List<CourseResp> getAllCourses() {
        return courseRepository.findAllCoursesWithInstructorsAndLessons().stream()
                .collect(Collectors.toList());
    }

    /**
     * Lấy thông tin khóa học theo ID.
     * 
     * @param id ID của khóa học.
     * @return Thông tin khóa học.
     */
    @Override
    public CourseResp getCourseById(Long id) {
        return courseRepository.findCourseRespByCourseId(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    /**
     * Lấy thông tin khóa học theo mã khóa học.
     * 
     * @param courseCode Mã khóa học.
     * @return Thông tin khóa học.
     */
    @Override
    public CourseResp getCourseByCode(String courseCode) {
        return courseRepository.findCourseRespByCourseCode(courseCode)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    /**
     * Tạo một khóa học mới và thêm giảng viên, bài học liên quan.
     * 
     * @param req Thông tin của khóa học cần tạo.
     * @return Thông tin của khóa học mới tạo.
     */
    @Override
    public CourseResp createCourse(CreateCourseReq req) {
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        String imagePath = req.getBackgroundImg() != null ? "/image/" + req.getBackgroundImg() : null;

        CourseResp courseResp = courseRepository.createCourse(req, currentUser, imagePath);

        List<User> allInstructors = userRepository.findByRole(Role.INSTRUCTOR.getValue());
        Collections.shuffle(allInstructors);
        List<User> selectedInstructors = allInstructors.stream().limit(2).collect(Collectors.toList());

        selectedInstructors
                .forEach(instructor -> courseRepository.addInstructorToCourse(courseResp.getCourseCode(), instructor));

        if (req.getLessons() != null && !req.getLessons().isEmpty()) {
            req.getLessons()
                    .forEach(lessonReq -> courseRepository.addLessonToCourse(courseResp.getCourseCode(), lessonReq));
        }

        return courseResp;
    }

    /*
     * private String generateCourseCode() {
     * long count = courseRepository.count() + 1;
     * return "KH" + String.format("%03d", count);
     * }
     */

    /**
     * Lọc các khóa học theo các tiêu chí và phân trang.
     * 
     * @param req Các yêu cầu lọc (tên khóa học, giảng viên, ngày tạo, trạng thái).
     * @return Danh sách khóa học sau khi lọc và phân trang.
     */
    @Override
    public Page<CourseResp> filterCourses(CourseFilterReq req) {
        Pageable pageable = PageRequest.of(req.getPageNumber(), req.getPageSize());
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUserCode(currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        String createdBy;
        if (user.getRoleId() == Role.INSTRUCTOR.getValue()) {
            createdBy = currentUser;
        } else {
            createdBy = (req.getCreatedBy() != null && !req.getCreatedBy().isBlank()) ? req.getCreatedBy() : null;
        }

        Page<Course> page = courseRepository.searchCoursesPaging(
                req.getCourseName(),
                req.getInstructorName(),
                req.getCreatedDate(),
                req.getStatusCode(),
                createdBy,
                pageable);

        return page.map(course -> new CourseResp(
                course.getId(),
                course.getCourseCode(),
                course.getCourseName(),
                course.getDescription(),
                course.getLearningOutcome(),
                course.getLessonCount(),
                course.getStartDate(),
                course.getEndDate(),
                course.getStatusCode(),
                course.getBackgroundImg()));
    }

    /**
     * Cập nhật thông tin khóa học và bài giảng liên quan.
     * 
     * @param req Thông tin khóa học cần cập nhật.
     * @return Thông tin khóa học chi tiết sau khi cập nhật.
     */
    @Override
    public CourseDetailResp updateCourse(UpdateCourseReq req) {

        CourseResp courseResp = courseRepository.findCourseRespByCourseCode(req.getCourseCode().trim())
                .orElseThrow(() -> new IllegalArgumentException("Khóa học không tồn tại"));

        courseRepository.updateCourse(req.getCourseName(), req.getDescription(), req.getLearningOutcome(),
                req.getBackgroundImg(), req.getStartDate(), req.getEndDate(), req.getLessonCount(),
                req.getStatusCode(), req.getCourseCode().trim());

        if (req.getLessons() != null) {
            req.getLessons()
                    .forEach(lessonReq -> courseRepository.updateLessonInCourse(courseResp.getCourseCode(), lessonReq));
        }

        return getCourseDetail(courseResp.getId());
    }

    /**
     * Lấy thông tin chi tiết khóa học, giảng viên và bài học.
     * 
     * @param courseId ID của khóa học.
     * @return Thông tin chi tiết khóa học bao gồm giảng viên và bài học.
     */
    @Override
    public CourseDetailResp getCourseDetail(Long courseId) {

        CourseResp courseResp = courseRepository.findCourseRespByCourseId(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid courseId"));

        List<LessonSimpleResp> lessonList = lessonDetailRepository.findLessonsByCourseId(courseId);

        InstructorSimpleResp instructorResp = new InstructorSimpleResp();

        return new CourseDetailResp(courseResp.getId(), courseResp.getCourseCode(), courseResp.getCourseName(),
                courseResp.getDescription(), courseResp.getLearningOutcome(), courseResp.getBackgroundImg(),
                courseResp.getStartDate(), courseResp.getEndDate(), courseResp.getLessonCount(),
                courseResp.getStatusCode(), instructorResp, lessonList);
    }

}
