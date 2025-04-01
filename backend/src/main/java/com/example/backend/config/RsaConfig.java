package com.example.e_learning_login2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;

import java.nio.file.Files; // Thêm import này cho Files
import java.nio.file.Path; // Thêm import này cho Path
// import org.junit.jupiter.api.Assertions; // Triển khai sau

@Configuration
public class RsaConfig {

    /**
     * Sử dụng KeyPairGenerator để tạo cặp khóa RSA (public key/private key).
     * Độ dài khóa 2048 bit được chọn để đảm bảo bảo mật cao.
     * 
     * @return KeyPair chứa khóa công khai và khóa riêng
     * @throws NoSuchAlgorithmException nếu không tìm thấy thuật toán RSA
     */
    @Bean
    public KeyPair rsaKeyPair() throws NoSuchAlgorithmException {
        // Tạo đối tượng KeyPairGenerator sử dụng thuật toán RSA
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");

        // Khởi tạo generator với độ dài khóa 2048 bit (theo Baeldung: Java RSA)
        generator.initialize(2048);

        // Tạo và trả về KeyPair (cặp khóa công khai và khóa riêng)
        KeyPair pair = generator.generateKeyPair();

        return pair;
    }

    /**
     * Trả về khóa công khai RSA dạng chuỗi Base64 để lưu vào cột ENCRYPTION_KEY
     * trong DB.
     * Mã hóa ngược password đã bị mã hóa ra đc đúng mã ASCII chuẩn, sử dụng
     * PublicKey
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

    /**
     * Mã hóa dữ liệu bằng PublicKey RSA
     * Dữ liệu đầu vào là chuỗi, đầu ra là chuỗi Base64.
     * 
     * @param plainText Dữ liệu cần mã hóa
     * @param publicKey Khóa công khai RSA
     * @return Chuỗi Base64 của dữ liệu đã mã hóa
     * @throws Exception Nếu mã hóa thất bại
     */
    public static String encrypt(String plainText, PublicKey publicKey) throws Exception {
        // Tạo Cipher với thuật toán RSA
        Cipher cipher = Cipher.getInstance("RSA");

        // Khởi tạo chế độ mã hóa với khóa công khai
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);

        // Mã hóa dữ liệu đầu vào (plainText) và chuyển đổi thành mảng byte
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

        // Chuyển mảng byte đã mã hóa thành chuỗi Base64
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    /**
     * Giải mã dữ liệu bằng privateKey RSA
     * Dữ liệu đầu vào là chuỗi Base64, đầu ra là chuỗi gốc.
     * 
     * @param encryptedText Dữ liệu đã mã hóa (Base64)
     * @param privateKey    Khóa riêng RSA
     * @return Chuỗi dữ liệu gốc
     * @throws Exception Nếu giải mã thất bại
     */
    public static String decrypt(String encryptedText, PrivateKey privateKey) throws Exception {
        // Tạo Cipher với thuật toán RSA
        Cipher cipher = Cipher.getInstance("RSA");

        // Khởi tạo chế độ giải mã với khóa riêng
        cipher.init(Cipher.DECRYPT_MODE, privateKey);

        // Giải mã Base64 thành mảng byte
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);

        // Giải mã dữ liệu
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

        // Chuyển mảng byte đã giải mã thành chuỗi gốc
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }

    /**
     * Ký dữ liệu bằng khóa riêng RSA (từ Baeldung: Java RSA).
     * Sử dụng SHA256withRSA để tạo chữ ký số.
     * 
     * @param plainText  Dữ liệu cần ký
     * @param privateKey Khóa riêng RSA
     * @return Chữ ký dạng Base64
     * @throws Exception Nếu ký thất bại
     */
    public static String sign(String plainText, PrivateKey privateKey) throws Exception {
        // Tạo Signature với thuật toán SHA256 + RSA
        Signature signature = Signature.getInstance("SHA256withRSA");

        // Khởi tạo chế độ ký với khóa riêng
        signature.initSign(privateKey);

        // Cập nhật dữ liệu cần ký
        signature.update(plainText.getBytes(StandardCharsets.UTF_8));

        // Tạo chữ ký
        byte[] signatureBytes = signature.sign();

        // Chuyển mảng byte chữ ký thành chuỗi Base64 để dễ dàng lưu trữ và truyền tải
        return Base64.getEncoder().encodeToString(signatureBytes);
    }

    /**
     * Xác minh chữ ký bằng ppublicKey RSA
     * Sử dụng SHA256withRSA để kiểm tra tính hợp lệ.
     * 
     * @param plainText     Dữ liệu gốc
     * @param signatureText Chữ ký (Base64)
     * @param publicKey     Khóa công khai RSA
     * @return True nếu chữ ký hợp lệ, False nếu không
     * @throws Exception Nếu xác minh thất bại
     */
    public static boolean verify(String plainText, String signatureText, PublicKey publicKey) throws Exception {
        // Tạo Signature với thuật toán SHA256 + RSA
        Signature signature = Signature.getInstance("SHA256withRSA");

        // Khởi tạo chế độ xác minh với khóa công khai
        signature.initVerify(publicKey);

        // Cập nhật dữ liệu gốc vào đối tượng Signature
        signature.update(plainText.getBytes(StandardCharsets.UTF_8));

        // Giải mã chữ ký từ Base64 thành mảng byte
        byte[] signatureBytes = Base64.getDecoder().decode(signatureText);

        // Xác minh chữ ký với dữ liệu gốc và chữ ký đã giải mã
        return signature.verify(signatureBytes);
    }
    /**
     * So sánh origin rwd và encrypt key (Triển khai sausau)
     * 
     * @param tempFile        Tệp tin chứa dữ liệu đã mã hóa hoặc ký
     * @param expectedContent Nội dung mong đợi của tệp tin
     * @throws Exception Nếu không khớp hoặc có lỗi
     * 
     *                   public static void verifyFileContent(java.nio.file.Path
     *                   tempFile, String expectedContent) throws Exception {
     *                   String fileContent = Files.readString(tempFile); // Đọc nội
     *                   dung tệp
     *                   Assertions.assertEquals(expectedContent, fileContent); //
     *                   So sánh với nội dung mong đợi
     *                   }
     */
}

/**
 * Tài liệu tham khảo :
 * https://smattme.com/posts/how-to-encrypt-decrypt-rsa-in-java/
 * https://www.baeldung.com/java-rsa
 * https://www.baeldung.com/java-digital-signature
 */