package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
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
         * <p>
         * Phương thức này cho phép tìm kiếm người dùng thông qua các tiêu chí, bao gồm
         * tên, ngày sinh, vai trò
         * và trạng thái.
         * </p>
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
         * <p>
         * Phương thức này tìm kiếm một người dùng thông qua mã người dùng (userCode).
         * </p>
         * 
         * @param userCode Mã người dùng cần tìm
         * @return Optional chứa người dùng nếu tìm thấy, hoặc Optional.empty() nếu
         *         không tìm thấy
         */
        Optional<User> findByUserCode(String userCode);

        /**
         * Kiểm tra sự tồn tại của email, hỗ trợ đăng ký người dùng.
         * <p>
         * Phương thức này kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa.
         * </p>
         * 
         * @param email Địa chỉ email cần kiểm tra
         * @return true nếu email đã tồn tại, false nếu chưa tồn tại
         */
        boolean existsByEmail(String email);

        /**
         * Kiểm tra sự tồn tại của userCode, hỗ trợ đăng ký người dùng.
         * <p>
         * Phương thức này kiểm tra xem userCode đã tồn tại trong cơ sở dữ liệu hay
         * chưa.
         * </p>
         * 
         * @param userCode Mã người dùng cần kiểm tra
         * @return true nếu userCode đã tồn tại, false nếu chưa tồn tại
         */
        boolean existsByUserCode(String userCode);
}
