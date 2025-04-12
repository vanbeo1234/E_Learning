package com.example.backend.config;

import com.example.backend.service.AdminService;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

/**
 * Lớp này chịu trách nhiệm khởi tạo tài khoản Admin gốc khi ứng dụng được khởi
 * động.
 * Tài khoản Admin gốc sẽ được tạo nếu chưa tồn tại trong cơ sở dữ liệu.
 */
@Component
public class AdminAccountInitializer {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

    /**
     * Được kích hoạt khi ứng dụng khởi động.
     * Nếu tài khoản admin gốc chưa tồn tại, tài khoản sẽ được tạo tự động.
     * 
     * @param event sự kiện ContextRefreshedEvent
     */
    @EventListener(ContextRefreshedEvent.class)
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (!userRepository.existsByUserCode("admin001")) {
            adminService.createAdminAccount();
        }
    }
}
