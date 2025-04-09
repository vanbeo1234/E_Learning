package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository thao tác với bảng USER
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Tìm theo userCode (để hỗ trợ kiểm tra tài khoản, login, v.v.)
    User findByUserCode(String userCode);

    // Kiểm tra email có tồn tại
    boolean existsByEmail(String email);
}
