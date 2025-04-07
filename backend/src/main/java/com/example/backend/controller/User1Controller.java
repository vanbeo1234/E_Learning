package com.example.backend.controller;

import com.example.backend.dto.response.User1Resp;
import com.example.backend.dto.request.User1Req;
import com.example.backend.service.User1Service;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@CrossOrigin(origins = "http://126.0.0.1:5500")
@RestController
@RequestMapping("/v1/api/users")
public class User1Controller {
    private final User1Service userService;

    public User1Controller(User1Service userService) {
        this.userService = userService;
    }

    // Lấy danh sách người dùng với phân trang
    @GetMapping
    public Page<User1Resp> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userService.getAllUsers(pageable);
    }

    // API TÌM KIẾM NGƯỜI DÙNG
    @GetMapping("/search")
    public Page<User1Resp> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) LocalDateTime dateOfBirth,
            @RequestParam(defaultValue = "0") Integer roleId,
            @RequestParam(required = false) String statusCode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return userService.searchUsers(name, dateOfBirth, roleId, statusCode, pageable);
    }

    // API CẬP NHẬT NGƯỜI DÙNG: Cập nhật thông tin người dùng theo mã người dùng
    @PutMapping("/update/{userCode}")
    public void updateUser(@PathVariable String userCode, @RequestBody User1Req request) {
        userService.updateUserInfo(
                userCode,
                request.getPhone(),
                request.getAddress(),
                request.getStatusCode(),
                request.getExperience(),
                request.getCertification());
    }

}