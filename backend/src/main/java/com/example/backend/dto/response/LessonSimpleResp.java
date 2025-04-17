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
}
