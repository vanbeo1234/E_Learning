package com.example.backend.controller;

import com.example.backend.dto.request.CourseSearchReq;
import com.example.backend.dto.response.CourseResp;
import com.example.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.response.CourseDetailResp;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Endpoint để lấy tất cả khóa học (không phân trang)
    @GetMapping
    public List<CourseResp> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Endpoint để lấy khóa học theo ID
    @GetMapping("/{id}")
    public CourseResp getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    // Endpoint để lấy khóa học theo mã khóa học (courseCode)
    @GetMapping("/code/{courseCode}")
    public CourseResp getCourseByCode(@PathVariable String courseCode) {
        return courseService.getCourseByCode(courseCode);
    }

    // Endpoint để tìm kiếm khóa học Đức thêm
    @PostMapping("/search")
    public ResponseEntity<List<CourseResp>> searchCourses(@RequestBody CourseSearchReq request) {
        List<CourseResp> courses = courseService.searchCourses(request);
        return ResponseEntity.ok(courses);
    }

    // Endpoint để phân trang danh sách khóa học Đức thêm
    @GetMapping("/paging")
    public ResponseEntity<Page<CourseResp>> getCoursesPaging(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(courseService.getCoursesPaging(pageable));
    }

    /**
     * Đức thêm
     * API xem chi tiết khóa học theo courseId
     * 
     * @param courseId ID của khóa học
     * @return ResponseEntity<CourseDetailResp>
     */
    @GetMapping("/detail")
    public ResponseEntity<?> getCourseDetail(@RequestParam Long courseId) {
        try {
            CourseDetailResp resp = courseService.getCourseDetail(courseId);
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Không tìm thấy khóa học hoặc ID không hợp lệ");
        }
    }

    /**
     * Đức thêm
     * API thêm mới khóa học (có chọn giảng viên)
     * 
     * @param req thông tin khóa học cần tạo
     * @return ResponseEntity<CourseResp>
     */
    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody CreateCourseReq req) {
        try {
            CourseResp resp = courseService.createCourse(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi khi tạo khóa học");
        }
    }

}
