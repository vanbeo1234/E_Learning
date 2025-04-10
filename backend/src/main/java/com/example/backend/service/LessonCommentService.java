package com.example.backend.service;

import com.example.backend.dto.request.CreateCommentReq;
import com.example.backend.dto.response.LessonCommentResp;

import java.util.List;

public interface LessonCommentService {
     /**
     * Lấy danh sách tất cả bình luận thuộc một khóa học theo mã khóa học.
     *
     * @param courseCode mã khóa học (VD: "C001").
     * @return danh sách bình luận dưới dạng DTO (LessonCommentResp).
     */
    List<LessonCommentResp> getCommentsByCourseId(String courseCode);

    /**
     * Lấy bình luận mới nhất của mỗi khóa học.
     * Có thể lọc thêm theo tên người gửi, tên khóa học hoặc ngày bình luận nếu có.
     *
     * @param senderName   tên người gửi bình luận (có thể null).
     * @param courseName   tên khóa học (có thể null).
     * @param commentDate  ngày gửi bình luận (có thể null).
     * @return danh sách các bình luận mới nhất của mỗi khóa học.
     */
    List<LessonCommentResp> getLastCommentsEachCourse(String senderName, String courseName, String commentDate);

    /**
     * Tạo mới một bình luận và lưu vào hệ thống.
     *
     * @param request thông tin yêu cầu tạo bình luận (CreateCommentReq).
     * @return thông tin bình luận sau khi tạo (LessonCommentResp).
     */
    LessonCommentResp addComment(CreateCommentReq request);
}
