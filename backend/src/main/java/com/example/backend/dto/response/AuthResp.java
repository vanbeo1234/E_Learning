package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO phản hồi khi đăng nhập / đăng ký.
 */
@Getter
@Setter
public class AuthResp {
    private String token;
    private String userCode;

    public AuthResp() {
    }

    public AuthResp(String token, String userCode) {
        this.token = token;
        this.userCode = userCode;
    }
}