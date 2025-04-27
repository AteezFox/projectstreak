package com.example.productapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductPatchDTO {
    private String name;
    private String image;
    private String description;
    private Double price;
}
