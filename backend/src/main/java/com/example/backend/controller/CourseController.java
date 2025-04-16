package com.example.backend.controller;

import com.example.backend.dto.request.CourseFilterReq;
import com.example.backend.dto.request.CreateCourseReq;
import com.example.backend.dto.request.UpdateCourseReq;
import com.example.backend.dto.response.CourseResp;
import com.example.backend.dto.response.PaginationResp;
import com.example.backend.service.CourseService;
import com.example.backend.dto.response.CourseDetailResp;
import com.example.backend.dto.response.CourseFilterResp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.Map;

/**
 * Lớp điều khiển (controller) cho các yêu cầu liên quan đến khóa học.
 * Bao gồm các API để lọc, tìm kiếm, tạo mới, cập nhật và lấy thông tin chi tiết
 * khóa học.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    /**
     * Lọc danh sách khóa học theo nhiều tiêu chí, hỗ trợ phân trang.
     * 
     * Phương thức này cho phép người dùng lọc danh sách khóa học dựa trên các tiêu
     * chí như tên khóa học,
     * tên giảng viên, trạng thái, và người tạo. Đồng thời, phương thức cũng hỗ trợ
     * phân trang kết quả.
     * 
     * @param courseName     tên khóa học (tùy chọn)
     * @param instructorName tên giảng viên (tùy chọn)
     * @param statusCode     mã trạng thái (tùy chọn)
     * @param createdBy      người tạo (tùy chọn)
     * @param pageNumber     trang hiện tại (mặc định là 0)
     * @param pageSize       kích thước trang (mặc định là 5)
     * @return ResponseEntity chứa danh sách khóa học phù hợp kèm thông tin phân
     *         trang
     */
    @GetMapping
    public ResponseEntity<?> filterCourses(
            @RequestParam(required = false) String courseName,
            @RequestParam(required = false) String instructorName,
            @RequestParam(required = false) String statusCode,
            @RequestParam(required = false) String createdBy,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "5") int pageSize) {
        try {
            CourseFilterReq req = new CourseFilterReq();
            req.setCourseName(courseName);
            req.setInstructorName(instructorName);
            req.setStatusCode(statusCode);
            req.setCreatedBy(createdBy);
            req.setPageNumber(pageNumber);
            req.setPageSize(pageSize);

            Page<CourseResp> pageResult = courseService.filterCourses(req);

            CourseFilterResp resp = new CourseFilterResp();
            resp.setErrorStatus(901);
            resp.setMessage("Lấy danh sách khóa học thành công");
            resp.setData(pageResult.getContent());

            PaginationResp pagination = new PaginationResp();
            pagination.setCurrentPage(pageResult.getNumber() + 1);
            pagination.setTotalPages(pageResult.getTotalPages());
            pagination.setTotalItems(pageResult.getTotalElements());
            resp.setPagination(pagination);

            return ResponseEntity.ok().body(Map.of("body", resp));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("body",
                    Map.of("errorStatus", 902, "message", "Dữ liệu đầu vào không hợp lệ hoặc không tồn tại")));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("body", Map.of("errorStatus", 903, "message", "Lỗi hệ thống, vui lòng thử lại sau")));
        }
    }

    /**
     * API hiển thị chi tiết khoá học theo ID.
     * 
     * Phương thức này trả về thông tin chi tiết về một khóa học cụ thể dựa trên ID
     * khóa học.
     * 
     * @param courseId ID của khóa học cần lấy thông tin
     * @return ResponseEntity chứa thông tin chi tiết khóa học
     */
    @GetMapping("/detail")
    public ResponseEntity<?> getCourseDetail(@RequestParam Long courseId) {
        try {
            CourseDetailResp resp = courseService.getCourseDetail(courseId);

            Map<String, Object> body = Map.of(
                    "errorStatus", 901,
                    "message", "Lấy thông tin khóa học thành công",
                    "data", resp);

            return ResponseEntity.ok(Map.of("body", body));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("body", Map.of(
                            "errorStatus", 902,
                            "message", "Dữ liệu đầu vào không hợp lệ hoặc không tồn tại")));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("body", Map.of(
                            "errorStatus", 903,
                            "message", "Lỗi hệ thống, vui lòng thử lại sau")));
        }
    }

    /**
     * Tạo mới một khóa học.
     * 
     * Phương thức này cho phép người dùng tạo mới một khóa học với các thông tin
     * như tên khóa học,
     * mô tả, giảng viên, và các thông tin liên quan khác.
     * 
     * @param req Thông tin khóa học cần tạo
     * @return ResponseEntity chứa thông tin khóa học đã tạo
     */
    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody CreateCourseReq req) {
        try {
            CourseResp resp = courseService.createCourse(req);

            Map<String, Object> body = Map.of(
                    "errorStatus", 901,
                    "message", "Thêm khóa học thành công",
                    "data", resp);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("body", body));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("body", Map.of(
                            "errorStatus", 902,
                            "message", "Dữ liệu đầu vào không hợp lệ")));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("body", Map.of(
                            "errorStatus", 903,
                            "message", "Lỗi hệ thống, vui lòng thử lại sau")));
        }
    }

    /**
     * API cập nhật thông tin khóa học.
     * 
     * Phương thức này cho phép chỉnh sửa thông tin của một khóa học đã tồn tại, bao
     * gồm tên, mô tả,
     * mục tiêu, ảnh bìa, ngày bắt đầu/kết thúc, số lượng bài giảng, trạng thái và
     * danh sách bài học.
     * 
     * @param req đối tượng {@link UpdateCourseReq} chứa dữ liệu cần cập nhật
     * @return ResponseEntity chứa thông tin phản hồi về kết quả cập nhật
     */
    @PutMapping
    public ResponseEntity<?> updateCourse(@RequestBody UpdateCourseReq req) {
        try {
            CourseDetailResp resp = courseService.updateCourse(req);
            return ResponseEntity.ok(Map.of(
                    "body", Map.of("errorStatus", 901, "message", "Chỉnh sửa khóa học thành công", "data", resp)));
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Map.of(
                    "body", Map.of("errorStatus", 902, "message", e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "body", Map.of("errorStatus", 903, "message", "Lỗi hệ thống, vui lòng thử lại sau")));
        }
    }

}
