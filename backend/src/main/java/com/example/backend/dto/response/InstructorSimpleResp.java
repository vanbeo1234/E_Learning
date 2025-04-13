package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

/**
 * InstructorSimpleResp: Thông tin chi tiết giảng viên trong khóa học.
 */
@Getter
@Setter
public class InstructorSimpleResp {
    private String userCode;
    private String name;
    private String email;
    private String phone;
    private String dateOfBirth;
    private String roleId;
    private String statusCode;
    private Integer experience;
}
