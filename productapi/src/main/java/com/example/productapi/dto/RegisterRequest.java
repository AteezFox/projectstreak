package com.example.productapi.dto;

import com.example.productapi.enums.UserType;
import lombok.*;

@Getter
@Setter
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private UserType userType;

    public RegisterRequest() {
    }

    public RegisterRequest(String firstName, String lastName, String email, String password, String phone, UserType userType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.userType = userType;
    }
}
