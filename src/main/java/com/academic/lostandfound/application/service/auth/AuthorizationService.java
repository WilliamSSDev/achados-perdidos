package com.academic.lostandfound.application.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.academic.lostandfound.domain.repository.UserRepository;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        UserDetails user = userRepository.findByLogin(login);
        if (user == null) {
            System.out.println("User not found with login: " + login);
            throw new UsernameNotFoundException("User not found with login: " + login);
        }
        return user;
    }

}
