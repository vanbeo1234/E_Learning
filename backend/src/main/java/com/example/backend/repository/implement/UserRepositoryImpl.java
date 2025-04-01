package com.example.e_learning_login2.repository.impl;

import com.example.e_learning_login2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

@Repository
public class UserRepositoryImpl {

    @Autowired
    private EntityManager entityManager; // Sử dụng EntityManager để thực hiện truy vấn tùy chỉnh

    // Phương thức tìm kiếm người dùng theo tên, email, vai trò, trạng thái và ngày
    // sinh
    public List<User> findUsersByCriteria(String name, String email, Integer roleId, String statusCode,
            LocalDate dateOfBirth) {
        String query = "SELECT u FROM User u WHERE u.name LIKE :name AND u.email = :email " +
                "AND u.roleId = :roleId AND u.statusCode = :statusCode AND u.dateOfBirth = :dateOfBirth";
        TypedQuery<User> typedQuery = entityManager.createQuery(query, User.class);
        typedQuery.setParameter("name", "%" + name + "%");
        typedQuery.setParameter("email", email);
        typedQuery.setParameter("roleId", roleId);
        typedQuery.setParameter("statusCode", statusCode);
        typedQuery.setParameter("dateOfBirth", dateOfBirth);
        return typedQuery.getResultList();
    }
}
