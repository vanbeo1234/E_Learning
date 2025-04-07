package com.example.backend.dto.response;

import lombok.Data;
import java.time.LocalDate;
import java.util.List; // ✅ Phải thêm dòng này

@Data
public class CourseResp {
    private Long id;
    private String courseCode;
    private String courseName;
    private String description;
    private int lessonCount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String statusCode;
    private List<InstructorResp> instructors;
}
