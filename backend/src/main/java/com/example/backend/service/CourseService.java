package com.example.backend.service;

import com.example.backend.dto.request.CourseSearchReq;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.response.CourseDetailResp;
import com.example.backend.dto.response.CourseResp;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {
    List<CourseResp> getAllCourses();

    CourseResp getCourseById(Long id);

    CourseResp getCourseByCode(String courseCode);

    // Đức thêm
    List<CourseResp> searchCourses(CourseSearchReq request);// Tìm kiếm khóa học

    CourseResp createCourse(CreateCourseReq req); // Tạo khóa học mới

    CourseDetailResp getCourseDetail(Long courseId); // Lấy thông tin chi tiết khóa học theo ID

    Page<CourseResp> getCoursesPaging(Pageable pageable); // Phân trang danh sách khóa học Đức thêm

}
