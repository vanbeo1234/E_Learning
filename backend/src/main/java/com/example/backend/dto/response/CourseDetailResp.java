package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

/**
 * CourseDetailResp: Response chứa thông tin chi tiết khóa học, giảng viên chính
 * và danh sách bài học.
 */
@Getter
@Setter
public class CourseDetailResp {
    private Long id;
    private String courseCode;
    private String courseName;
    private String description;
    private String learningOutcome;
    private String backgroundImg;
    private LocalDate startDate;
    private LocalDate endDate;
    private int lessonCount;
    private String statusCode;
    private InstructorSimpleResp instructor;
    private List<LessonSimpleResp> lessons;
}