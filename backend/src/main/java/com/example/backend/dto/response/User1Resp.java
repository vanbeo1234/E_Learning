package com.example.backend.dto.response;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.*;
import lombok.Builder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User1Resp {
    private long id;
    private String userCode;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDateTime dateOfBirth;
    private Integer roleId;
    private String statusCode;
    private Integer experience;
    private String certification;
}