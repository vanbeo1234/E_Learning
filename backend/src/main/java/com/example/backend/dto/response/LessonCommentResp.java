package com.example.backend.dto.response;
import lombok.*;

import java.time.LocalDateTime;

/**
 * DTO dùng để trả về thông tin của một bình luận trong hệ thống.
 * Thường được sử dụng trong API phản hồi sau khi lấy hoặc tạo bình luận.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LessonCommentResp {
    private Integer lessonId;
    private String senderCode;
    private String senderName;
    private String message;
    private LocalDateTime commentTime;
    private String courseName;
}
