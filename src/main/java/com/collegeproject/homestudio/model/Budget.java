package com.collegeproject.homestudio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "budget")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Integer budgetId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "total_budget")
    private Double totalBudget;

    @Column(name = "room_type")
    private String roomType;
}