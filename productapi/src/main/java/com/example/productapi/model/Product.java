package com.example.productapi.model;

import com.example.productapi.enums.Category;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long companyId;

    private String name;

    @Lob
    private String image; //Base64

    private String description;
    private Category category;
    private Double price;

    public Product() {
    }

    public Product(Long companyId, String name, String image, String description, Category category, Double price) {
        this.companyId = companyId;
        this.name = name;
        this.image = image;
        this.description = description;
        this.category = category;
        this.price = price;
    }
}
