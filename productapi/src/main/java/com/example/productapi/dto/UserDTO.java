package com.example.productapi.dto;

import com.example.productapi.enums.UserType;
import lombok.*;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private UserType userType;

    public UserDTO() {}

    public UserDTO(String firstName, String lastName, String email, String password, String phone, String address, UserType userType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.userType = userType;
    }

    public UserDTO(Long id, String firstName, String lastName, String email, String password, String phone, String address, UserType userType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.userType = userType;
    }

}
