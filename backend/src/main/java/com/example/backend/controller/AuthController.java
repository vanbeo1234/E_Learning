package com.example.e_learning_login2.controller;

import com.example.e_learning_login2.dto.request.UserLoginReq;
import com.example.e_learning_login2.dto.request.UserRegisterReq;
import com.example.e_learning_login2.dto.response.AuthResponseResp;
import com.example.e_learning_login2.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseResp> registerUser(@RequestBody UserRegisterReq userRegisterReq) {
        AuthResponseResp response = authService.registerUser(userRegisterReq);
        if (response.getToken() != null) {
            return ResponseEntity.status(201).body(response);
        }
        return ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseResp> loginUser(@RequestBody UserLoginReq userLoginReq) {
        AuthResponseResp response = authService.loginUser(userLoginReq);
        if (response.getToken() != null) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(response);
    }
}