package com.example.backend.controller;

import com.example.backend.dto.request.CreateCommentReq;
import com.example.backend.dto.response.LessonCommentResp;
import com.example.backend.service.LessonCommentService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
/**
 * Controller xử lý các yêu cầu liên quan đến bình luận trong bài học.
 * Bao gồm: lấy danh sách bình luận theo khóa học, lấy bình luận mới nhất,
 * và tạo mới bình luận.
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/api/comment")
@RequiredArgsConstructor
public class LessonCommentController {

    private final LessonCommentService commentService;

    /**
     * Lấy danh sách toàn bộ bình luận của một khóa học theo courseCode.
     *
     * @param courseCode Mã khóa học
     * @return Danh sách các bình luận thuộc khóa học đó
     */
    @GetMapping("/course/{courseCode}")
    public ResponseEntity<?> getCommentsByCourse(@PathVariable String courseCode) {
        try {
            List<LessonCommentResp> comments = commentService.getCommentsByCourseId(courseCode);

            if (comments.isEmpty()) {
                return ResponseEntity.badRequest().body(
                    Map.of(
                        "errorStatus", 902,
                        "message", "Dữ liệu đầu vào không hợp lệ hoặc khóa học không tồn tại"
                    )
                );
            }

            return ResponseEntity.ok().body(
                Map.of(
                    "errorStatus", 901,
                    "message", "Lấy danh sách tin nhắn thành công",
                    "data", comments
                )
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                Map.of(
                    "errorStatus", 903,
                    "message", "Lỗi hệ thống, vui lòng thử lại sau"
                )
            );
        }
    }



    /**
     * Lấy bình luận mới nhất của mỗi khóa học, có thể lọc theo tên người gửi, tên khóa học hoặc ngày bình luận.
     *
     * @param senderName Tên người gửi (tùy chọn)
     * @param courseName Tên khóa học (tùy chọn)
     * @param commentDate Ngày bình luận (tùy chọn)
     * @return Danh sách bình luận mới nhất theo từng khóa học (áp dụng các bộ lọc nếu có)
     */
    @GetMapping("/latest-by-course")
    public ResponseEntity<?> getLastCommentsEachCourse(
            @RequestParam(required = false) String senderName,
            @RequestParam(required = false) String courseName,
            @RequestParam(required = false) String commentDate
    ) {
        try {
            List<LessonCommentResp> comments = commentService.getLastCommentsEachCourse(senderName, courseName, commentDate);

            if (comments.isEmpty()) {
                return ResponseEntity.badRequest().body(
                    Map.of(
                        "errorStatus", 902,
                        "message", "Không tìm thấy dữ liệu"
                    )
                );
            }

            Map<String, Object> response = new HashMap<>();
            response.put("errorStatus", 901);
            response.put("message", "Lấy danh sách thành công");
            response.put("data", comments);

            return ResponseEntity.ok().body(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of(
                        "errorStatus", 903,
                        "message", "Lỗi hệ thống, vui lòng thử lại sau"
                    )
            );
        }
    }


    /**
     * API tạo một bình luận mới
     *
     * @param request Đối tượng chứa thông tin bình luận (người gửi, nội dung, mã khóa học, ID bài học)
     * @return Bình luận đã được lưu và phản hồi lại dưới dạng LessonCommentResp
     */
    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody CreateCommentReq request) {
        try {
            // Thêm bình luận mới vào cơ sở dữ liệu
            LessonCommentResp savedComment = commentService.addComment(request);
    
            // Trả về phản hồi thành công với cấu trúc theo yêu cầu
            Map<String, Object> response = new HashMap<>();
            response.put("errorStatus", 901);
            response.put("message", "Tin nhắn đã được gửi");
            response.put("data", savedComment);
    
            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            // Trường hợp lỗi hệ thống
            return ResponseEntity.internalServerError().body(
                Map.of(
                    "errorStatus", 903,
                    "message", "Lỗi hệ thống, vui lòng thử lại sau"
                )
            );
        }
    }
}