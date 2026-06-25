package com.secondbrain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {

    @NotBlank
    @Size(min = 2, message = "Name too short")
    private String name;

    @NotBlank
    @Size(min = 3, message = "Username must be at least 3 characters")
    private String username;

    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
