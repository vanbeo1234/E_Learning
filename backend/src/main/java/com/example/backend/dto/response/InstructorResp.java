package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstructorResp {
    private Long id;
    private String name;
    private String userCode;

    // Constructor nhận các tham số
    public InstructorResp(Long id, String name, String userCode) {
        this.id = id;
        this.name = name;
        this.userCode = userCode;
    }
}
