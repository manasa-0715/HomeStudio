package com.collegeproject.homestudio.repository;

import com.collegeproject.homestudio.model.RecommendedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecommendedProductRepository extends JpaRepository<RecommendedProduct, Integer> {
    List<RecommendedProduct> findByBudgetBudgetId(Integer budgetId);
}
