package com.collegeproject.homestudio.repository;

import com.collegeproject.homestudio.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategoryCategoryId(Integer categoryId);
    List<Product> findByPriceLessThanEqual(Double price);
}