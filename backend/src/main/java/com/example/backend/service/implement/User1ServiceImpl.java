package com.example.backend.service.implement;

import com.example.backend.dto.response.User1Resp;
import com.example.backend.model.User1;
import com.example.backend.repository.User1Repository;
import com.example.backend.service.User1Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

// Triển khai các chức năng quản lý người dùng.
@Service
public class User1ServiceImpl implements User1Service {

    private final User1Repository userRepository;

    public User1ServiceImpl(User1Repository userRepository) {
        this.userRepository = userRepository;
    }

    // Lấy toàn bộ danh sách người dùng với phân trang.
    @Override
    public Page<User1Resp> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(user -> User1Resp.builder()
                        .id(user.getId())
                        .userCode(user.getUserCode())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .dateOfBirth(user.getDateOfBirth())
                        .roleId(user.getRoleId())
                        .statusCode(user.getStatusCode())
                        .experience(user.getExperience())
                        .certification(user.getCertification())
                        .build());
    }

    // Tìm kiếm người dùng theo các tiêu chí như tên, ngày sinh, vai trò và trạng
    // thái.
    @Override
    public Page<User1Resp> searchUsers(String name, LocalDateTime dateOfBirth, Integer roleId, String statusCode,
            Pageable pageable) {
        return userRepository.findByCriteria(name, dateOfBirth, roleId, statusCode, pageable)
                .map(user -> User1Resp.builder()
                        .id(user.getId())
                        .userCode(user.getUserCode())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .dateOfBirth(user.getDateOfBirth())
                        .roleId(user.getRoleId())
                        .statusCode(user.getStatusCode())
                        .experience(user.getExperience())
                        .certification(user.getCertification())
                        .build());
    }

    // Cập nhật thông tin người dùng dựa trên userCode.
    @Override
    public void updateUserInfo(String userCode, String phone, String address, String statusCode, Integer experience,
            String certification) {
        // Tìm người dùng theo mã người dùng (userCode).
        User1 user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("User not found with code: " + userCode));

        // Cập nhật thông tin người dùng.
        user.setPhone(phone);
        user.setAddress(address);
        user.setStatusCode(statusCode);
        user.setExperience(experience);
        user.setCertification(certification);
        user.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));

        // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu.
        userRepository.save(user);
    }

    // Kiểm tra sự tồn tại của email trong hệ thống (Phục vụ đăng nhập, đăng ký)
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Kiểm tra sự tồn tại của mã người dùng (Phục vụ đăng nhập, đăng ký)
    @Override
    public boolean existsByUserCode(String userCode) {
        return userRepository.existsByUserCode(userCode);
    }

    // Tìm người dùng theo mã người dùng (Phục vụ đăng nhập, đăng ký)
    @Override
    public Optional<User1> findByUserCode(String userCode) {
        return userRepository.findByUserCode(userCode);
    }

    // Lưu người dùng vào cơ sở dữ liệu (Phục vụ đăng ký)
    @Override
    public void save(User1 user) {
        userRepository.save(user);
    }
}
