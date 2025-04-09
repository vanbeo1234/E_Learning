package com.example.backend.dto.response;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LessonCommentResp {
    private Integer lessonId;
    private String senderCode;
    private String message;
    private LocalDateTime commentTime;
}
