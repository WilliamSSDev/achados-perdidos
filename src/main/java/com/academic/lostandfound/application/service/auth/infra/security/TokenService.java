package com.academic.lostandfound.application.service.auth.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.academic.lostandfound.domain.user.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

@Service 
public class TokenService {

    @Value("${security.jwt.secret}")
    String secretKey; 

    public String generateToken(User user) {
        
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            String token = JWT.create()
                .withSubject(user.getUsername())
                .withIssuer("auth-api")
                .withExpiresAt(calculateExpirationDate(2)) // Token expires in 2 hours
                .sign(algorithm);
            return token;
        } catch (JWTCreationException exception){
            throw new RuntimeException("Error generating token", exception);
        }

    }
    public String validateTokenAndGetSubject(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            return JWT.require(algorithm)
                .withIssuer("auth-api")
                .build()
                .verify(token)
                .getSubject();
        } catch (JWTCreationException exception){
            throw new RuntimeException("Invalid or expired token", exception);
        }
    }
    private Instant calculateExpirationDate(Integer hours) {
        return LocalDateTime.now().plusHours(hours).toInstant(ZoneOffset.of("-03:00"));
    }

}
