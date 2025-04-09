package com.example.backend.controller;

import com.example.backend.dto.request.CreateCommentRequest;
import com.example.backend.dto.response.LessonCommentResp;
import com.example.backend.model.LessonComment;
import com.example.backend.service.LessonCommentService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class LessonCommentController {

    private final LessonCommentService commentService;

    @GetMapping("/course/{courseId}")
    public List<LessonCommentResp> getCommentsByCourse(@PathVariable Integer courseId) {
        return commentService.getCommentsByCourseId(courseId);
    }
    @GetMapping("/latest-by-course")
    public ResponseEntity<List<LessonCommentResp>> getLastCommentsEachCourse() {
        return ResponseEntity.ok(commentService.getLastCommentsEachCourse());
    }
    @PostMapping
    public ResponseEntity<LessonComment> createComment(@RequestBody CreateCommentRequest request) {
        LessonComment savedComment = commentService.addComment(request);
        return ResponseEntity.ok(savedComment);
}
}