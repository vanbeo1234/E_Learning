package com.example.backend.service.implement;

import com.example.backend.dto.request.CourseFilterReq;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.request.UpdateCourseReq;

import com.example.backend.dto.response.*;
import com.example.backend.repository.CourseRepository;

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
// import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {
        // Khai báo logger
        private static final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

        @Autowired
        private CourseRepository courseRepository;

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

        @Override
        public CourseResp createCourse(CreateCourseReq req) {
                String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
                String imagePath = req.getBackgroundImg() != null ? "/image/" + req.getBackgroundImg() : null;

                // 1. Tạo khóa học và lấy thông tin CourseResp cơ bản
                CourseResp courseResp = courseRepository.createCourse(req, currentUser, imagePath);

                // 2. Kiểm tra vai trò người dùng (Admin hoặc Instructor)
                // (Không cần kiểm tra thủ công, Spring Security đã phân quyền rồi)

                // 3. Nếu là Admin, chọn giảng viên ngẫu nhiên
                if (SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                        // Admin có thể chọn giảng viên ngẫu nhiên
                        List<User> selectedInstructors = userRepository.findAllById(req.getInstructorIds());
                        selectedInstructors.forEach(instructor -> courseRepository
                                        .addInstructorToCourse(courseResp.getCourseCode(), instructor));
                } else {
                        // 4. Nếu là Instructor, chỉ có giảng viên đó là người tạo khóa học
                        User instructor = userRepository.findByUserCode(currentUser)
                                        .orElseThrow(() -> new IllegalArgumentException("Instructor không tồn tại"));
                        courseRepository.addInstructorToCourse(courseResp.getCourseCode(), instructor);
                }

                // 5. Thêm bài học vào khóa học nếu có
                if (req.getLessons() != null && !req.getLessons().isEmpty()) {
                        req.getLessons().forEach(lessonReq -> courseRepository
                                        .addLessonToCourse(courseResp.getCourseCode(), lessonReq));
                }

                // 6. Gán instructors, lessons, createdBy vào courseResp
                Long courseId = courseRepository.findCourseIdByCourseCode(courseResp.getCourseCode());
                List<InstructorResp> instructorResps = courseRepository.findInstructorsByCourseId(courseId);
                List<LessonResp> lessonResps = courseRepository.findDetailedLessonsByCourseId(courseId);

                courseResp.setInstructors(instructorResps);
                courseResp.setLessons(lessonResps);
                courseResp.setCreatedBy(currentUser);

                return courseResp;
        }

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
                        createdBy = (req.getCreatedBy() != null && !req.getCreatedBy().isBlank()) ? req.getCreatedBy()
                                        : null;
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

        @Override
        public CourseDetailResp updateCourse(UpdateCourseReq req) {
                // Log thông tin khi bắt đầu cập nhật khóa học
                log.info("Bắt đầu cập nhật khóa học với courseCode: {}", req.getCourseCode());

                // Kiểm tra khóa học với courseCode được truyền trong request
                CourseResp courseResp = courseRepository.findCourseRespByCourseCode(req.getCourseCode().trim())
                                .orElseThrow(() -> new IllegalArgumentException("Khóa học không tồn tại"));

                // Cập nhật thông tin khóa học
                try {
                        log.info("Cập nhật thông tin khóa học {}", req.getCourseCode());
                        courseRepository.updateCourse(req.getCourseName(), req.getDescription(),
                                        req.getLearningOutcome(),
                                        req.getBackgroundImg(), req.getStartDate(), req.getEndDate(),
                                        req.getLessonCount(),
                                        req.getStatusCode(), req.getCourseCode().trim());
                } catch (Exception e) {
                        log.error("Lỗi khi cập nhật khóa học: {}", e.getMessage(), e);
                        throw new RuntimeException("Cập nhật khóa học thất bại: " + e.getMessage());
                }

                // Kiểm tra giảng viên mới và cập nhật
                if (req.getInstructorIds() != null && !req.getInstructorIds().isEmpty()) {
                        // Log khi bắt đầu cập nhật giảng viên
                        log.info("Cập nhật giảng viên cho khóa học: {}", req.getCourseCode());

                        // Xóa giảng viên cũ và thêm giảng viên mới
                        courseRepository.removeInstructorsFromCourse(courseResp.getCourseCode());

                        List<User> selectedInstructors = userRepository.findAllById(req.getInstructorIds());
                        if (selectedInstructors.isEmpty()) {
                                log.error("Không có giảng viên hợp lệ được chọn cho khóa học: {}", req.getCourseCode());
                                throw new IllegalArgumentException("Không có giảng viên hợp lệ được chọn");
                        }

                        selectedInstructors.forEach(instructor -> {
                                courseRepository.addInstructorToCourse(courseResp.getCourseCode(), instructor);
                                log.info("Giảng viên {} đã được thêm vào khóa học {}", instructor.getUserCode(),
                                                req.getCourseCode());
                        });
                }

                // Cập nhật bài học nếu có
                if (req.getLessons() != null) {
                        log.info("Cập nhật bài học cho khóa học {}", req.getCourseCode());
                        req.getLessons().forEach(lessonReq -> {
                                try {
                                        courseRepository.updateLessonInCourse(courseResp.getCourseCode(), lessonReq);
                                        log.info("Bài học {} đã được cập nhật trong khóa học {}",
                                                        lessonReq.getLessonCode(), req.getCourseCode());
                                } catch (Exception e) {
                                        log.error("Lỗi khi cập nhật bài học {} trong khóa học {}: {}",
                                                        lessonReq.getLessonCode(), req.getCourseCode(), e.getMessage());
                                }
                        });
                }

                // Lấy thông tin chi tiết của khóa học và các bài giảng
                Long courseId = courseRepository.findCourseIdByCourseCode(courseResp.getCourseCode());
                List<InstructorResp> instructorResps = courseRepository.findInstructorsByCourseId(courseId);
                List<LessonResp> lessonResps = courseRepository.findDetailedLessonsByCourseId(courseId);

                // Chuyển đổi từ InstructorResp và LessonResp sang InstructorSimpleResp và
                // LessonSimpleResp
                List<InstructorSimpleResp> instructorSimpleResps = instructorResps.stream()
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
                                .map(lesson -> new LessonSimpleResp(lesson.getLessonId(), lesson.getLessonName(),
                                                lesson.getVideoLink(), lesson.getResourceLink()))
                                .collect(Collectors.toList());

                // Trả về thông tin khóa học chi tiết
                log.info("Cập nhật khóa học {} thành công.", req.getCourseCode());
                return new CourseDetailResp(courseResp.getId(), courseResp.getCourseCode(), courseResp.getCourseName(),
                                courseResp.getDescription(), courseResp.getLearningOutcome(),
                                courseResp.getBackgroundImg(), courseResp.getStartDate(), courseResp.getEndDate(),
                                courseResp.getLessonCount(), courseResp.getStatusCode(), instructorSimpleResps,
                                lessonSimpleResps);
        }

        @Override
        public CourseDetailResp getCourseDetail(Long courseId) {
                // Lấy thông tin khóa học
                CourseResp courseResp = courseRepository.findCourseRespByCourseId(courseId)
                                .orElseThrow(() -> new IllegalArgumentException("Invalid courseId"));

                // Lấy danh sách bài học
                List<LessonSimpleResp> lessonList = lessonDetailRepository.findLessonsByCourseId(courseId);

                // Lấy danh sách giảng viên từ khóa học
                List<InstructorResp> instructorResps = courseRepository.findInstructorsByCourseId(courseId);

                // Chuyển đổi từ InstructorResp sang InstructorSimpleResp
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

                // Trả về chi tiết khóa học cùng giảng viên và bài học
                return new CourseDetailResp(courseResp.getId(), courseResp.getCourseCode(), courseResp.getCourseName(),
                                courseResp.getDescription(), courseResp.getLearningOutcome(),
                                courseResp.getBackgroundImg(), courseResp.getStartDate(), courseResp.getEndDate(),
                                courseResp.getLessonCount(), courseResp.getStatusCode(), instructorList, lessonList);
        }

}
