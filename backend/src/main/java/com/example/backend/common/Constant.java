package com.example.e_learning_login2.common;

public class Constant {

    // Enum Gender để xác định giới tính
    public enum Gender {
        MALE(0),
        FEMALE(1);

        private int code;

        Gender(int code) {
            this.code = code;
        }

        public int getCode() {
            return code;
        }
    }

    // Enum Role để xác định vai trò người dùngdùng
    public enum Role {
        ADMIN(1),
        INSTRUCTOR(2),
        STUDENT(3);

        private final int code;

        Role(int code) {
            this.code = code;
        }

        public int getCode() {
            return code;
        }

        public static Role fromInt(int i) {
            for (Role role : Role.values()) {
                if (role.getCode() == i) {
                    return role;
                }
            }
            throw new IllegalArgumentException("Unexpected value: " + i);
        }
    }

    // Enum Status để xác định trạng thái
    public enum Status {
        ACTIVE("Active"),
        INACTIVE("Inactive");

        private String code;

        Status(String code) {
            this.code = code;
        }

        public String getCode() {
            return code;
        }
    }

    // JWT constants
    public static final long JWT_EXPIRATION = 10 * 60 * 60 * 1000; // 10 giờ (miliseconds)
    public static final String JWT_TOKEN_PREFIX = "Bearer ";

    // Thêm vào JWT_HEADER
    public static final String JWT_HEADER = "Authorization";
}
