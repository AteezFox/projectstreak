package com.example.productapi.dto;

import com.example.productapi.enums.OrderState;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserOrderPatchDTO {
    private OrderState state;
}
