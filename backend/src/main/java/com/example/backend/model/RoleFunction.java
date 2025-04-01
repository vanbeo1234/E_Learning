package com.example.e_learning_login2.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ROLE_FUNCTION")
public class RoleFunction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ROLE_ID")
    private Integer roleId;

    @Column(name = "FUNCTION_ID")
    private Long functionId;

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Long getFunctionId() {
        return functionId;
    }

    public void setFunctionId(Long functionId) {
        this.functionId = functionId;
    }
}