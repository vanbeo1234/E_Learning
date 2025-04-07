package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class UserRegisterReq { // DTO dùng để đăng ký tài khoản người dùng
    @NotEmpty(message = "User code is required")
    private String userCode;

    @NotEmpty(message = "Password is required")
    private String password;

    @NotEmpty(message = "Confirm password is required")
    private String confirmPassword;

    @NotEmpty(message = "Name is required")
    private String name;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Phone is required")
    private String phone;

    @NotEmpty(message = "Address is required")
    private String address;

    @NotEmpty(message = "Status is required")
    private String statusCode;

    private LocalDate dateOfBirth;
    private Integer gender;
    private Integer roleId;
    private Integer experience;
    private String certification;

    // Trường này giúp phân biệt ai tạo -> nếu có thì là Admin đang tạo
    private String createdBy;

    public void setDateOfBirth(String dateStr) {
        this.dateOfBirth = LocalDateTime.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"))
                .toLocalDate();
    }

}