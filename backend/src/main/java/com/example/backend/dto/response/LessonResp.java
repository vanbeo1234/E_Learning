package com.example.backend.dto.response;

import lombok.Data;

@Data
public class LessonResp {
    private Long id;
    private String lessonCode;
    private Integer lessonOrder;
    private String lessonName;
    private String videoLink;
    private String resourceLink;
}