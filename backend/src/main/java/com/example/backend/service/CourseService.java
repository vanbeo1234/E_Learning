package com.example.backend.service;

import com.example.backend.dto.response.CourseResp;

import java.util.List;

public interface CourseService {
    List<CourseResp> getAllCourses();
    CourseResp getCourseById(Long id);
    CourseResp getCourseByCode(String courseCode);
}
