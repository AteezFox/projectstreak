package com.example.productapi.repository;

import com.example.productapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<List<Product>> findProductByCompanyId(Long id);
}
