package com.academic.lostandfound.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academic.lostandfound.application.service.auth.infra.security.TokenService;
import com.academic.lostandfound.domain.repository.UserRepository;
import com.academic.lostandfound.domain.user.AuthenticationDTO;
import com.academic.lostandfound.domain.user.LoginResponseDTO;
import com.academic.lostandfound.domain.user.RegisterDTO;
import com.academic.lostandfound.domain.user.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationService;

    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data) {

        System.out.println("Received login request for email: " + data.email());

        var userNamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationService.authenticate(userNamePasswordAuthenticationToken);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
    @PostMapping ("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO data) {
        System.out.println("Received registration request for email: " + data.email());
        System.out.println("Received registration request for phone: " + data.phoneString());
        System.out.println("Received registration request for city: " + data.city());

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        var user = new User();
        user.setLogin(data.email());
        user.setPassword(encryptedPassword);
        user.setEmail(data.email());
        user.setName(data.name());
        user.setPhoneString(data.phoneString());
        user.setRole(data.role());
        user.setCity(data.city());

        if (userRepository.existsByEmail(data.email())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        if (userRepository.existsByPhoneString(data.phoneString())) {
            return ResponseEntity.badRequest().body("Phone number already in use");
        }
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
    

}
