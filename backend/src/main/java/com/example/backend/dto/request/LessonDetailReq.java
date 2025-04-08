package com.example.backend.dto.request;
import lombok.Data;
@Data
public class LessonDetailReq {
    private Long id;
    private String lessonCode;
    private Integer lessonOrder;
    private String lessonName;
    private String videoLink;
    private String resourceLink;
    private Long courseId;
}
