package com.collegeproject.homestudio.controller;

import com.collegeproject.homestudio.model.Order;
import com.collegeproject.homestudio.model.OrderItem;
import com.collegeproject.homestudio.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place/{userId}")
    public Order placeOrder(@PathVariable Integer userId) {
        return orderService.placeOrder(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Integer userId) {
        return orderService.getOrdersByUser(userId);
    }

    @GetMapping("/{orderId}/items")
    public List<OrderItem> getOrderItems(@PathVariable Integer orderId) {
        return orderService.getOrderItems(orderId);
    }
}