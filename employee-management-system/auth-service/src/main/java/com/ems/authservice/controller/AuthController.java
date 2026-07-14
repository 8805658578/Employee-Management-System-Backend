package com.ems.authservice.controller;

import com.ems.authservice.dto.AuthResponse;
import com.ems.authservice.dto.LoginRequest;
import com.ems.authservice.dto.RegisterRequest;
import com.ems.authservice.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@Tag(name = "Auth-API", description = "Endpoints for User Registration, Authentication, and Token Validation")
public class AuthController {

    private final AuthService authService;

    // Explicit constructor injection
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "User Registration", description = "Registers a new user (ADMIN, HR, EMPLOYEE) and issues a JWT token.")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        log.info("Received request to register user: {}", registerRequest.getUsername());
        AuthResponse response = authService.register(registerRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Authenticates credentials and returns a JWT token upon success.")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        log.info("Received request to login user: {}", loginRequest.getUsername());
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    @Operation(summary = "Validate Token", description = "Validates the signature and expiration status of the provided JWT token.")
    public ResponseEntity<Boolean> validateToken(@RequestParam("token") String token) {
        log.info("Received request to validate JWT token");
        boolean isValid = authService.validateToken(token);
        return ResponseEntity.ok(isValid);
    }

    @GetMapping("/username")
    @Operation(summary = "Get Username", description = "Extracts and returns the username from the payload of a valid JWT token.")
    public ResponseEntity<String> getUsernameFromToken(@RequestParam("token") String token) {
        log.info("Received request to retrieve username from JWT token");
        String username = authService.getUsernameFromToken(token);
        return ResponseEntity.ok(username);
    }

    @GetMapping("/role")
    @Operation(summary = "Get Role", description = "Extracts and returns the user role from the payload of a valid JWT token.")
    public ResponseEntity<String> getRoleFromToken(@RequestParam("token") String token) {
        log.info("Received request to retrieve role from JWT token");
        String role = authService.getRoleFromToken(token);
        return ResponseEntity.ok(role);
    }
}
