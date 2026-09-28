package com.academic.lostandfound.domain.user;

/**
 * UserRole
 */
public enum UserRole {

    ADMIN("admin"),
    USER("user");

    private final String userRole;

    UserRole(String roleValue) {
        this.userRole = roleValue;
    }

    public String getRole() {
        return this.userRole;
    }

}
