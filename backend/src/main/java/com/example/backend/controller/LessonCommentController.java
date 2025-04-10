package com.example.backend.controller;

import com.example.backend.dto.request.CreateCommentReq;
import com.example.backend.dto.response.LessonCommentResp;
import com.example.backend.service.LessonCommentService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller xử lý các yêu cầu liên quan đến bình luận trong bài học.
 * Bao gồm: lấy danh sách bình luận theo khóa học, lấy bình luận mới nhất,
 * và tạo mới bình luận.
 */

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/comments")
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
    public List<LessonCommentResp> getCommentsByCourse(@PathVariable String courseCode) {
        return commentService.getCommentsByCourseId(courseCode);
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
    public ResponseEntity<List<LessonCommentResp>> getLastCommentsEachCourse(
            @RequestParam(required = false) String senderName,
            @RequestParam(required = false) String courseName,
            @RequestParam(required = false) String commentDate
    ) {
        return ResponseEntity.ok(
                commentService.getLastCommentsEachCourse(senderName, courseName, commentDate)
        );
    }

    /**
     * API tạo một bình luận mới
     *
     * @param request Đối tượng chứa thông tin bình luận (người gửi, nội dung, mã khóa học, ID bài học)
     * @return Bình luận đã được lưu và phản hồi lại dưới dạng LessonCommentResp
     */
    @PostMapping
    public ResponseEntity<LessonCommentResp> createComment(@RequestBody CreateCommentReq request) {
        LessonCommentResp savedComment = commentService.addComment(request);
        return ResponseEntity.ok(savedComment);
    }

}