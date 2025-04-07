package com.example.backend.config;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Date;

// Xử lý JWT: tạo, xác thực và giải mã token sử dụng RSA.
@Component
public class JwtTokenProvider {

    private final PrivateKey privateKey;
    private final PublicKey publicKey;
    private final JwtProperties jwtProperties;

    // Constructor injection để truyền KeyPair & cấu hình JWT
    public JwtTokenProvider(KeyPair keyPair, JwtProperties jwtProperties) {
        this.privateKey = keyPair.getPrivate();
        this.publicKey = keyPair.getPublic();
        this.jwtProperties = jwtProperties;
    }

    // Sinh JWT token từ thông tin người dùng.
    public String generateToken(String userCode, int roleId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtProperties.getExpiration());

        return Jwts.builder()
                .setSubject(userCode)
                .claim("roleId", roleId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(privateKey, SignatureAlgorithm.RS256)
                .compact();
    }

    // Kiểm tra tính hợp lệ của token.
    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // Lấy mã người dùng từ JWT.
    public String getUserCodeFromToken(String token) {
        return parseToken(token).getSubject();
    }

    // Lấy mã vai trò từ JWT.

    public int getRoleIdFromToken(String token) {
        return parseToken(token).get("roleId", Integer.class);
    }

    // Phân tích token và trả về payload.
    private Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Tách token từ header `Authorization`.
    public String resolveToken(String authHeader) {
        String prefix = jwtProperties.getPrefix() + " ";
        if (authHeader != null && authHeader.startsWith(prefix)) {
            return authHeader.substring(prefix.length());
        }
        return null;
    }
}
