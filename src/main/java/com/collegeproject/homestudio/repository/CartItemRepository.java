package com.collegeproject.homestudio.repository;
import com.collegeproject.homestudio.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByCartCartId(Integer cartId);
}