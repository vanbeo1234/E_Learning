package com.example.backend.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()) // Cho phép tất cả request mà không cần đăng nhập
            .csrf(csrf -> csrf.disable()); // Tắt bảo vệ CSRF (chỉ dùng khi không có form login)
        
        return http.build();
    }
}