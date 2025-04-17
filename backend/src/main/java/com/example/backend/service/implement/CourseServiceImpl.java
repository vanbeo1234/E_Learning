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

import com.example.backend.common.Enum.Role;
import java.util.List;
import java.util.Collections;
import java.util.stream.Collectors;

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
        Course course = courseRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new RuntimeException("Course not found"));
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
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
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
                .createdBy(currentUser)
                .build();

        Course saved = courseRepository.save(course);

        List<User> allInstructors = userRepository.findByRole(Role.INSTRUCTOR.getValue());
        Collections.shuffle(allInstructors);
        List<User> selectedInstructors = allInstructors.stream().limit(2).collect(Collectors.toList());

        for (User instructor : selectedInstructors) {
            Instructor ins = Instructor.builder()
                    .course(saved)
                    .instructor(instructor)
                    .build();
            instructorRepository.save(ins);
        }

        if (req.getLessons() != null && !req.getLessons().isEmpty()) {
            List<LessonDetail> lessons = req.getLessons().stream().map(lessonReq -> LessonDetail.builder()
                    .lessonCode(lessonReq.getLessonCode())
                    .lessonOrder(lessonReq.getLessonOrder())
                    .lessonName(lessonReq.getLessonName())
                    .videoLink(lessonReq.getVideoLink())
                    .resourceLink(lessonReq.getResourceLink())
                    .course(saved)
                    .build()).collect(Collectors.toList());

            lessonDetailRepository.saveAll(lessons);
        }

        return buildCourseRespWithInstructorAndLessons(saved);
    }

    private String generateCourseCode() {
        long count = courseRepository.count() + 1;
        return "KH" + String.format("%03d", count);
    }

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

        return page.map(this::buildCourseRespWithInstructorAndLessons);
    }

    @Override
    public CourseDetailResp updateCourse(UpdateCourseReq req) {
        String trimmedCode = req.getCourseCode().trim();

        Course course = courseRepository.findByCourseCodeIgnoreCase(trimmedCode)
                .orElseThrow(() -> new IllegalArgumentException("Khóa học không tồn tại"));

        course.setCourseName(req.getCourseName());
        course.setDescription(req.getDescription());
        course.setLearningOutcome(req.getLearningOutcome());
        course.setBackgroundImg(req.getBackgroundImg());
        course.setStartDate(req.getStartDate());
        course.setEndDate(req.getEndDate());
        course.setLessonCount(req.getLessonCount());
        course.setStatusCode(req.getStatusCode());

        String updatedBy = SecurityContextHolder.getContext().getAuthentication().getName();
        course.setUpdatedBy(updatedBy);

        courseRepository.save(course);

        if (req.getLessons() != null) {
            for (UpdateLessonReq lessonReq : req.getLessons()) {
                LessonDetail lesson = lessonDetailRepository.findById(lessonReq.getLessonId())
                        .orElseThrow(() -> new IllegalArgumentException("Bài giảng không tồn tại"));
                lesson.setLessonName(lessonReq.getLessonName());
                lesson.setVideoLink(lessonReq.getVideoLink());
                lesson.setResourceLink(lessonReq.getResourceLink());
                lessonDetailRepository.save(lesson);
            }
        }

        return getCourseDetail(course.getId());
    }

    @Override
    public CourseDetailResp getCourseDetail(Long courseId) {
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid courseId"));

        if (!course.getCreatedBy().equalsIgnoreCase(currentUser)) {
            throw new IllegalArgumentException("Bạn không có quyền xem khóa học này");
        }

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
            InstructorSimpleResp instructorResp = new InstructorSimpleResp();
            instructorResp.setUserCode(u.getUserCode());
            instructorResp.setName(u.getName());
            instructorResp.setEmail(u.getEmail());
            instructorResp.setPhone(u.getPhone());
            instructorResp.setDateOfBirth(u.getDateOfBirth().toLocalDate().toString());
            instructorResp.setExperience(u.getExperience());
            instructorResp.setStatusCode(Enum.Status.valueOf(u.getStatusCode()).getValue());
            instructorResp.setRoleId(Enum.Role.INSTRUCTOR.getText());
            resp.setInstructor(instructorResp);
        }

        List<LessonDetail> lessons = lessonDetailRepository.findByCourse_IdOrderByLessonOrderAsc(courseId);
        List<LessonSimpleResp> lessonList = lessons.stream().map(l -> {
            LessonSimpleResp lessonResp = new LessonSimpleResp();
            lessonResp.setLessonId(l.getId());
            lessonResp.setLessonName(l.getLessonName());
            lessonResp.setVideoLink(l.getVideoLink());
            lessonResp.setResourceLink(l.getResourceLink());
            return lessonResp;
        }).collect(Collectors.toList());

        resp.setLessons(lessonList);
        return resp;
    }
}
