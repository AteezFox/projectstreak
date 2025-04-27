package com.example.productapi.dto;

import lombok.*;

@Getter
@Setter
public class CompanyDTO {
    private Long id;
    private String name;
    private Long userId;

    public CompanyDTO() {
    }

    public CompanyDTO(Long id, Long userId, String name) {
        this.id = id;
        this.userId = userId;
        this.name = name;
    }
}
