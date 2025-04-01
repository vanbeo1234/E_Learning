package com.example.e_learning_login2.service;

import com.example.e_learning_login2.model.User;

import java.util.List;

public interface UserService {
    List<User> getUsersByNameAndEmail(String name, String email);

    List<User> getUsersByStatus(String status);

    User getUserById(Long id);

    void updateUser(User user);
}
