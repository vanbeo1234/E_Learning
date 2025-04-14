package com.example.backend.model;

import com.example.backend.common.Enum.Role; // Import enum Role từ Enum class
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "USER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USER_CODE", nullable = false, unique = true)
    private String userCode;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "ROLE_ID", nullable = false)
    private int roleId;

    @Column(name = "STATUS_CODE", nullable = false)
    private String statusCode;

    @Enumerated(EnumType.STRING) // Chỉ rõ Hibernate lưu giá trị enum dưới dạng chuỗi
    @Column(name = "ROLE")
    private Role role;

    // Phương thức getter cho roleId, giúp chuyển đổi roleId thành Role
    public Role getRole() {
        return Role.fromInt(this.roleId); // Chuyển roleId thành Role enum
    }

    // Phương thức setter cho roleId, giúp chuyển đổi Role thành roleId
    public void setRole(Role role) {
        this.role = role;
        this.roleId = role.getValue(); // Lưu giá trị của role dưới dạng roleId (int)
    }
}
