package com.example.e_learning_login2.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.sql.Timestamp;

@Entity
@Table(name = "USER")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "USER_CODE", unique = true, nullable = false)
    private String userCode;

    @Column(name = "ENCRYPTION_KEY")
    private String encryptionKey;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "GENDER", nullable = false)
    private Integer gender;

    @Column(name = "DATE_OF_BIRTH")
    private LocalDate dateOfBirth;

    @Column(name = "ROLE_ID", nullable = false)
    private Integer roleId;

    @Column(name = "STATUS_CODE", nullable = false)
    private String statusCode;

    @Column(name = "EXPERIENCE")
    private Integer experience;

    @Column(name = "CERTIFICATION")
    private String certification;

    @Column(name = "CREATED_BY")
    private String createdBy;

    @Column(name = "UPDATED_BY")
    private String updatedBy;

    @Column(name = "CREATED_AT", updatable = false)
    private Timestamp createdAt;

    @Column(name = "UPDATED_AT")
    private Timestamp updatedAt;
}
