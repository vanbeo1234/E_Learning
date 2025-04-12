package com.example.backend.controller;

import com.example.backend.dto.response.UserResp;
import com.example.backend.dto.request.UserReq;
import com.example.backend.dto.request.UserInfoUpdateReq;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import com.example.backend.model.User;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:30011")
@RestController
@RequestMapping("/v1/api/users")
public class UserController {
    private final UserService userService;

    /**
     * Constructor cho UserController.
     *
     * @param userService Service xử lý nghiệp vụ người dùng
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * API Lấy danh sách người dùng với phân trang.
     *
     * @param page Số trang cần lấy.
     * @param size Số lượng người dùng mỗi trang.
     * @return Danh sách người dùng phân trang.
     */
    @GetMapping
    public Page<UserResp> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userService.getAllUsers(pageable);
    }

    /**
     * API Tìm kiếm người dùng theo các tiêu chí.
     *
     * @param name        Tên người dùng cần tìm kiếm.
     * @param dateOfBirth Ngày sinh của người dùng.
     * @param roleId      Vai trò người dùng.
     * @param statusCode  Trạng thái của người dùng.
     * @param page        Số trang cần lấy.
     * @param size        Số lượng người dùng mỗi trang.
     * @return Kết quả tìm kiếm người dùng, phân trang.
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) LocalDateTime dateOfBirth,
            @RequestParam(defaultValue = "0") Integer roleId,
            @RequestParam(required = false) String statusCode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<UserResp> resultPage = userService.searchUsers(name, dateOfBirth, roleId, statusCode, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("errorStatus", 900);
        response.put("message", "Lấy danh sách người dùng thành công");
        response.put("data", resultPage.getContent());
        response.put("pagination", Map.of(
                "currentPage", resultPage.getNumber(),
                "totalPages", resultPage.getTotalPages(),
                "totalItems", resultPage.getTotalElements()));

        return ResponseEntity.ok(response);
    }

    /**
     * API Cập nhật thông tin người dùng theo mã người dùng.
     *
     * @param request Đối tượng yêu cầu cập nhật thông tin người dùng.
     * @return Kết quả cập nhật người dùng.
     */
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody UserReq request) {
        try {

            Optional<User> optionalUser = userService.findByUserCode(request.getUserCode());
            User user = optionalUser.orElseThrow(() -> new IllegalArgumentException("User not found"));

            UserInfoUpdateReq updateReq = new UserInfoUpdateReq();
            updateReq.setPhone(request.getPhone());
            updateReq.setAddress(request.getAddress());
            updateReq.setStatusCode(request.getStatusCode());
            updateReq.setExperience(request.getExperience());
            updateReq.setCertification(request.getCertification());

            userService.updateUserInfo(request.getUserCode(), updateReq);

            Map<String, Object> response = new HashMap<>();
            response.put("errorStatus", 900);
            response.put("message", "Cập nhật thông tin thành công");
            response.put("data", UserResp.fromUser(user));

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorStatus", 901);
            errorResponse.put("message", "Dữ liệu không hợp lệ: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorStatus", 902);
            errorResponse.put("message", "Lỗi hệ thống, vui lòng thử lại sau");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

}
