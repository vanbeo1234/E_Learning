package com.example.backend.repository;

import com.example.backend.model.User1;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface User1Repository extends JpaRepository<User1, Integer> {

    // Lấy tất cả người dùng với phân trang
    @Override
    @NonNull
    Page<User1> findAll(@NonNull Pageable pageable);

    // Tìm kiếm người dùng theo các tiêu chí như tên, ngày sinh, vai trò và trạng
    // thái
    @Query("SELECT u FROM User1 u WHERE " +
            "(:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:dateOfBirth IS NULL OR u.dateOfBirth = :dateOfBirth) AND " +
            "(:roleId IS NULL OR :roleId = 0 OR u.roleId = :roleId) AND " +
            "(:statusCode IS NULL OR u.statusCode = :statusCode)")
    @NonNull
    Page<User1> findByCriteria(
            @Param("name") String name,
            @Param("dateOfBirth") LocalDateTime dateOfBirth,
            @Param("roleId") Integer roleId,
            @Param("statusCode") String statusCode,
            @NonNull Pageable pageable);

    // Tìm kiếm người dùng theo mã người dùng (userCode), hỗ trợ cập nhật
    Optional<User1> findByUserCode(String userCode);

    // Kiểm tra sự tồn tại của email, hỗ trợ đăng ký người dùng
    boolean existsByEmail(String email);

    // Kiểm tra sự tồn tại của userCode, hỗ trợ đăng ký người dùng
    boolean existsByUserCode(String userCode);
}
