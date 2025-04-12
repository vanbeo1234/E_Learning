package com.example.backend.service.implement;

import com.example.backend.dto.request.UserRegisterReq;
import com.example.backend.dto.request.UserReq;
import com.example.backend.dto.response.AuthResp;
import com.example.backend.dto.response.UserResp;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import com.example.backend.config.JwtTokenProvider;
import com.example.backend.config.RsaKeyConfig;
import com.example.backend.common.Enum.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.KeyPair;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RsaKeyConfig rsaKeyConfig;

    /**
     * Đăng ký tài khoản người dùng mới.
     * 
     * Kiểm tra các điều kiện như:
     * - Mật khẩu xác nhận không khớp
     * - Email và UserCode có trùng không
     * - Token phải hợp lệ nếu tạo tài khoản Admin
     * 
     * @param req        Thông tin đăng ký người dùng.
     * @param authHeader Token xác thực từ Header (nếu có)
     * @return {@link AuthResp} phản hồi kết quả đăng ký
     */
    @Override
    public AuthResp registerUser(UserRegisterReq req, String authHeader) {
        boolean isAdminRegistering = req.getRoleId() == Role.ADMIN.getValue();

        if (isAdminRegistering) {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return AuthResp.builder()
                        .errorStatus(906)
                        .message("Admin không thể tự đăng ký tài khoản.")
                        .build();
            }

            String token = authHeader.substring(7);
            if (!jwtTokenProvider.validateToken(token)) {
                return AuthResp.builder()
                        .errorStatus(902)
                        .message("Token không hợp lệ.")
                        .build();
            }

            int creatorRole = jwtTokenProvider.getRoleIdFromToken(token);
            if (creatorRole != Role.ADMIN.getValue()) {
                return AuthResp.builder()
                        .errorStatus(903)
                        .message("Chỉ Admin mới có quyền tạo tài khoản Admin.")
                        .build();
            }

            if (req.getCreatedBy() == null || req.getCreatedBy().trim().isEmpty()) {
                req.setCreatedBy(jwtTokenProvider.getUserCodeFromToken(token));
            }
        } else {
            if (req.getCreatedBy() == null || req.getCreatedBy().trim().isEmpty()) {
                req.setCreatedBy("self-register");
            }
        }

        if (!req.getPassword().equals(req.getConfirmPassword())) {
            return AuthResp.builder()
                    .errorStatus(905)
                    .message("Mật khẩu xác nhận không khớp.")
                    .build();
        }

        if (userService.existsByEmail(req.getEmail())) {
            return AuthResp.builder()
                    .errorStatus(906)
                    .message("Email đã tồn tại: " + req.getEmail())
                    .build();
        }

        if (userService.existsByUserCode(req.getUserCode())) {
            return AuthResp.builder()
                    .errorStatus(907)
                    .message("UserCode đã tồn tại: " + req.getUserCode())
                    .build();
        }

        try {
            KeyPair keyPair = rsaKeyConfig.rsaKeyPair();
            String publicKeyString = jwtTokenProvider.getPublicKeyAsString(keyPair.getPublic());

            String encryptedPassword = passwordEncoder.encode(req.getPassword());

            User user = new User();
            user.setUserCode(req.getUserCode());
            user.setPassword(encryptedPassword);
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
            user.setCreatedBy(req.getCreatedBy());
            user.setEncryptionKey(publicKeyString);

            userRepository.save(user);

            String token = jwtTokenProvider.generateToken(user.getUserCode(), user.getRoleId());

            return AuthResp.builder()
                    .token(token)
                    .userCode(user.getUserCode())
                    .errorStatus(900)
                    .message("Đăng ký thành công")
                    .data(UserResp.fromUser(user))
                    .build();

        } catch (Exception e) {
            return AuthResp.builder()
                    .errorStatus(908)
                    .message("Lỗi hệ thống, vui lòng thử lại sau")
                    .build();
        }
    }

    /**
     * Đăng nhập người dùng và trả về token nếu thành công.
     * 
     * Kiểm tra tính hợp lệ của userCode và mật khẩu.
     * 
     * @param req Thông tin đăng nhập người dùng
     * @return {@link AuthResp} phản hồi kết quả đăng nhập
     */
    @Override
    public AuthResp loginUser(UserReq req) {
        try {
            return userService.findByUserCode(req.getUserCode())
                    .filter(user -> passwordEncoder.matches(req.getPassword(), user.getPassword()))
                    .map(user -> {
                        String token = jwtTokenProvider.generateToken(user.getUserCode(), user.getRoleId());
                        return AuthResp.builder()
                                .token(token)
                                .userCode(user.getUserCode())
                                .message("Đăng nhập thành công")
                                .errorStatus(900)
                                .data(UserResp.fromUser(user))
                                .build();
                    })
                    .orElseGet(() -> AuthResp.builder()
                            .message("Dữ liệu đầu vào không hợp lệ hoặc tài khoản không tồn tại")
                            .errorStatus(909)
                            .build());
        } catch (Exception e) {
            return AuthResp.builder()
                    .message("Lỗi hệ thống, vui lòng thử lại sau")
                    .errorStatus(910)
                    .build();
        }
    }
}
