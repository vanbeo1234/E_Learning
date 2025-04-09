package com.example.backend.service;

import com.example.backend.dto.request.CreateCommentRequest;
import com.example.backend.dto.response.LessonCommentResp;
import com.example.backend.model.LessonComment;

import java.util.List;

public interface LessonCommentService {
    List<LessonCommentResp> getCommentsByCourseId(Integer courseId);
    List<LessonCommentResp> getLastCommentsEachCourse();
    LessonComment addComment(CreateCommentRequest request);
}
