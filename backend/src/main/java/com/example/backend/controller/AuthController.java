package com.example.backend.controller;

import com.example.backend.dto.request.UserRegisterReq;
import com.example.backend.dto.request.UserReq;
import com.example.backend.dto.response.AuthResp;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/api/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * Constructor của AuthController.
     * 
     * @param authService Service xử lý nghiệp vụ đăng ký và đăng nhập
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * API đăng ký tài khoản người dùng.
     * 
     * @param req        Đối tượng yêu cầu đăng ký người dùng.
     * @param authHeader Token JWT của người gọi API (nếu có)
     * @return ResponseEntity chứa phản hồi về kết quả đăng ký
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterReq req,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            AuthResp resp = authService.registerUser(req, authHeader);

            if (resp.getErrorStatus() == 900) {
                return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                        "errorStatus", 900,
                        "message", "Đăng ký thành công",
                        "data", resp.getData()));
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "errorStatus", resp.getErrorStatus(),
                    "message", resp.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "errorStatus", 902,
                    "message", "Lỗi hệ thống, vui lòng thử lại sau"));
        }
    }

    /**
     * API đăng nhập tài khoản.
     * 
     * @param req Đối tượng yêu cầu đăng nhập của người dùng.
     * @return ResponseEntity chứa token JWT nếu đăng nhập thành công
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserReq req) {
        try {
            AuthResp resp = authService.loginUser(req);

            if (resp.getToken() != null) {
                Map<String, Object> successResp = new LinkedHashMap<>();
                successResp.put("token", resp.getToken());
                successResp.put("errorStatus", 900);
                successResp.put("message", "Đăng nhập thành công");
                return ResponseEntity.ok(successResp);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "errorStatus", 901,
                        "message", "Dữ liệu đầu vào không hợp lệ hoặc tài khoản không tồn tại"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "errorStatus", 902,
                    "message", "Lỗi hệ thống, vui lòng thử lại sau"));
        }
    }
}
