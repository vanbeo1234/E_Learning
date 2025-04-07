package com.example.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Cấu hình bảo mật cho hệ thống:
 * - CSRF
 * - Phân quyền truy cập
 * - Xử lý lỗi xác thực JWT
 */
@Configuration
public class Security1Config {

    /**
     * .requestMatchers("/v1/api/users/**").authenticated() // bắt buộc xác thực
     * Cấu hình filter chính cho Spring Security
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Tắt CSRF cho API REST
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/v1/api/auth/**").permitAll() // Cho phép truy cập không cần xác thực
                        .requestMatchers("/v1/api/users/**").permitAll()
                        .requestMatchers("/v1/api/users/**").authenticated() // Chỉ Admin
                        .requestMatchers("/v1/api/users/search").authenticated() // Chỉ Admin
                        .requestMatchers("/v1/api/users/update/**").authenticated() // Chỉ Admin
                        .anyRequest().authenticated() // Các request còn lại cần xác thực
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedEntryPoint()));

        return http.build();
    }

    /**
     * Xử lý lỗi xác thực JWT: Trả về 401 nếu token sai hoặc thiếu
     */
    @Bean
    public AuthenticationEntryPoint unauthorizedEntryPoint() {
        return (HttpServletRequest request, HttpServletResponse response,
                AuthenticationException authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                        "Unauthorized: Token không hợp lệ hoặc thiếu");
    }

    /**
     * Mã hóa mật khẩu bằng thuật toán BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
