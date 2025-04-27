package com.example.productapi.repository;

import com.example.productapi.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByUserId(Long ceoID);

    void deleteByUserId(Long userId);
}
