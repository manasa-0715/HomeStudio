package com.collegeproject.homestudio.service;

import com.collegeproject.homestudio.model.Category;
import com.collegeproject.homestudio.repository.BudgetRepository;
import com.collegeproject.homestudio.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BudgetRepository budgetRepository;

    public List<Category> getAllCategories() {

        List<String> roomTypes = budgetRepository.findDistinctRoomTypes();

        Category[] result = new Category[roomTypes.size()];

        int id = 1;
        for (int i = 0; i < roomTypes.size(); i++) {

            Category category = new Category();
            category.setCategoryId(id++);
            category.setCategoryName(roomTypes.get(i));

            result[i] = category;
        }

        return Arrays.asList(result);
    }

    public Optional<Category> getCategoryById(Integer id) {
        return categoryRepository.findById(id);
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }
}