package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstructorResp {
    private Long id;
    private String name;
    private String userCode; // Thêm thuộc tính userCode
    private String email;
    private String phone;
    private String dateOfBirth;
    private String statusCode;
    private int experience;
}
