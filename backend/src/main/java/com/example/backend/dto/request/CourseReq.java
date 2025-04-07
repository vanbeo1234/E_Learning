package com.example.backend.dto.request;

import lombok.Data;
import java.time.LocalDate;
@Data  // Tự động tạo getter, setter, toString, equals và hashCode
public class CourseReq {
    private String courseCode;
    private String courseName;
    private String description;
    private int lessonCount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String statusCode;
}
