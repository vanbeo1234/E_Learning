package com.example.backend.repository;

import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.request.LessonDetailReq;
import com.example.backend.dto.request.UpdateCourseReq;
import com.example.backend.dto.request.UpdateLessonReq;
import com.example.backend.dto.response.CourseResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

import com.example.backend.model.Course;
import com.example.backend.model.User;

public interface CourseRepositoryCustom {
    void updateCourse(UpdateCourseReq req);

    List<CourseResp> findAllCoursesWithInstructorsAndLessons();

    CourseResp createCourse(CreateCourseReq req, String createdBy, String imagePath);

    void addInstructorToCourse(String courseCode, User instructor);

    Long findCourseIdByCourseCode(String courseCode);

    void addLessonToCourse(String courseCode, LessonDetailReq lessonReq);

    void updateLessonInCourse(String courseCode, UpdateLessonReq lessonReq);

    void removeInstructorsFromCourse(String courseCode);

    /**
     * Lọc khóa học dành riêng cho giảng viên, gồm các khóa học:
     * - do chính giảng viên tạo ra (createdBy = instructorCode)
     * - hoặc được admin gán thông qua bảng INSTRUCTOR_ENROLLMENT
     *
     * @param courseName     Tên khóa học (tùy chọn)
     * @param instructorCode Mã người dùng của giảng viên đang đăng nhập
     * @param createdDate    Ngày tạo (tùy chọn)
     * @param statusCode     Trạng thái (tùy chọn)
     * @param pageable       Phân trang
     * @return Trang kết quả chứa các khóa học phù hợp
     */
    Page<Course> searchCoursesForInstructor(String courseName, String instructorName, LocalDate createdDate,
            String statusCode, Pageable pageable);
}
