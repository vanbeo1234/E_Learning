package com.example.backend.controller;

import com.example.backend.dto.request.UserRegisterReq;
import com.example.backend.dto.request.User1Req;
import com.example.backend.dto.response.AuthResp;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//API đăng ký và đăng nhập tài khoản người dùng
@CrossOrigin(origins = " ")
@RestController
@RequestMapping("/v1/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // đăng ký tài khoản người dùng

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterReq req) {
        try {
            AuthResp resp = authService.registerUser(req);
            if (resp.getUserCode() != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(resp);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Đăng ký thất bại: kiểm tra email, userCode hoặc mật khẩu xác nhận.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống khi đăng ký: " + e.getMessage());
        }
    }

    // Đăng nhập tài khoản

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody User1Req req) {
        AuthResp resp = authService.loginUser(req);
        if (resp.getToken() != null) {
            return ResponseEntity.ok(resp);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Sai tài khoản hoặc mật khẩu.");
        }
    }

}
