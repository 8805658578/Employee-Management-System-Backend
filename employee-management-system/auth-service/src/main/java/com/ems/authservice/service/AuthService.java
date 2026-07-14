package com.ems.authservice.service;

import com.ems.authservice.dto.AuthResponse;
import com.ems.authservice.dto.LoginRequest;
import com.ems.authservice.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest registerRequest);
    AuthResponse login(LoginRequest loginRequest);
    boolean validateToken(String token);
    String getUsernameFromToken(String token);
    String getRoleFromToken(String token);
}
