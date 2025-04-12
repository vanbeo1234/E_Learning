package com.example.backend.common;

public class Enum {

    // Enum Gender để xác định giới tính
    public enum Gender {
        MALE(0, "Male"),
        FEMALE(1, "Female");

        private final int value;
        private final String text;

        Gender(int value, String text) {
            this.value = value;
            this.text = text;
        }

        public int getValue() {
            return value;
        }

        public String getText() {
            return text;
        }
    }

    // Enum Role để xác định vai trò người dùng
    public enum Role {
        ADMIN(1, "Admin"),
        INSTRUCTOR(2, "Instructor"),
        STUDENT(3, "Student");

        private final int value;
        private final String text;

        Role(int value, String text) {
            this.value = value;
            this.text = text;
        }

        public int getValue() {
            return value;
        }

        public String getText() {
            return text;
        }

        public static Role fromInt(int i) {
            for (Role role : Role.values()) {
                if (role.getValue() == i) {
                    return role;
                }
            }
            throw new IllegalArgumentException("Không tìm thấy vai trò tương ứng với giá trị: " + i);
        }
    }

    // Enum Status để xác định trạng thái
    public enum Status {
        ACTIVE("Active"),
        INACTIVE("Inactive");

        private final String value;

        Status(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}
