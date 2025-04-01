package com.example.e_learning_login2.repository;

import com.example.e_learning_login2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   // Tìm user theo USER_CODE
   Optional<User> findByUserCode(String userCode);

   // Kiểm tra USER_CODE đã tồn tại chưa
   boolean existsByUserCode(String userCode);

   // Kiểm tra EMAIL đã tồn tại chưa
   boolean existsByEmail(String email);

   // Tìm user theo name và email
   List<User> findByNameContainingAndEmail(String name, String email);

   // Tìm user theo statusCode
   List<User> findByStatusCode(String statusCode);
}