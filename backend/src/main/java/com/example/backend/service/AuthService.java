package com.example.e_learning_login2.service;

import com.example.e_learning_login2.dto.request.UserLoginReq;
import com.example.e_learning_login2.dto.request.UserRegisterReq;
import com.example.e_learning_login2.dto.response.AuthResponseResp;

public interface AuthService {
    AuthResponseResp registerUser(UserRegisterReq userRegisterReq);

    AuthResponseResp loginUser(UserLoginReq userLoginReq);
}
