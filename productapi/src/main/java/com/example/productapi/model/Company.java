package com.example.productapi.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Long userId; //Where userType = CEO

    private String name;

    public Company() {
    }

    public Company(Long userId, String name) {
        this.userId = userId;
        this.name = name;
    }
}
