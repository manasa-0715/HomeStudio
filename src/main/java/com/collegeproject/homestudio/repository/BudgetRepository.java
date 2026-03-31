package com.collegeproject.homestudio.repository;

import com.collegeproject.homestudio.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    List<Budget> findByUserUserId(Integer userId);
}