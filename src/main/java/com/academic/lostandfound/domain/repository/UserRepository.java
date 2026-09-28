package com.academic.lostandfound.domain.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import com.academic.lostandfound.domain.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

    UserDetails findByLogin(String login);

    public boolean existsByEmail(String email);
    public boolean existsByPhoneString(String phoneString);
}
