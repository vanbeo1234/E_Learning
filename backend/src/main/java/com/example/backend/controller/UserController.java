package com.example.e_learning_login2.controller;

import com.example.e_learning_login2.dto.response.UserDetailResp;
import com.example.e_learning_login2.model.User;
import com.example.e_learning_login2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailResp> getUserDetail(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        UserDetailResp resp = mapToUserDetailResp(user);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDetailResp>> getUsersByNameAndEmail(@RequestParam String name,
            @RequestParam String email) {
        List<User> users = userService.getUsersByNameAndEmail(name, email);
        List<UserDetailResp> resp = users.stream().map(this::mapToUserDetailResp).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        userService.updateUser(user);
        return ResponseEntity.ok("User updated successfully");
    }

    private UserDetailResp mapToUserDetailResp(User user) {
        UserDetailResp resp = new UserDetailResp();
        resp.setUserCode(user.getUserCode());
        resp.setName(user.getName());
        resp.setEmail(user.getEmail());
        resp.setPhone(user.getPhone());
        resp.setAddress(user.getAddress());
        // Chuyển roleId thành tên role
        resp.setRole(convertRoleIdToName(user.getRoleId()));
        return resp;
    }

    // Phương thức chuyển roleId thành tên role
    private String convertRoleIdToName(Integer roleId) {
        if (roleId == null) {
            return "Unknown";
        }
        switch (roleId) {
            case 1:
                return "Admin";
            case 2:
                return "Instructor";
            case 3:
                return "Student";
            default:
                return "Unknown";
        }
    }
}