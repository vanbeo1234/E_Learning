package com.example.backend.dto.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateCommentRequest {
    private Integer courseCode;
    private Integer lessonId;        // Không bắt buộc
    private String sendUserId;
    private String message;
}
