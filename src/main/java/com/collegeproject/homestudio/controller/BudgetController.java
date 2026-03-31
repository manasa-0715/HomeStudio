package com.collegeproject.homestudio.controller;

import com.collegeproject.homestudio.model.Budget;
import com.collegeproject.homestudio.model.RecommendedProduct;
import com.collegeproject.homestudio.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/set")
    public Budget setBudget(
            @RequestParam Integer userId,
            @RequestParam Double totalBudget,
            @RequestParam String roomType) {
        return budgetService.saveBudget(userId, totalBudget, roomType);
    }

    @GetMapping("/{budgetId}/recommendations")
    public List<RecommendedProduct> getRecommendations(@PathVariable Integer budgetId) {
        return budgetService.getRecommendations(budgetId);
    }

    @PostMapping("/{budgetId}/generate")
    public List<RecommendedProduct> generateRecommendations(@PathVariable Integer budgetId) {
        return budgetService.generateRecommendations(budgetId);
    }

    @GetMapping("/user/{userId}")
    public List<Budget> getBudgetsByUser(@PathVariable Integer userId) {
        return budgetService.getBudgetsByUser(userId);
    }
}