package com.example.productapi.dto;

import com.example.productapi.enums.Category;
import lombok.*;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private Long companyId;
    private String name;
    private String image;
    private String description;
    private Category category;
    private Double price;

    public ProductDTO() {
    }

    public ProductDTO(Long id, Long companyId, String name, String image, String description, Category category, Double price) {
        this.id = id;
        this.companyId = companyId;
        this.name = name;
        this.image = image;
        this.description = description;
        this.category = category;
        this.price = price;
    }

    public ProductDTO(Long companyId, String name, String image, String description, Category category, Double price) {
        this.companyId = companyId;
        this.name = name;
        this.image = image;
        this.description = description;
        this.category = category;
        this.price = price;
    }
}
