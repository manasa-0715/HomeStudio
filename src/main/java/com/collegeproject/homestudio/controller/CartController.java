package com.collegeproject.homestudio.controller;

import com.collegeproject.homestudio.model.CartItem;
import com.collegeproject.homestudio.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public List<CartItem> getCartItems(@PathVariable Integer userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping("/add")
    public CartItem addToCart(
            @RequestParam Integer userId,
            @RequestParam Integer productId,
            @RequestParam Integer quantity) {
        return cartService.addToCart(userId, productId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Integer cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.ok().build();
    }
}