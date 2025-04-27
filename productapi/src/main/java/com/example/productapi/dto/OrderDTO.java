package com.example.productapi.dto;

import com.example.productapi.enums.OrderState;
import jakarta.persistence.ElementCollection;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class OrderDTO {

    private Long id;

    @ElementCollection
    private List<Long> productIds;

    private Double totalPrice;

    private OrderState state;

    private LocalDate orderDate;

    public OrderDTO() {}

    public OrderDTO(List<Long> productIds, Double totalPrice, OrderState state, LocalDate orderDate) {
        this.productIds = productIds;
        this.totalPrice = totalPrice;
        this.state = state;
        this.orderDate = orderDate;
    }

    public OrderDTO(Long id, List<Long> productIds, Double totalPrice, OrderState state, LocalDate orderDate) {
        this.id = id;
        this.productIds = productIds;
        this.totalPrice = totalPrice;
        this.state = state;
        this.orderDate = orderDate;
    }
}
