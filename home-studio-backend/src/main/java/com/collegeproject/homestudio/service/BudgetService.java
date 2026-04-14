package com.collegeproject.homestudio.service;
import com.collegeproject.homestudio.model.*;
import com.collegeproject.homestudio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RecommendedProductRepository recommendedProductRepository;

    @Autowired
    private UserRepository userRepository;

    public Budget saveBudget(Integer userId, Double totalBudget, String roomType) {
        User user = userRepository.findById(userId).orElseThrow();
        Budget budget = new Budget();
        budget.setUser(user);
        budget.setTotalBudget(totalBudget);
        budget.setRoomType(roomType);
        return budgetRepository.save(budget);
    }

    public List<RecommendedProduct> generateRecommendations(Integer budgetId) {
        Budget budget = budgetRepository.findById(budgetId).orElseThrow();
        Double totalBudget = budget.getTotalBudget();
        String roomType = budget.getRoomType();

        //products under one room type
        List<Product> allProducts = productRepository.findAll();
        List<Product> matchingProducts = new ArrayList<>();

        for (Product product : allProducts) {
            String categoryName = product.getCategory()
                    .getCategoryName()
                    .toLowerCase();
            if (categoryName.contains(roomType.toLowerCase())) {
                matchingProducts.add(product);
            }
        }

        // products within budget
        List<Product> recommended = new ArrayList<>();
        double remaining = totalBudget;

        for (Product product : matchingProducts) {
            if (product.getPrice() <= remaining) {
                recommended.add(product);
                remaining -= product.getPrice();
            }
        }

        // delete old recommendations for the same budget
        List<RecommendedProduct> oldRecs = recommendedProductRepository
                .findByBudgetBudgetId(budgetId);
        recommendedProductRepository.deleteAll(oldRecs);

        // save new recomm
        List<RecommendedProduct> savedRecs = new ArrayList<>();
        for (Product product : recommended) {
            RecommendedProduct rec = new RecommendedProduct();
            rec.setBudget(budget);
            rec.setProduct(product);
            savedRecs.add(recommendedProductRepository.save(rec));
        }

        return savedRecs;
    }

    public List<RecommendedProduct> getRecommendations(Integer budgetId) {
        return recommendedProductRepository.findByBudgetBudgetId(budgetId);
    }

    public List<Budget> getBudgetsByUser(Integer userId) {
        return budgetRepository.findByUserUserId(userId);
    }
}