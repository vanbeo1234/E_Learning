package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

        // Lấy tất cả người dùng với phân trang
        @Override
        @NonNull
        Page<User> findAll(@NonNull Pageable pageable);

        /**
         * Tìm kiếm người dùng theo các tiêu chí như tên, ngày sinh, vai trò và trạng
         * thái.
         * 
         * @param name        Tên người dùng (có thể null)
         * @param dateOfBirth Ngày sinh của người dùng (có thể null)
         * @param roleId      Vai trò của người dùng (có thể null)
         * @param statusCode  Trạng thái của người dùng (có thể null)
         * @param pageable    Thông tin phân trang
         * @return Danh sách người dùng thỏa mãn các điều kiện tìm kiếm
         */
        @Query("SELECT u FROM User u WHERE " +
                        "(:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
                        "(:dateOfBirth IS NULL OR u.dateOfBirth = :dateOfBirth) AND " +
                        "(:roleId IS NULL OR :roleId = 0 OR u.roleId = :roleId) AND " +
                        "(:statusCode IS NULL OR u.statusCode = :statusCode)")
        Page<User> findByCriteria(@Param("name") String name,
                        @Param("dateOfBirth") LocalDateTime dateOfBirth,
                        @Param("roleId") Integer roleId,
                        @Param("statusCode") String statusCode,
                        Pageable pageable);

        /**
         * Tìm kiếm người dùng theo mã người dùng (userCode), hỗ trợ cập nhật.
         * 
         * @param userCode Mã người dùng cần tìm
         * @return Optional chứa người dùng nếu tìm thấy, hoặc Optional.empty() nếu
         *         không tìm thấy
         */
        Optional<User> findByUserCode(String userCode);

        /**
         * Kiểm tra sự tồn tại của email, hỗ trợ đăng ký người dùng.
         * 
         * @param email Địa chỉ email cần kiểm tra
         * @return true nếu email đã tồn tại, false nếu chưa tồn tại
         */
        boolean existsByEmail(String email);

        /**
         * Kiểm tra sự tồn tại của userCode, hỗ trợ đăng ký người dùng.
         * 
         * @param userCode Mã người dùng cần kiểm tra
         * @return true nếu userCode đã tồn tại, false nếu chưa tồn tại
         */
        boolean existsByUserCode(String userCode);

        /**
         * Phương thức tạo người dùng mới bằng cách sử dụng JpaRepository để lưu vào cơ
         * sở dữ liệu.
         * 
         * @param user Đối tượng người dùng cần lưu
         * @return Đối tượng người dùng sau khi đã lưu
         */

        /**
         * Tạo người dùng mới bằng cách sử dụng query tùy chỉnh.
         * 
         * @param userCode      Mã người dùng
         * @param password      Mật khẩu đã mã hóa
         * @param name          Tên người dùng
         * @param email         Email người dùng
         * @param phone         Số điện thoại
         * @param address       Địa chỉ
         * @param gender        Giới tính
         * @param dateOfBirth   Ngày sinh
         * @param roleId        Vai trò
         * @param statusCode    Trạng thái
         * @param experience    Kinh nghiệm
         * @param certification Chứng chỉ
         * @param createdBy     Người tạo
         * @param encryptionKey Khóa mã hóa
         * @return Đối tượng User sau khi đã tạo và lưu
         */
        @Modifying
        @Query("INSERT INTO User (userCode, password, name, email, phone, address, gender, dateOfBirth, roleId, statusCode, experience, certification, createdBy, encryptionKey) "
                        +
                        "VALUES (:userCode, :password, :name, :email, :phone, :address, :gender, :dateOfBirth, :roleId, :statusCode, :experience, :certification, :createdBy, :encryptionKey)")
        void createUser(@Param("userCode") String userCode,
                        @Param("password") String password,
                        @Param("name") String name,
                        @Param("email") String email,
                        @Param("phone") String phone,
                        @Param("address") String address,
                        @Param("gender") Integer gender,
                        @Param("dateOfBirth") LocalDateTime dateOfBirth,
                        @Param("roleId") Integer roleId,
                        @Param("statusCode") String statusCode,
                        @Param("experience") Integer experience,
                        @Param("certification") String certification,
                        @Param("createdBy") String createdBy,
                        @Param("encryptionKey") String encryptionKey);

}