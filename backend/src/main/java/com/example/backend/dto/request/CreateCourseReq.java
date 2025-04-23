package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CreateCourseReq {
    private String courseCode;
    private String courseName;
    private String description;
    private int lessonCount;
    private String learningOutcome;
    private String backgroundImg;
    private String statusCode;
    private Long instructorId;
    private List<LessonDetailReq> lessons;
    private LocalDate startDate;
    private LocalDate endDate;

}
