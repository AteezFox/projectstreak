package com.example.productapi.repository;

import com.example.productapi.enums.OrderState;
import com.example.productapi.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserOrderRepository extends JpaRepository<UserOrder, Long> {
    Optional<List<UserOrder>> findOrderByState(OrderState orderState);
}
