package com.example.backend.service.implement;

import com.example.backend.dto.request.CreateCommentReq;
import com.example.backend.dto.response.LessonCommentResp;
import com.example.backend.model.LessonComment;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.LessonCommentRepository;
import com.example.backend.repository.UserRepository;
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
    private final UserRepository userRepository;       // 👈 thêm
    private final CourseRepository courseRepository;   // 👈 thêm
    @Override
public List<LessonCommentResp> getCommentsByCourseId(String courseCode) {
    List<LessonComment> comments = commentRepository.findByCourseCode(courseCode);

    // Lấy tên khóa học một lần thôi cho đỡ tốn truy vấn
    String courseName = courseRepository.findByCourseCode(courseCode)
            .map(course -> course.getCourseName())
            .orElse("Unknown");

    return comments.stream().map(comment -> {
        String senderName = userRepository.findByUserCode(comment.getSendUserId())
                .map(user -> user.getName())
                .orElse("Unknown");

        return LessonCommentResp.builder()
                .lessonId(comment.getLessonId())
                .senderCode(comment.getSendUserId())
                .senderName(senderName)
                .message(comment.getMessage())
                .commentTime(comment.getCommentTime())
                .courseName(courseName) // 👈 Thêm tên khóa học vào đây
                .build();
    }).collect(Collectors.toList());
}


@Override
public List<LessonCommentResp> getLastCommentsEachCourse(String senderName, String courseName, String commentDate) {
    List<LessonComment> lastComments = commentRepository.findLastCommentsPerCourse();

    return lastComments.stream()
            .filter(comment -> {
                boolean matchSender = true;
                boolean matchCourse = true;
                boolean matchDate = true;

                if (senderName != null && !senderName.isEmpty()) {
                    matchSender = userRepository.findByUserCode(comment.getSendUserId())
                            .map(user -> user.getName().toLowerCase().contains(senderName.toLowerCase()))
                            .orElse(false);
                }

                if (courseName != null && !courseName.isEmpty()) {
                    matchCourse = courseRepository.findByCourseCode(comment.getCourseCode())
                            .map(course -> course.getCourseName().toLowerCase().contains(courseName.toLowerCase()))
                            .orElse(false);
                }

                if (commentDate != null && !commentDate.isEmpty()) {
                    matchDate = comment.getCommentTime().toLocalDate().toString().equals(commentDate);
                }

                return matchSender && matchCourse && matchDate;
            })
            .map(comment -> {
                String sender = userRepository.findByUserCode(comment.getSendUserId())
                        .map(user -> user.getName())
                        .orElse("Unknown");

                String course = courseRepository.findByCourseCode(comment.getCourseCode())
                        .map(c -> c.getCourseName())
                        .orElse("Unknown");

                return LessonCommentResp.builder()
                        .lessonId(comment.getLessonId())
                        .senderCode(comment.getSendUserId())
                        .senderName(sender)
                        .message(comment.getMessage())
                        .commentTime(comment.getCommentTime())
                        .courseName(course)
                        .build();
            })
            .collect(Collectors.toList());
}


    @Override
public LessonCommentResp addComment(CreateCommentReq request) {
    LessonComment comment = LessonComment.builder()
            .courseCode(request.getCourseCode())
            .lessonId(request.getLessonId())  // Có thể null
            .sendUserId(request.getSendUserId())
            .message(request.getMessage())
            .commentTime(LocalDateTime.now())
            .build();

    LessonComment saved = commentRepository.save(comment);

    // Lấy tên người gửi
    String senderName = userRepository.findByUserCode(saved.getSendUserId())
            .map(user -> user.getName())
            .orElse("Unknown");

    // Lấy tên khóa học
    String courseName = courseRepository.findByCourseCode(saved.getCourseCode())
            .map(course -> course.getCourseName())
            .orElse("Unknown");

    return LessonCommentResp.builder()
            .lessonId(saved.getLessonId())
            .senderCode(saved.getSendUserId())
            .senderName(senderName)
            .message(saved.getMessage())
            .commentTime(saved.getCommentTime())
            .courseName(courseName)
            .build();
}

}