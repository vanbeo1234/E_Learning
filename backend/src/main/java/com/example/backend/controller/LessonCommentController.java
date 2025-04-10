package com.example.backend.controller;

import com.example.backend.dto.request.CreateCommentReq;
import com.example.backend.dto.response.LessonCommentResp;
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

    @GetMapping("/course/{courseCode}")
    public List<LessonCommentResp> getCommentsByCourse(@PathVariable String courseCode) {
        return commentService.getCommentsByCourseId(courseCode);
    }
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

    @PostMapping
    public ResponseEntity<LessonCommentResp> createComment(@RequestBody CreateCommentReq request) {
        LessonCommentResp savedComment = commentService.addComment(request);
        return ResponseEntity.ok(savedComment);
    }

}