package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CreateCommentReq {
    private String courseCode;
    private Integer lessonId;
    private String sendUserId;
    private String message;
}
