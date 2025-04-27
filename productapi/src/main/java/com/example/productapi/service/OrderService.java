package com.example.productapi.service;

import com.example.productapi.converter.OrderConverter;
import com.example.productapi.dto.OrderDTO;
import com.example.productapi.enums.OrderState;
import com.example.productapi.model.UserOrder;
import com.example.productapi.repository.UserOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private UserOrderRepository userOrderRepository;

    public List<OrderDTO> getOrders() {
        return userOrderRepository.findAll().stream().map(OrderConverter::toDTO).collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long id) {
        UserOrder order = userOrderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return OrderConverter.toDTO(order);
    }

    public List<OrderDTO> getAvaliableOrders() {
        List<UserOrder> avaliableOrders = userOrderRepository.findOrderByState(OrderState.AVALIABLE).orElseThrow(() -> new RuntimeException("Order not found"));
        return avaliableOrders.stream().map(OrderConverter::toDTO).collect(Collectors.toList());
    }




    public OrderDTO createOrder(OrderDTO orderDTO) {
        UserOrder newOrder = OrderConverter.toEntity(orderDTO);
        UserOrder savedOrder = userOrderRepository.save(newOrder);
        return OrderConverter.toDTO(savedOrder);
    }
}
