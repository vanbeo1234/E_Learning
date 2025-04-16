package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonSimpleResp {
    private Long lessonId;
    private String lessonName;
    private String videoLink;
    private String resourceLink;

    // Constructor dùng để ánh xạ từ LessonDetail
    public LessonSimpleResp(Long lessonId, String lessonName, String videoLink, String resourceLink) {
        this.lessonId = lessonId;
        this.lessonName = lessonName;
        this.videoLink = videoLink;
        this.resourceLink = resourceLink;
    }

}
