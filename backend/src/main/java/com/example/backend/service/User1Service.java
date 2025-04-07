package com.example.backend.service;

import com.example.backend.dto.response.User1Resp;
import com.example.backend.model.User1;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Optional;

public interface User1Service {

    // Lấy toàn bộ danh sách người dùng với phân trang.
    Page<User1Resp> getAllUsers(Pageable pageable);

    // Tìm kiếm người dùng theo nhiều tiêu chí.
    Page<User1Resp> searchUsers(String name, LocalDateTime dateOfBirth, Integer roleId, String statusCode,
            Pageable pageable);

    // Cập nhật thông tin người dùng dựa trên userCode.
    void updateUserInfo(String userCode, String phone, String address, String statusCode, Integer experience,
            String certification);

    // Kiểm tra sự tồn tại của email trong hệ thống (Phục vụ đăng nhập, đăng ký)
    boolean existsByEmail(String email);

    // Kiểm tra sự tồn tại của mã người dùng (Phục vụ đăng nhập, đăng ký)
    boolean existsByUserCode(String userCode);

    // Tìm đối tượng User trong cơ sở dữ liệu (Phục vụ đăng nhập, đăng ký)
    Optional<User1> findByUserCode(String userCode);

    void save(User1 user);
}
