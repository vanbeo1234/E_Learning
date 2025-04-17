package com.example.backend.repository.implement;

import com.example.backend.common.util.EmbedUtil;
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
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.example.backend.dto.request.UpdateLessonReq;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * Lớp triển khai các phương thức thao tác với dữ liệu liên quan đến khóa học,
 * giảng viên và bài giảng.
 * Các phương thức bao gồm: thêm mới khóa học, cập nhật thông tin khóa học, thêm
 * bài giảng, cập nhật bài giảng,
 * và lấy danh sách các khóa học kèm giảng viên, bài giảng.
 */
@Repository
@Slf4j
@Transactional
public class CourseRepositoryImpl implements CourseRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Cập nhật thông tin khóa học theo yêu cầu.
     * 
     * @param req Đối tượng chứa các thông tin cần cập nhật cho khóa học
     */
    @Override
    public void updateCourse(UpdateCourseReq req) {
        // Tìm khóa học theo courseCode
        Course course = entityManager.createQuery(
                "SELECT c FROM Course c WHERE LOWER(c.courseCode) = LOWER(:courseCode)", Course.class)
                .setParameter("courseCode", req.getCourseCode())
                .getSingleResult();

        // Cập nhật thông tin khóa học
        course.setCourseName(req.getCourseName());
        course.setDescription(req.getDescription());
        course.setLearningOutcome(req.getLearningOutcome());
        course.setBackgroundImg(req.getBackgroundImg());
        course.setStartDate(req.getStartDate());
        course.setEndDate(req.getEndDate());
        course.setLessonCount(req.getLessonCount());
        course.setStatusCode(req.getStatusCode());
        course.setUpdatedBy(req.getUpdatedBy()); // Đảm bảo trường "updatedBy" được cập nhật

        // Thực hiện cập nhật vào cơ sở dữ liệu
        entityManager.merge(course); // merge sẽ lưu lại thay đổi

        log.info("Khóa học {} đã được cập nhật thành công", req.getCourseCode());
    }

    /**
     * Lấy danh sách tất cả khóa học kèm theo giảng viên và bài giảng.
     * 
     * @return Danh sách các khóa học kèm giảng viên và bài giảng dưới dạng DTO
     */
    @Override
    public List<CourseResp> findAllCoursesWithInstructorsAndLessons() {
        return entityManager.createQuery("""
                    SELECT new com.example.backend.dto.response.CourseResp(
                        c.id, c.courseCode, c.courseName, c.description, c.learningOutcome, c.lessonCount,
                        c.startDate, c.endDate, c.statusCode, c.backgroundImg)
                    FROM Course c
                """, CourseResp.class).getResultList();
    }

    /**
     * Thêm giảng viên vào một khóa học.
     * 
     * @param courseCode Mã khóa học mà giảng viên sẽ được thêm vào
     * @param instructor Giảng viên cần thêm vào khóa học
     */
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

    /**
     * Tạo một khóa học mới và lưu vào cơ sở dữ liệu.
     * 
     * @param req       Đối tượng chứa thông tin khóa học cần tạo
     * @param createdBy Người tạo khóa học
     * @param imagePath Đường dẫn tới hình ảnh nền của khóa học
     * @return Đối tượng DTO phản hồi thông tin khóa học vừa tạo
     */
    @Override
    public CourseResp createCourse(CreateCourseReq req, String createdBy, String imagePath) {
        Course course = Course.builder()
                .courseCode(generateCourseCode())
                .courseName(req.getCourseName())
                .description(req.getDescription())
                .learningOutcome(req.getLearningOutcome())
                .backgroundImg(EmbedUtil.convertImageToFullPath(imagePath))
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

    /**
     * Lấy ID của khóa học dựa trên mã khóa học.
     * 
     * @param courseCode Mã khóa học cần tìm
     * @return ID của khóa học
     */
    @Override
    public Long findCourseIdByCourseCode(String courseCode) {
        return entityManager.createQuery(
                "SELECT c.id FROM Course c WHERE LOWER(c.courseCode) = LOWER(:courseCode)", Long.class)
                .setParameter("courseCode", courseCode)
                .getSingleResult();
    }

    /**
     * Tạo mã khóa học mới dựa trên số lượng khóa học hiện tại.
     * 
     * @return Mã khóa học mới
     */
    private String generateCourseCode() {
        Long count = entityManager.createQuery("SELECT COUNT(c) FROM Course c", Long.class).getSingleResult();
        return "KH" + String.format("%03d", count + 1);
    }

    /**
     * Thêm bài giảng vào khóa học.
     * 
     * @param courseCode Mã khóa học mà bài giảng sẽ được thêm vào
     * @param lessonReq  Thông tin bài giảng cần thêm
     */
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
                .videoLink(EmbedUtil.convertYoutubeUrlToEmbed(lessonReq.getVideoLink())) // ✅ link nhúng
                .resourceLink(EmbedUtil.convertResourceLink(lessonReq.getResourceLink()))
                .course(course)
                .build();

        entityManager.persist(lesson);
    }

    /**
     * Cập nhật thông tin một bài giảng trong khóa học theo courseCode và
     * lessonCode.
     *
     * @param courseCode mã khóa học cần cập nhật
     * @param lessonReq  đối tượng chứa thông tin bài học cần cập nhật
     */
    @Override
    public void updateLessonInCourse(String courseCode, UpdateLessonReq lessonReq) {
        try {
            // Sử dụng getResultList() thay vì getSingleResult() để xử lý trường hợp không
            // có kết quả
            List<LessonDetail> lessons = entityManager.createQuery(
                    "SELECT l FROM LessonDetail l WHERE l.id = :lessonId AND l.course.courseCode = :courseCode",
                    LessonDetail.class)
                    .setParameter("lessonId", lessonReq.getLessonId())
                    .setParameter("courseCode", courseCode)
                    .getResultList();

            if (lessons.isEmpty()) {
                // Nếu không tìm thấy bài học, ném ra lỗi tùy chỉnh
                throw new IllegalArgumentException(
                        "Không tìm thấy bài học với mã " + lessonReq.getLessonId() + " trong khóa học " + courseCode);
            }

            // Chỉ lấy bài học đầu tiên trong trường hợp có nhiều kết quả (dự kiến chỉ có 1)
            LessonDetail lesson = lessons.get(0);

            // Cập nhật thông tin bài học
            lesson.setLessonName(lessonReq.getLessonName());
            lesson.setVideoLink(lessonReq.getVideoLink());
            lesson.setResourceLink(lessonReq.getResourceLink());

            // Đảm bảo lưu vào DB nếu cần (có thể sử dụng transaction nếu cần)
            entityManager.flush(); // Dùng flush để áp dụng thay đổi vào cơ sở dữ liệu ngay lập tức

        } catch (NoResultException e) {
            // Xử lý nếu không tìm thấy bài học
            log.error("Không tìm thấy bài học với lessonId {} và courseCode {}", lessonReq.getLessonId(), courseCode);
            throw new RuntimeException("Không tìm thấy bài học với mã " + lessonReq.getLessonId());
        } catch (Exception e) {
            // Xử lý các lỗi khác
            log.error("Lỗi khi cập nhật bài học: {}", e.getMessage(), e);
            throw new RuntimeException("Cập nhật bài học thất bại: " + e.getMessage());
        }
    }

    /**
     * Xóa tất cả giảng viên của khóa học.
     * 
     * @param courseCode Mã khóa học
     */
    @Override
    public void removeInstructorsFromCourse(String courseCode) {
        entityManager.createQuery(
                "DELETE FROM Instructor i WHERE i.course.courseCode = :courseCode")
                .setParameter("courseCode", courseCode)
                .executeUpdate();
    }

    public List<User> findAllById(List<Long> instructorIds) {
        return entityManager.createQuery(
                "SELECT u FROM User u WHERE u.id IN :instructorIds", User.class)
                .setParameter("instructorIds", instructorIds)
                .getResultList();
    }

}
