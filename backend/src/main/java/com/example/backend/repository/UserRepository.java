package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Tìm người dùng dựa theo mã định danh người dùng (userCode).
     *
     * @param userCode mã định danh duy nhất của người dùng (VD: "SV001").
     * @return Optional chứa thông tin người dùng nếu tìm thấy, hoặc rỗng nếu không tồn tại.
     */
    Optional<User> findByUserCode(String userCode);
}
