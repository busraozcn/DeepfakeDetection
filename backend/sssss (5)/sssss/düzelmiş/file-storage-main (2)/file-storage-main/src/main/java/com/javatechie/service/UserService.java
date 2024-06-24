package com.javatechie.service;

import com.javatechie.entity.BlacklistToken;
import com.javatechie.repository.BlacklistTokenRepository;
import com.javatechie.entity.User;
import com.javatechie.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlacklistTokenRepository blacklistTokenRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Transactional
    public User registerUser(String firstName, String lastName, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Email already in use.");
        }

        User newUser = new User(firstName, lastName, email, bCryptPasswordEncoder.encode(password));
        return userRepository.save(newUser);
    }

    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> bCryptPasswordEncoder.matches(password, user.getPassword()));
    }

    @Transactional
    public void resetPasswordRequest(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Generate reset token
        String resetToken = generateRandomToken();
        user.setResetToken(resetToken);
        userRepository.save(user);

        // Burada email gönderme işlemi yok
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired token"));

        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        user.setResetToken(null);
        userRepository.save(user);
    }

    public User loadUserByUsername(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    private String generateRandomToken() {
        // Generate a random token using UUID
        return UUID.randomUUID().toString();
    }

    @Transactional
    public void logoutUser(String token) {
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1); // Token'in geçersiz kılınma süresi
        BlacklistToken blacklistToken = new BlacklistToken(token, expiryDate);
        blacklistTokenRepository.save(blacklistToken);
    }

}
