package com.collegeproject.homestudio.service;

import com.collegeproject.homestudio.model.*;
import com.collegeproject.homestudio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
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

    // Maps room type to relevant category names
    private List<String> getCategoriesForRoom(String roomType) {
        switch (roomType.toLowerCase().trim()) {
            case "bedroom":
                return Arrays.asList("bed", "wardrobe", "curtains", "carpet", "study table", "lighting");
            case "living room":
                return Arrays.asList("sofa", "table", "chair", "lighting", "decor", "carpet");
            case "dining room":
                return Arrays.asList("table", "chair", "lighting", "decor");
            case "kitchen":
                return Arrays.asList("table", "chair", "lighting", "decor");
            case "office":
                return Arrays.asList("chair", "study table", "lighting", "table", "decor");
            case "outdoor":
                return Arrays.asList("chair", "table", "lighting", "carpet", "decor");
            default:
                // if no match, return all categories — show everything
                return Arrays.asList("sofa", "table", "chair", "lighting",
                        "decor", "bed", "wardrobe", "curtains", "carpet", "study table");
        }
    }

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

        // get relevant category names for this room type
        List<String> relevantCategories = getCategoriesForRoom(roomType);

        // get all products and filter by relevant categories
        List<Product> allProducts = productRepository.findAll();
        List<Product> matchingProducts = new ArrayList<>();

        for (Product product : allProducts) {
            if (product.getCategory() == null) continue;
            String categoryName = product.getCategory().getCategoryName().toLowerCase().trim();

            // check if this product's category is relevant for the room
            for (String relevantCat : relevantCategories) {
                if (relevantCategories.contains(categoryName)) {
                    matchingProducts.add(product);
                }
            }
        }

        // greedy algorithm — pick products within budget
        List<Product> recommended = new ArrayList<>();
        double remaining = totalBudget;

        for (Product product : matchingProducts) {
            if (product.getPrice() != null && product.getPrice() <= remaining) {
                recommended.add(product);
                remaining -= product.getPrice();
            }
        }

        // delete old recommendations for this budget
        List<RecommendedProduct> oldRecs = recommendedProductRepository
                .findByBudgetBudgetId(budgetId);
        recommendedProductRepository.deleteAll(oldRecs);

        // save new recommendations
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