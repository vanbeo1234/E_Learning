package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonResp {
    private Long id;
    private String lessonCode;
    private Integer lessonOrder;
    private String lessonName;
    private String videoLink;
    private String resourceLink;

    // Constructor nhận các tham số
    public LessonResp(Long id, String lessonCode, int lessonOrder, String lessonName, String videoLink,
            String resourceLink) {
        this.id = id;
        this.lessonCode = lessonCode;
        this.lessonOrder = lessonOrder;
        this.lessonName = lessonName;
        this.videoLink = videoLink;
        this.resourceLink = resourceLink;
    }

    // Constructor không tham số - cần thiết cho Hibernate/JPA
    public LessonResp() {
    }
}
