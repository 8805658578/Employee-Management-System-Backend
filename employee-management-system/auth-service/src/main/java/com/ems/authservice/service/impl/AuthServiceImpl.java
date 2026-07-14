package com.ems.authservice.service.impl;

import com.ems.authservice.dto.AuthResponse;
import com.ems.authservice.dto.LoginRequest;
import com.ems.authservice.dto.RegisterRequest;
import com.ems.authservice.entity.User;
import com.ems.authservice.exception.BadRequestException;
import com.ems.authservice.repository.UserRepository;
import com.ems.authservice.service.AuthService;
import com.ems.authservice.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    // Explicit constructor injection
    public AuthServiceImpl(UserRepository userRepository, 
                           PasswordEncoder passwordEncoder, 
                           JwtUtil jwtUtil, 
                           ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.modelMapper = modelMapper;
    }

    @Override
    public AuthResponse register(RegisterRequest registerRequest) {
        log.info("Registering a new user with username: {}", registerRequest.getUsername());
        
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            log.warn("Username already exists: {}", registerRequest.getUsername());
            throw new BadRequestException("Username is already taken");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            log.warn("Email already exists: {}", registerRequest.getEmail());
            throw new BadRequestException("Email is already registered");
        }

        User user = modelMapper.map(registerRequest, User.class);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        
        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getUsername());

        String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole().name());
        return AuthResponse.builder()
                .token(token)
                .username(savedUser.getUsername())
                .role(savedUser.getRole())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        log.info("Logging in user: {}", loginRequest.getUsername());
        
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> {
                    log.warn("Login failed: Username not found: {}", loginRequest.getUsername());
                    return new BadRequestException("Invalid username or password");
                });

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            log.warn("Login failed: Password mismatch for username: {}", loginRequest.getUsername());
            throw new BadRequestException("Invalid username or password");
        }

        log.info("Login successful for user: {}", user.getUsername());
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }

    @Override
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }

    @Override
    public String getUsernameFromToken(String token) {
        return jwtUtil.getUsernameFromToken(token);
    }

    @Override
    public String getRoleFromToken(String token) {
        return jwtUtil.getRoleFromToken(token);
    }
}
