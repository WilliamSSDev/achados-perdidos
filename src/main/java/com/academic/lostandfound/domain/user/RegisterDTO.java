package com.academic.lostandfound.domain.user;

/**
 * RegisterDTO
 */
public record RegisterDTO(String email,String name, String password, String phoneString, UserRole role, String city) {

}
