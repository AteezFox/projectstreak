package com.example.productapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserPatchDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
}
