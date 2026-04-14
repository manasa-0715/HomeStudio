package com.collegeproject.homestudio.controller;
import com.collegeproject.homestudio.model.Admin;
import com.collegeproject.homestudio.model.User;
import com.collegeproject.homestudio.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = authService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email,
                                       @RequestParam String password) {
        Optional<User> user = authService.loginUser(email, password);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(401).body("Invalid email or password!");
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestParam String email,
                                        @RequestParam String password) {
        Optional<Admin> admin = authService.loginAdmin(email, password);
        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        }
        return ResponseEntity.status(401).body("Invalid admin credentials!");
    }
}