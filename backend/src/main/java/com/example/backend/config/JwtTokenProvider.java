package com.example.e_learning_login2.config;

import com.example.e_learning_login2.common.Constant;
import io.jsonwebtoken.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.util.Date;

@Component
@Getter
@Setter
public class JwtTokenProvider {

    @Autowired
    private KeyPair rsaKeyPair; // Sử dụng KeyPair từ RsaConfig

    /**
     * Tạo JWT dựa trên USER_CODE và ROLE_ID.
     * 
     * @param userCode Mã người dùng
     * @param roleId   ID của vai trò
     * @return Chuỗi JWT
     */
    public String generateToken(String userCode, int roleId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + Constant.JWT_EXPIRATION);

        return Jwts.builder()
                .setSubject(userCode)
                .claim("roleId", roleId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(RsaConfig.getPrivateKey(rsaKeyPair), SignatureAlgorithm.RS256) // Đảm bảo sử dụng đúng tham số
                .compact();
    }

    /**
     * Lấy USER_CODE từ JWT.
     * 
     * @param token Chuỗi JWT
     * @return USER_CODE
     */
    public String getUserCodeFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(RsaConfig.getPublicKey(rsaKeyPair)) // Sử dụng RsaConfig
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    /**
     * Lấy ROLE_ID từ JWT.
     * 
     * @param token Chuỗi JWT
     * @return ROLE_ID
     */
    public int getRoleIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(RsaConfig.getPublicKey(rsaKeyPair)) // Sử dụng RsaConfig
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("roleId", Integer.class);
    }

    /**
     * Xác minh JWT có hợp lệ không.
     * 
     * @param token Chuỗi JWT
     * @return True nếu hợp lệ, False nếu không
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(RsaConfig.getPublicKey(rsaKeyPair)) // Sử dụng RsaConfig
                    .build()
                    .parseClaimsJws(token); // Xác minh chữ ký JWT
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false; // Nếu có lỗi khi xác minh JWT, trả về false
        }
    }

    /**
     * Lấy token từ header Authorization.
     * 
     * @param authHeader Header Authorization
     * @return Chuỗi JWT hoặc null nếu không hợp lệ
     */
    public String resolveToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith(Constant.JWT_TOKEN_PREFIX)) {
            return authHeader.substring(Constant.JWT_TOKEN_PREFIX.length());
        }
        return null;
    }
}
