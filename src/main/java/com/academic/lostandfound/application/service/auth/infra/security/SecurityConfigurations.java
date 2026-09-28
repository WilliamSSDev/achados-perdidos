package com.academic.lostandfound.application.service.auth.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity 
public class SecurityConfigurations {

    @Autowired 
    SecurityFilter securityFilter;

    // Defines the security rules and filters applied to incoming HTTP requests.
    @Bean 
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("Security configurations are being applied.");
        return http
                // CSRF protection is disabled because this API uses stateless authentication.
                .csrf(csrf -> csrf.disable())
                // Do not store authentication in an HTTP session; each request must authenticate itself.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                    // Only authenticated users with the ADMIN role may create items.
                    .requestMatchers(HttpMethod.POST, "/items").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                    .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                    // Every other request requires the user to be authenticated.
                    .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        System.out.println("Password encoder bean is being created.");
        return new BCryptPasswordEncoder();
    }

}
