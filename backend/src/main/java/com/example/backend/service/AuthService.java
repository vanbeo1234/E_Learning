package com.example.backend.service;

import com.example.backend.dto.request.UserRegisterReq;
import com.example.backend.dto.request.User1Req;
import com.example.backend.dto.response.AuthResp;

public interface AuthService {
    AuthResp registerUser(UserRegisterReq userRegisterReq);

    AuthResp loginUser(User1Req userLoginReq);
}
