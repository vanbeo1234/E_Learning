package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;

@Configuration
public class RsaKeyConfig {

    /**
     * Sử dụng KeyPairGenerator để tạo cặp khóa RSA (public key/private key).
     * Độ dài khóa 2048 bit được chọn để đảm bảo bảo mật cao.
     * 
     * @return KeyPair chứa khóa công khai và khóa riêng
     * @throws NoSuchAlgorithmException nếu không tìm thấy thuật toán RSA
     */
    @Bean
    public KeyPair rsaKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048); // Độ dài khóa 2048 bit
        return generator.generateKeyPair();
    }

    /**
     * Trả về khóa công khai RSA dưới dạng chuỗi Base64 để lưu vào cơ sở dữ liệu.
     * 
     * @param keyPair Cặp khóa RSA
     * @return Chuỗi Base64 của khóa công khai
     */
    public static String getPublicKeyAsString(KeyPair keyPair) {
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }

    /**
     * Trả về PrivateKey RSA để ký JWT
     * 
     * @param keyPair Cặp khóa RSA
     * @return RSAPrivateKey
     */
    public static RSAPrivateKey getPrivateKey(KeyPair keyPair) {
        return (RSAPrivateKey) keyPair.getPrivate();
    }

    /**
     * Trả về PublicKey RSA để xác minh JWT
     * 
     * @param keyPair Cặp khóa RSA
     * @return RSAPublicKey
     */
    public static RSAPublicKey getPublicKey(KeyPair keyPair) {
        return (RSAPublicKey) keyPair.getPublic();
    }
}
