package com.collegeproject.homestudio.service;
import com.collegeproject.homestudio.model.*;
import com.collegeproject.homestudio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    public Order placeOrder(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<CartItem> cartItems = cartService.getCartItems(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty!");
        }

        // calculate total
        double total = 0;
        for (CartItem item : cartItems) {
            total += item.getProduct().getPrice() * item.getQuantity();
        }

        // create order
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(total);
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);

        // create order items from cart items
        for (CartItem item : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getProduct().getPrice());
            orderItemRepository.save(orderItem);
        }

        // clear cart after ordering
        for (CartItem item : cartItems) {
            cartItemRepository.deleteById(item.getCartItemId());
        }

        return savedOrder;
    }

    public List<Order> getOrdersByUser(Integer userId) {
        return orderRepository.findByUserUserId(userId);
    }

    public List<OrderItem> getOrderItems(Integer orderId) {
        return orderItemRepository.findByOrderOrderId(orderId);
    }
}