package com.example.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Lớp này chứa các thuộc tính cấu hình cho JWT (JSON Web Token).
 * Các thuộc tính này được lấy từ file cấu hình (application.properties hoặc
 * application.yml).
 */
@Component
@ConfigurationProperties(prefix = "app.jwt")
@Getter
@Setter
public class JwtProperties {
    /**
     * Thời gian hết hạn của token (tính bằng miligiây).
     * Mặc định là 86400000 (1 ngày).
     */
    private long expiration = 86400000;
    /**
     * Tiền tố của token, mặc định là "Bearer".
     * Token sẽ được trả về dưới dạng "Bearer <token>" trong header.
     */
    private String prefix = "Bearer";
}