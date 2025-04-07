package com.example.backend.service.implement;

import com.example.backend.dto.request.UserRegisterReq;
import com.example.backend.dto.request.User1Req;
import com.example.backend.dto.response.AuthResp;
import com.example.backend.model.User1;
import com.example.backend.service.AuthService;
import com.example.backend.service.User1Service;
import com.example.backend.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.common.Constant;;

/**
 * Triển khai logic xác thực: Đăng ký, Đăng nhập người dùng.
 */
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private User1Service userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    /**
     * Xử lý đăng ký tài khoản mới.
     * Trả về token cho cả user tự đăng ký lẫn được admin tạo.
     */
    @Override
    public AuthResp registerUser(UserRegisterReq req) {
        AuthResp resp = new AuthResp();

        // Admin không thể tự đăng ký tài khoản
        if (req.getRoleId() == Constant.Role.ADMIN.getValue() && req.getCreatedBy() == null) {
            throw new IllegalArgumentException("Admin không thể tự đăng ký tài khoản.");
        }

        // 1. Kiểm tra xác nhận mật khẩu
        if (!req.getPassword().equals(req.getConfirmPassword())) {
            System.out.println("Mật khẩu xác nhận không khớp.");
            return resp;
        }

        // 2. Kiểm tra trùng email
        if (userService.existsByEmail(req.getEmail())) {
            System.out.println("Email đã tồn tại: " + req.getEmail());
            return resp;
        }

        // 3. Kiểm tra trùng userCode
        if (userService.existsByUserCode(req.getUserCode())) {
            System.out.println("UserCode đã tồn tại: " + req.getUserCode());
            return resp;
        }
        // Ngăn Admin tự đăng ký (roleId = 1) khi không có createdBy
        if (req.getRoleId() == Constant.Role.ADMIN.getValue() && req.getCreatedBy() == null) {
            throw new IllegalArgumentException("Admin không thể tự đăng ký tài khoản.");
        }

        try {
            // 4. Tạo mới user
            User1 user = new User1();
            user.setUserCode(req.getUserCode());
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            user.setName(req.getName());
            user.setEmail(req.getEmail());
            user.setPhone(req.getPhone());
            user.setAddress(req.getAddress());
            user.setGender(req.getGender());
            user.setDateOfBirth(req.getDateOfBirth().atStartOfDay());
            user.setRoleId(req.getRoleId());
            user.setStatusCode(req.getStatusCode());
            user.setExperience(req.getExperience());
            user.setCertification(req.getCertification());
            user.setCreatedBy(req.getCreatedBy() != null ? req.getCreatedBy() : "SYSTEM");

            // 5. Lưu DB
            userService.save(user);

            // 6. Trả về token cho cả user tự đăng ký lẫn admin tạo
            String token = jwtTokenProvider.generateToken(user.getUserCode(), user.getRoleId());
            return new AuthResp(token, user.getUserCode());

        } catch (Exception e) {
            System.out.println("Lỗi khi tạo tài khoản: " + e.getMessage());
            return resp;
        }
    }

    /**
     * Xử lý đăng nhập người dùng bằng userCode và password.
     */
    @Override
    public AuthResp loginUser(User1Req req) {
        return userService.findByUserCode(req.getUserCode())
                .filter(user -> passwordEncoder.matches(req.getPassword(), user.getPassword()))
                .map(user -> new AuthResp(
                        jwtTokenProvider.generateToken(user.getUserCode(), user.getRoleId()),
                        user.getUserCode()))
                .orElse(new AuthResp()); // Nếu đăng nhập thất bại
    }
}
