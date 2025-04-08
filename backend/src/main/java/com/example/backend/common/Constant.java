
// Đức thêm file này
package com.example.backend.common;

public class Constant {

    // Enum Gender để xác định giới tính
    public enum Gender {
        MALE(0, "Male"),
        FEMALE(1, "Female");

        private final int value;
        private final String text; // Thêm thuộc tính text

        Gender(int value, String text) {
            this.value = value;
            this.text = text;
        }

        public int getValue() {
            return value;
        }

        public String getText() { // Trả về text thay vì số
            return text;
        }
    }

    // Enum Status để xác định trạng thái
    public enum Status {
        ACTIVE("Active"), // Trạng thái hoạt động
        INACTIVE("Inactive"); // Trạng thái vô hiệu hóahóa

        private final String value;

        Status(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

}