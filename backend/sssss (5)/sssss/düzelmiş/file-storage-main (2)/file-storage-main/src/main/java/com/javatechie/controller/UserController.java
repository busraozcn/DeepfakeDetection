package com.javatechie.controller;

import com.javatechie.dto.UserRequestBody;
import com.javatechie.entity.User;
import com.javatechie.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.awt.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
            return ResponseEntity.ok().body("{\"message\":\"User registered successfully\"}");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserRequestBody userRequestBody) {
        return userService.loginUser(userRequestBody.getEmail(), userRequestBody.getPassword())
                .map(user -> ResponseEntity.ok().body("{\"message\":\"Login successful\"}"))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\":\"Invalid email or password\"}"));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/logout")
    public ResponseEntity<Object> logoutUser(@RequestHeader("Authorization") String token) {
        try {
            userService.logoutUser(token);
            return ResponseEntity.ok().body("{\"message\":\"Logout successful\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/reset-password-request")
    public ResponseEntity<Object> resetPasswordRequest(@RequestParam String email) {
        try {
            userService.resetPasswordRequest(email);
            return ResponseEntity.ok().body("{\"message\":\"Password reset request successful\"}");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            userService.resetPassword(token, newPassword);
            return ResponseEntity.ok().body("{\"message\":\"Password reset successfully\"}");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.loadUserByUsername(email);
        return ResponseEntity.ok(user);
    }



}