package com.example.backend.service.implement;

import com.example.backend.dto.request.UserInfoUpdateReq;
import com.example.backend.dto.response.UserResp;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.example.backend.common.util.DateTimeUtil.formatDate;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Lấy toàn bộ danh sách người dùng với phân trang.
     * 
     * @param pageable Pageable đối tượng chứa thông tin phân trang.
     * @return Một trang người dùng dưới dạng {@link Page<UserResp>}.
     */
    @Override
    public Page<UserResp> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(user -> UserResp.builder()
                        .userCode(user.getUserCode())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .dateOfBirth(formatDate(user.getDateOfBirth().toLocalDate())) // ISO yyyy-MM-dd
                        .role(UserResp.getRoleText(user.getRoleId()))
                        .gender(UserResp.getGenderText(user.getGender()))
                        .statusCode(user.getStatusCode())
                        .experience(user.getExperience())
                        .certification(user.getCertification())
                        .build());
    }

    /**
     * Tìm kiếm người dùng theo các tiêu chí như tên, ngày sinh, vai trò và trạng
     * thái.
     * 
     * @param name        Tên người dùng.
     * @param dateOfBirth Ngày sinh người dùng.
     * @param roleId      Vai trò người dùng.
     * @param statusCode  Trạng thái người dùng.
     * @param pageable    Pageable đối tượng chứa thông tin phân trang.
     * @return Một trang kết quả tìm kiếm người dùng dưới dạng
     *         {@link Page<UserResp>}.
     */
    @Override
    public Page<UserResp> searchUsers(String name, LocalDateTime dateOfBirth, Integer roleId, String statusCode,
            Pageable pageable) {
        return userRepository.findByCriteria(name, dateOfBirth, roleId, statusCode, pageable)
                .map(user -> UserResp.builder()
                        .userCode(user.getUserCode())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .dateOfBirth(formatDate(user.getDateOfBirth().toLocalDate()))
                        .role(UserResp.getRoleText(user.getRoleId()))
                        .gender(UserResp.getGenderText(user.getGender()))
                        .statusCode(user.getStatusCode())
                        .experience(user.getExperience())
                        .certification(user.getCertification())
                        .build());
    }

    /**
     * Cập nhật thông tin người dùng dựa trên userCode và đối tượng
     * {@link UserInfoUpdateReq}.
     * 
     * @param userCode  Mã người dùng.
     * @param updateReq Thông tin cập nhật người dùng.
     * @throws RuntimeException Nếu không tìm thấy người dùng với mã userCode.
     */
    @Override
    public void updateUserInfo(String userCode, UserInfoUpdateReq updateReq) {
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new RuntimeException("User not found with code: " + userCode));

        user.setPhone(updateReq.getPhone());
        user.setAddress(updateReq.getAddress());
        user.setStatusCode(updateReq.getStatusCode());
        user.setExperience(updateReq.getExperience());
        user.setCertification(updateReq.getCertification());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(user);
    }

    /**
     * Kiểm tra sự tồn tại của email trong hệ thống.
     * 
     * @param email Email cần kiểm tra.
     * @return {@code true} nếu email đã tồn tại, {@code false} nếu không.
     */
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Kiểm tra sự tồn tại của mã người dùng trong hệ thống.
     * 
     * @param userCode Mã người dùng cần kiểm tra.
     * @return {@code true} nếu userCode đã tồn tại, {@code false} nếu không.
     */
    @Override
    public boolean existsByUserCode(String userCode) {
        return userRepository.existsByUserCode(userCode);
    }

    /**
     * Tìm người dùng theo mã người dùng.
     * 
     * @param userCode Mã người dùng cần tìm.
     * @return {@link Optional<User>} đối tượng người dùng nếu tồn tại,
     *         {@link Optional.empty()} nếu không.
     */
    @Override
    public Optional<User> findByUserCode(String userCode) {
        return userRepository.findByUserCode(userCode);
    }

    /**
     * Lưu người dùng vào cơ sở dữ liệu.
     * 
     * @param user Người dùng cần lưu.
     */
    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    /**
     * Lấy thông tin người dùng trả về dạng DTO {@link UserResp} từ userCode.
     * 
     * @param userCode Mã người dùng cần tìm.
     * @return Đối tượng {@link UserResp} nếu người dùng tồn tại, {@code null} nếu
     *         không tìm thấy.
     */
    @Override
    public UserResp getUserRespByCode(String userCode) {
        return userRepository.findByUserCode(userCode)
                .map(user -> UserResp.builder()
                        .userCode(user.getUserCode())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .dateOfBirth(formatDate(user.getDateOfBirth().toLocalDate()))
                        .role(UserResp.getRoleText(user.getRoleId()))
                        .gender(UserResp.getGenderText(user.getGender()))
                        .statusCode(user.getStatusCode())
                        .experience(user.getExperience())
                        .certification(user.getCertification())
                        .build())
                .orElse(null);
    }

}
