package com.example.backend.controller;

import com.example.backend.dto.request.CourseSearchReq;
import com.example.backend.dto.response.CourseResp;
import com.example.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Endpoint để lấy tất cả khóa học
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

}
