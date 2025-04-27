package com.example.productapi.repository;

import com.example.productapi.enums.UserType;
import com.example.productapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<List<User>> findByUserType(UserType userType);
}
