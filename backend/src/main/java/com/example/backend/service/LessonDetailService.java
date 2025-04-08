package com.example.backend.service;
import com.example.backend.dto.request.LessonDetailReq;
import com.example.backend.dto.response.LessonResp;
import com.example.backend.dto.request.LessonReorderReq;

public interface LessonDetailService {
    
    LessonResp addLesson(LessonDetailReq request); //Thêm mới một bài học vào khóa học tương ứng
    LessonResp updateLesson(LessonDetailReq request); //Cập nhật thông tin của một bài học đã có
    void reorderLessons(LessonReorderReq request); //Sắp xếp lại thứ tự các bài học theo danh sách ID được gửi từ client
    void deleteLesson(Long id); //Xóa một bài học dựa vào ID
}