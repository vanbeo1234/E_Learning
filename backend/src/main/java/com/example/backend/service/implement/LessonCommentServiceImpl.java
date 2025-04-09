package com.example.backend.service.implement;

import com.example.backend.dto.request.CreateCommentRequest;
import com.example.backend.dto.response.LessonCommentResp;
import com.example.backend.model.LessonComment;
import com.example.backend.repository.LessonCommentRepository;
import com.example.backend.service.LessonCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonCommentServiceImpl implements LessonCommentService {

    private final LessonCommentRepository commentRepository;

    @Override
    public List<LessonCommentResp> getCommentsByCourseId(Integer courseId) {
        List<LessonComment> comments = commentRepository.findByCourseCode(courseId);
        return comments.stream().map(comment -> LessonCommentResp.builder()
                .lessonId(comment.getLessonId())
                .senderCode(comment.getSendUserId())
                .message(comment.getMessage())
                .commentTime(comment.getCommentTime())
                .build()).collect(Collectors.toList());
    }
    @Override
    public List<LessonCommentResp> getLastCommentsEachCourse() {
        List<LessonComment> lastComments = commentRepository.findLastCommentsPerCourse();
        return lastComments.stream()
                .map(comment -> LessonCommentResp.builder()
                        .lessonId(comment.getLessonId())
                        .senderCode(comment.getSendUserId())
                        .message(comment.getMessage())
                        .commentTime(comment.getCommentTime())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public LessonComment addComment(CreateCommentRequest request) {
        LessonComment comment = LessonComment.builder()
                .courseCode(request.getCourseCode())
                .lessonId(request.getLessonId())  // Có thể null
                .sendUserId(request.getSendUserId())
                .message(request.getMessage())
                .commentTime(LocalDateTime.now())
                .build();

        return commentRepository.save(comment);
    }
}