package com.example.productapi.service;

import com.example.productapi.converter.UserConverter;
import com.example.productapi.dto.RegisterRequest;
import com.example.productapi.dto.UserDTO;
import com.example.productapi.model.User;
import com.example.productapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO createUser(RegisterRequest requestUser) {
        User user = new User();
        user.setFirstName(requestUser.getFirstName());
        user.setLastName(requestUser.getLastName());
        user.setEmail(requestUser.getEmail());
        user.setPassword(requestUser.getPassword());
        user.setPhone(requestUser.getPhone());
        user.setUserType(requestUser.getUserType());
        return UserConverter.toDTO(userRepository.save(user));
    }
}
