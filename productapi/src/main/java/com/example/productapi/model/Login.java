package com.example.productapi.model;

import lombok.*;

@Getter
@Setter
public class Login {

    private String email;
    private String password;
    private Long id;

    public Login() {
    }

    public Login(String password, Long id) {
        this.password = password;
        this.id = id;
    }

    public Login(String email, String password, Long id) {
        this.email = email;
        this.password = password;
        this.id = id;
    }
}
