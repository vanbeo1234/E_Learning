
/**
 * Lớp Enum chứa các enum cố định cho hệ thống như Giới tính, Trạng thái và Vai trò.
 * Được sử dụng để quản lý các giá trị cố định một cách rõ ràng, dễ bảo trì.
 * 
 * @author Duc
 */
package com.example.backend.common;

public class Enum {

    /**
     * Enum đại diện cho giới tính của người dùng trong hệ thống.
     * - MALE: Nam (value = 0)
     * - FEMALE: Nữ (value = 1)
     */
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

    /**
     * Enum đại diện cho trạng thái hoạt động của các thực thể như người dùng, khóa
     * học, v.v.
     * - ACTIVE: Đang hoạt động
     * - INACTIVE: Không hoạt động
     */
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

    /**
     * Enum đại diện cho vai trò người dùng trong hệ thống.
     * - ADMIN: Quản trị viên
     * - INSTRUCTOR: Giảng viên
     * - STUDENT: Học viên
     */
    public enum Role {
        ADMIN("Admin"),
        INSTRUCTOR("Giảng viên"),
        STUDENT("Học viên");

        private final String value;

        Role(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

}