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
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    /**
     * Lấy tất cả bình luận liên quan đến một khóa học cụ thể theo mã khóa học.
     * Mỗi bình luận sẽ bao gồm cả tên người gửi và tên khóa học để tiện cho việc hiển thị phía client.
     */
    @Override
    public List<LessonCommentResp> getCommentsByCourseId(String courseCode) {
        List<LessonComment> comments = commentRepository.findByCourseCode(courseCode);

        // Lấy tên khóa học một lần để dùng chung cho tất cả bình luận
        String courseName = courseRepository.findByCourseCode(courseCode)
                .map(course -> course.getCourseName())
                .orElse("Unknown");

        // Duyệt qua các comment và chuyển thành dạng DTO kèm tên người gửi và tên khóa học
        return comments.stream().map(comment -> {
            String senderName = userRepository.findByUserCode(comment.getSendUserId())
                    .map(user -> user.getName())
                    .orElse("Unknown");

            return LessonCommentResp.builder()
                    .senderCode(comment.getSendUserId())
                    .senderName(senderName)
                    .message(comment.getMessage())
                    .commentTime(comment.getCommentTime())
                    .courseName(courseName)
                    .build();
        }).collect(Collectors.toList());
    }


    /**
     * Lấy bình luận mới nhất của từng khóa học (mỗi khóa 1 comment).
     * Có thể lọc thêm theo tên người gửi, tên khóa học hoặc ngày gửi bình luận.
     */
    @Override
    public List<LessonCommentResp> getLastCommentsEachCourse(String senderName, String courseName, String commentDate) {
        List<LessonComment> lastComments = commentRepository.findLastCommentsPerCourse();

        return lastComments.stream()
                .filter(comment -> {
                    boolean matchSender = true;
                    boolean matchCourse = true;
                    boolean matchDate = true;

                    // Kiểm tra tên người gửi có khớp không (nếu có truyền vào)
                    if (senderName != null && !senderName.isEmpty()) {
                        matchSender = userRepository.findByUserCode(comment.getSendUserId())
                                .map(user -> user.getName().toLowerCase().contains(senderName.toLowerCase()))
                                .orElse(false);
                    }

                    // Kiểm tra tên khóa học có khớp không (nếu có truyền vào)
                    if (courseName != null && !courseName.isEmpty()) {
                        matchCourse = courseRepository.findByCourseCode(comment.getCourseCode())
                                .map(course -> course.getCourseName().toLowerCase().contains(courseName.toLowerCase()))
                                .orElse(false);
                    }

                    // Kiểm tra ngày gửi bình luận có khớp không (nếu có truyền vào)
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
                            /* .lessonId(comment.getLessonId())*/
                            .senderCode(comment.getSendUserId())
                            .senderName(sender)
                            .message(comment.getMessage())
                            .commentTime(comment.getCommentTime())
                            .courseName(course)
                            .build();
                })
                .collect(Collectors.toList());
    }


    /**
     * Tạo một bình luận mới cho bài học.
     * Sau khi lưu, trả về DTO của bình luận đã lưu kèm tên người gửi và tên khóa học.
     */
    @Override
    public LessonCommentResp addComment(CreateCommentReq request) {
        LessonComment comment = LessonComment.builder()
                .courseCode(request.getCourseCode())
                .sendUserId(request.getSendUserId())
                .message(request.getMessage())
                .commentTime(LocalDateTime.now())
                .build();

        // Lưu bình luận vào cơ sở dữ liệu
        LessonComment saved = commentRepository.save(comment);

        // Lấy tên người gửi
        String senderName = userRepository.findByUserCode(saved.getSendUserId())
                .map(user -> user.getName())
                .orElse("Unknown");

        // Lấy tên khóa học
        String courseName = courseRepository.findByCourseCode(saved.getCourseCode())
                .map(course -> course.getCourseName())
                .orElse("Unknown");

        // Trả về thông tin bình luận dưới dạng DTO
        return LessonCommentResp.builder()
                .senderCode(saved.getSendUserId())
                .senderName(senderName)
                .message(saved.getMessage())
                .commentTime(saved.getCommentTime())
                .courseName(courseName)
                .build();
    }
}