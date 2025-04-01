package com.example.e_learning_login2.model;

public enum Role {
    ADMIN(1),
    INSTRUCTOR(2),
    STUDENT(3);

    private final int value;

    Role(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static Role fromInt(int i) {
        for (Role role : Role.values()) {
            if (role.getValue() == i) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unexpected value: " + i);
    }
}
