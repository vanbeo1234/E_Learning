package com.example.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// Cấu hình JWT từ application.properties
@Component
@ConfigurationProperties(prefix = "app.jwt")
@Getter
@Setter
public class JwtProperties {
    private long expiration = 86400000; // Thời gian hết hạn token (ms), mặc định 1 ngày
    private String prefix = "Bearer"; // Tiền tố token, mặc định "Bearer"
}