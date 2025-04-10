package com.example.backend.service;

import com.example.backend.dto.request.CreateCommentReq;
import com.example.backend.dto.response.LessonCommentResp;

import java.util.List;

public interface LessonCommentService {
    List<LessonCommentResp> getCommentsByCourseId(String courseCode);
    List<LessonCommentResp> getLastCommentsEachCourse(String senderName, String courseName, String commentDate);
    LessonCommentResp addComment(CreateCommentReq request);
}
