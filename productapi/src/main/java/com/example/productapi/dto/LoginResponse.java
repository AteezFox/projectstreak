package com.example.productapi.dto;

import lombok.*;

@Getter
@Setter
public class LoginResponse {
    private Long userId;
    private String message;

    public LoginResponse(Long userId, String message) {
        this.userId = userId;
        this.message = message;
    }
}

