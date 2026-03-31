package com.collegeproject.homestudio.service;

import com.collegeproject.homestudio.model.Cart;
import com.collegeproject.homestudio.model.CartItem;
import com.collegeproject.homestudio.model.Product;
import com.collegeproject.homestudio.model.User;
import com.collegeproject.homestudio.repository.CartItemRepository;
import com.collegeproject.homestudio.repository.CartRepository;
import com.collegeproject.homestudio.repository.ProductRepository;
import com.collegeproject.homestudio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart getOrCreateCart(Integer userId) {
        Optional<Cart> existingCart = cartRepository.findByUserUserId(userId);
        if (existingCart.isPresent()) {
            return existingCart.get();
        }
        User user = userRepository.findById(userId).orElseThrow();
        Cart newCart = new Cart();
        newCart.setUser(user);
        return cartRepository.save(newCart);
    }

    public CartItem addToCart(Integer userId, Integer productId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId).orElseThrow();
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getCartItems(Integer userId) {
        Cart cart = getOrCreateCart(userId);
        return cartItemRepository.findByCartCartId(cart.getCartId());
    }

    public void removeFromCart(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}
