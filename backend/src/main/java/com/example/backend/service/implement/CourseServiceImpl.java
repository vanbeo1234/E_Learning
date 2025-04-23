package com.example.backend.service.implement;

import com.example.backend.dto.request.CourseFilterReq;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.request.UpdateCourseReq;

import com.example.backend.dto.response.*;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.InstructorRepository;
import com.example.backend.repository.LessonDetailRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Optional;

import com.example.backend.model.Course;
import com.example.backend.model.InstructorEnrollment;
import com.example.backend.model.User;
import com.example.backend.common.Enum.Role;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

        private static final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

        @Autowired
        private CourseRepository courseRepository;

        @Autowired
        private LessonDetailRepository lessonDetailRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private InstructorRepository instructorEnrollmentRepository;

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

        @Override
        public CourseResp createCourse(CreateCourseReq req) {
                String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
                String imagePath = req.getBackgroundImg() != null ? "/image/" + req.getBackgroundImg() : null;

                CourseResp courseResp = courseRepository.createCourse(req, currentUser, imagePath);

                if (SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {

                        Long instructorId = req.getInstructorId();
                        User selectedInstructor = userRepository.findById(instructorId)
                                        .orElseThrow(() -> new IllegalArgumentException("Giảng viên không tồn tại"));

                        Course course = courseRepository.findByCourseCode(courseResp.getCourseCode())
                                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy khóa học"));

                        Optional<InstructorEnrollment> existingEnrollment = instructorEnrollmentRepository
                                        .findByCourseAndInstructor(course, selectedInstructor);
                        if (existingEnrollment.isEmpty()) {

                                InstructorEnrollment enrollment = new InstructorEnrollment();
                                enrollment.setCourse(course);
                                enrollment.setInstructor(selectedInstructor);
                                instructorEnrollmentRepository.save(enrollment);
                        }

                } else {

                        User instructor = userRepository.findByUserCode(currentUser)
                                        .orElseThrow(() -> new IllegalArgumentException("Instructor không tồn tại"));

                        Course course = courseRepository.findByCourseCode(courseResp.getCourseCode())
                                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy khóa học"));

                        Optional<InstructorEnrollment> existingEnrollment = instructorEnrollmentRepository
                                        .findByCourseAndInstructor(course, instructor);
                        if (existingEnrollment.isEmpty()) {

                                InstructorEnrollment instructorEnrollment = new InstructorEnrollment();
                                instructorEnrollment.setCourse(course);
                                instructorEnrollment.setInstructor(instructor);
                                instructorEnrollmentRepository.save(instructorEnrollment);

                        }
                }

                if (req.getLessons() != null && !req.getLessons().isEmpty()) {
                        req.getLessons().forEach(lessonReq -> courseRepository
                                        .addLessonToCourse(courseResp.getCourseCode(), lessonReq));
                }

                Long courseId = courseRepository.findCourseIdByCourseCode(courseResp.getCourseCode());
                List<InstructorResp> instructorResps = courseRepository.findInstructorsByCourseId(courseId);
                List<LessonResp> lessonResps = courseRepository.findDetailedLessonsByCourseId(courseId);

                courseResp.setInstructors(instructorResps);
                courseResp.setLessons(lessonResps);
                courseResp.setCreatedBy(currentUser);

                return courseResp;
        }

        @Override
        public Page<CourseResp> filterCourses(CourseFilterReq req) {
                Pageable pageable = PageRequest.of(req.getPageNumber(), req.getPageSize());

                // Lấy tên người dùng hiện tại từ SecurityContext
                String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
                User user = userRepository.findByUserCode(currentUser)
                                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

                String createdBy = null;

                // Nếu là Instructor, gán createdBy là người dùng hiện tại
                if (user.getRoleId() == Role.INSTRUCTOR.getValue()) {
                        createdBy = currentUser;
                } else if (user.getRoleId() == Role.ADMIN.getValue()) {
                        // Nếu là Admin, không cần gán createdBy, lấy tất cả khóa học
                        createdBy = req.getCreatedBy(); // Admin có thể lọc theo yêu cầu của người dùng hoặc để null
                } else {
                        // Nếu không phải Admin hoặc Instructor, xử lý theo logic khác (nếu có)
                        createdBy = (req.getCreatedBy() != null && !req.getCreatedBy().isBlank()) ? req.getCreatedBy()
                                        : null;
                }

                // Truy vấn khóa học từ repository với các điều kiện lọc và phân trang
                Page<Course> page = courseRepository.searchCoursesPaging(
                                req.getCourseName(),
                                req.getInstructorName(),
                                req.getCreatedDate(),
                                req.getStatusCode(),
                                createdBy, // Chuyển giá trị createdBy vào
                                pageable);

                // Chuyển đổi dữ liệu từ Course entity sang CourseResp DTO và thêm giảng viên và
                // bài giảng vào CourseResp
                return page.map(course -> {
                        CourseResp courseResp = new CourseResp(
                                        course.getId(),
                                        course.getCourseCode(),
                                        course.getCourseName(),
                                        course.getDescription(),
                                        course.getLearningOutcome(),
                                        course.getLessonCount(),
                                        course.getStartDate(),
                                        course.getEndDate(),
                                        course.getStatusCode(),
                                        course.getBackgroundImg());

                        // Lấy danh sách giảng viên từ bảng InstructorEnrollment và map sang
                        // InstructorResp
                        List<InstructorResp> instructors = instructorEnrollmentRepository
                                        .findInstructorsByCourseId(course.getId());
                        if (instructors == null || instructors.isEmpty()) {
                                instructors = new ArrayList<>();
                        }
                        courseResp.setInstructors(instructors);

                        // Lấy danh sách bài giảng từ bảng LessonDetail và map sang LessonResp
                        List<LessonSimpleResp> lessonSimpleResps = lessonDetailRepository
                                        .findLessonsByCourseId(course.getId());
                        List<LessonResp> lessons = new ArrayList<>();
                        if (lessonSimpleResps != null && !lessonSimpleResps.isEmpty()) {
                                lessons = lessonSimpleResps.stream()
                                                .map(lesson -> new LessonResp(
                                                                lesson.getLessonId(),
                                                                lesson.getLessonCode(),
                                                                lesson.getLessonOrder(),
                                                                lesson.getLessonName(),
                                                                lesson.getVideoLink(),
                                                                lesson.getResourceLink()))
                                                .collect(Collectors.toList());
                        }
                        courseResp.setLessons(lessons);

                        // Đảm bảo lessonOrder luôn có giá trị nếu null
                        for (LessonResp lesson : lessons) {
                                if (lesson.getLessonOrder() == null) {
                                        lesson.setLessonOrder(0); // Giá trị mặc định cho lessonOrder
                                }
                        }

                        // Gán giá trị createdBy nếu có
                        courseResp.setCreatedBy(
                                        course.getCreatedBy() != null ? course.getCreatedBy() : "Không xác định");

                        return courseResp;
                });
        }

        @Override
        @Transactional
        public CourseDetailResp updateCourse(UpdateCourseReq req) {
                log.info("Cập nhật thông tin khóa học {}", req.getCourseCode());

                Course course = courseRepository.findByCourseCode(req.getCourseCode().trim())
                                .orElseThrow(() -> new IllegalArgumentException("Khóa học không tồn tại"));

                courseRepository.updateCourse(req);

                if (req.getLessons() != null && !req.getLessons().isEmpty()) {
                        req.getLessons().forEach(lessonReq -> courseRepository
                                        .updateLessonInCourse(req.getCourseCode(), lessonReq));
                }

                Long courseId = course.getId();

                List<InstructorResp> instructorResps = courseRepository.findInstructorsByCourseId(courseId);

                if (req.getNewInstructorCode() != null && !req.getNewInstructorCode().isBlank()) {
                        String newCode = req.getNewInstructorCode();
                        String oldCode = instructorResps.isEmpty() ? null : instructorResps.get(0).getUserCode();

                        if (oldCode != null && !oldCode.equals(newCode)) {
                                instructorEnrollmentRepository.deleteInstructorFromCourse(course.getCourseCode(),
                                                oldCode);
                        }

                        boolean alreadyAssigned = instructorResps.stream()
                                        .anyMatch(i -> i.getUserCode().equals(newCode));
                        if (!alreadyAssigned) {
                                User newInstructor = userRepository.findByUserCode(newCode)
                                                .orElseThrow(() -> new IllegalArgumentException(
                                                                "Giảng viên mới không tồn tại"));

                                InstructorEnrollment newEnrollment = new InstructorEnrollment();
                                newEnrollment.setCourse(course);
                                newEnrollment.setInstructor(newInstructor);
                                instructorEnrollmentRepository.save(newEnrollment);
                        }
                }

                List<InstructorResp> updatedInstructors = courseRepository.findInstructorsByCourseId(courseId);
                List<LessonResp> lessonResps = courseRepository.findDetailedLessonsByCourseId(courseId);

                List<InstructorSimpleResp> instructorSimpleResps = updatedInstructors.stream()
                                .map(instructor -> new InstructorSimpleResp(
                                                instructor.getUserCode(),
                                                instructor.getName(),
                                                instructor.getEmail(),
                                                instructor.getPhone(),
                                                instructor.getDateOfBirth(),
                                                instructor.getRoleId(),
                                                instructor.getStatusCode(),
                                                instructor.getExperience()))
                                .collect(Collectors.toList());

                List<LessonSimpleResp> lessonSimpleResps = lessonResps.stream()
                                .map(lesson -> new LessonSimpleResp(
                                                lesson.getLessonId(),
                                                lesson.getLessonCode(),
                                                lesson.getLessonName(),
                                                lesson.getVideoLink(),
                                                lesson.getResourceLink()))
                                .collect(Collectors.toList());

                return new CourseDetailResp(
                                course.getId(), course.getCourseCode(), course.getCourseName(),
                                course.getDescription(), course.getLearningOutcome(),
                                course.getBackgroundImg(), course.getStartDate(), course.getEndDate(),
                                course.getLessonCount(), course.getStatusCode(),
                                instructorSimpleResps, lessonSimpleResps);
        }

        @Override
        public CourseDetailResp getCourseDetail(Long courseId) {

                CourseResp courseResp = courseRepository.findCourseRespByCourseId(courseId)
                                .orElseThrow(() -> new IllegalArgumentException("Invalid courseId"));

                List<LessonSimpleResp> lessonList = lessonDetailRepository.findLessonsByCourseId(courseId);

                List<InstructorResp> instructorResps = courseRepository.findInstructorsByCourseId(courseId);

                List<InstructorSimpleResp> instructorList = instructorResps.stream()
                                .map(instructor -> new InstructorSimpleResp(
                                                instructor.getUserCode(),
                                                instructor.getName(),
                                                instructor.getEmail(),
                                                instructor.getPhone(),
                                                instructor.getDateOfBirth(),
                                                instructor.getRoleId(),
                                                instructor.getStatusCode(),
                                                instructor.getExperience()))
                                .collect(Collectors.toList());

                return new CourseDetailResp(courseResp.getId(), courseResp.getCourseCode(), courseResp.getCourseName(),
                                courseResp.getDescription(), courseResp.getLearningOutcome(),
                                courseResp.getBackgroundImg(), courseResp.getStartDate(), courseResp.getEndDate(),
                                courseResp.getLessonCount(), courseResp.getStatusCode(), instructorList, lessonList);
        }

}
