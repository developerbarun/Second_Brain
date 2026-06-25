package com.secondbrain.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.secondbrain.dto.SigninRequest;
import com.secondbrain.dto.SignupRequest;
import com.secondbrain.model.User;
import com.secondbrain.repository.UserRepository;
import com.secondbrain.security.JwtUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/user")
@Validated
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "User already exists"));
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        userRepository.save(new User(request.getName(), request.getUsername(), hashedPassword));

        return ResponseEntity.status(201).body(Map.of("message", "User successfully signed up"));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@Valid @RequestBody SigninRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(user.getId());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
        return ResponseEntity.ok(Map.of("name", user.getName(), "username", user.getUsername()));
    }
}
