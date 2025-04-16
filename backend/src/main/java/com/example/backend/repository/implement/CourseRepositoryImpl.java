package com.example.backend.repository.implement;

import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.request.LessonDetailReq;
import com.example.backend.dto.request.UpdateCourseReq;
import com.example.backend.dto.response.CourseResp;
import com.example.backend.model.Course;
import com.example.backend.model.Instructor;
import com.example.backend.model.LessonDetail;
import com.example.backend.model.User;
import com.example.backend.repository.CourseRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.example.backend.dto.request.UpdateLessonReq;

import java.util.List;

@Repository
@Transactional
public class CourseRepositoryImpl implements CourseRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void updateCourse(UpdateCourseReq req) {
        Course course = entityManager.createQuery(
                "SELECT c FROM Course c WHERE LOWER(c.courseCode) = LOWER(:courseCode)", Course.class)
                .setParameter("courseCode", req.getCourseCode())
                .getSingleResult();

        course.setCourseName(req.getCourseName());
        course.setDescription(req.getDescription());
        course.setLearningOutcome(req.getLearningOutcome());
        course.setBackgroundImg(req.getBackgroundImg());
        course.setStartDate(req.getStartDate());
        course.setEndDate(req.getEndDate());
        course.setLessonCount(req.getLessonCount());
        course.setStatusCode(req.getStatusCode());
        course.setUpdatedBy(req.getUpdatedBy()); // Ensure the "updatedBy" field is updated
    }

    @Override
    public List<CourseResp> findAllCoursesWithInstructorsAndLessons() {
        return entityManager.createQuery("""
                    SELECT new com.example.backend.dto.response.CourseResp(
                        c.id, c.courseCode, c.courseName, c.description, c.learningOutcome, c.lessonCount,
                        c.startDate, c.endDate, c.statusCode, c.backgroundImg)
                    FROM Course c
                """, CourseResp.class).getResultList();
    }

    @Override
    public void addInstructorToCourse(String courseCode, User instructor) {
        Course course = entityManager.createQuery(
                "SELECT c FROM Course c WHERE LOWER(c.courseCode) = LOWER(:courseCode)", Course.class)
                .setParameter("courseCode", courseCode)
                .getSingleResult();

        Instructor ins = Instructor.builder()
                .course(course)
                .instructor(instructor)
                .build();

        entityManager.persist(ins);
    }

    @Override
    public CourseResp createCourse(CreateCourseReq req, String createdBy, String imagePath) {
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
                .createdBy(createdBy)
                .build();

        entityManager.persist(course);

        return new CourseResp(
                course.getId(), course.getCourseCode(), course.getCourseName(),
                course.getDescription(), course.getLearningOutcome(), course.getLessonCount(),
                course.getStartDate(), course.getEndDate(), course.getStatusCode(), course.getBackgroundImg());
    }

    @Override
    public Long findCourseIdByCourseCode(String courseCode) {
        return entityManager.createQuery(
                "SELECT c.id FROM Course c WHERE LOWER(c.courseCode) = LOWER(:courseCode)", Long.class)
                .setParameter("courseCode", courseCode)
                .getSingleResult();
    }

    private String generateCourseCode() {
        Long count = entityManager.createQuery("SELECT COUNT(c) FROM Course c", Long.class).getSingleResult();
        return "KH" + String.format("%03d", count + 1);
    }

    @Override
    public void addLessonToCourse(String courseCode, LessonDetailReq lessonReq) {
        Course course = entityManager.createQuery(
                "SELECT c FROM Course c WHERE LOWER(c.courseCode) = LOWER(:courseCode)", Course.class)
                .setParameter("courseCode", courseCode)
                .getSingleResult();

        LessonDetail lesson = LessonDetail.builder()
                .lessonCode(lessonReq.getLessonCode())
                .lessonOrder(lessonReq.getLessonOrder())
                .lessonName(lessonReq.getLessonName())
                .videoLink(lessonReq.getVideoLink())
                .resourceLink(lessonReq.getResourceLink())
                .course(course)
                .build();

        entityManager.persist(lesson);
    }

    @Override
    public void updateLessonInCourse(String courseCode, UpdateLessonReq lessonReq) {
        LessonDetail lesson = entityManager.createQuery(
                "SELECT l FROM LessonDetail l WHERE LOWER(l.lessonCode) = LOWER(:lessonCode) AND l.course.courseCode = :courseCode",
                LessonDetail.class)
                .setParameter("lessonCode", lessonReq.getLessonCode())
                .setParameter("courseCode", courseCode)
                .getSingleResult();

        lesson.setLessonName(lessonReq.getLessonName());
        lesson.setVideoLink(lessonReq.getVideoLink());
        lesson.setResourceLink(lessonReq.getResourceLink());
    }
}
