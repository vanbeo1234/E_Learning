package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

// Dùng cho yêu cầu đăng nhập,cập nhật người dùng.
@Getter
@Setter
public class User1Req {

    // Mã người dùng (dùng cho đăng nhập và cập nhật)
    private String userCode;

    // Mật khẩu (dùng cho đăng nhập)
    private String password;

    // Dùng cho cập nhật
    private String phone;
    private String address;
    private String statusCode;
    private Integer experience;
    private String certification;
}
