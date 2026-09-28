package com.academic.lostandfound.domain.user;

public record AuthenticationDTO(
    String email,
    String password
) {

}
