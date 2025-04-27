package com.example.productapi.controller;

import com.example.productapi.dto.OrderDTO;
import com.example.productapi.dto.UserOrderPatchDTO;
import com.example.productapi.model.UserOrder;
import com.example.productapi.repository.UserOrderRepository;
import com.example.productapi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/streak/api/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/get")
    public List<OrderDTO> getAllOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/get/{id}")
    public OrderDTO getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("get/avaliable")
    public List<OrderDTO> getOrdersIfAvaliable() {
        return orderService.getAvaliableOrders();
    }

    @PostMapping("/add")
    public ResponseEntity<OrderDTO> addOrder(@RequestBody OrderDTO orderDTO) {
        OrderDTO created = orderService.createOrder(orderDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @Autowired
    UserOrderRepository userOrderRepository;

    @PatchMapping("/{id}")
    public ResponseEntity<UserOrder> patchUserOrder(@PathVariable Long id, @RequestBody UserOrderPatchDTO patchDTO) {
        Optional<UserOrder> optionalOrder = userOrderRepository.findById(id);

        if (optionalOrder.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserOrder order = optionalOrder.get();

        if (patchDTO.getState() != null) {
            order.setState(patchDTO.getState());
        }

        userOrderRepository.save(order);

        return ResponseEntity.ok(order);
    }
}
