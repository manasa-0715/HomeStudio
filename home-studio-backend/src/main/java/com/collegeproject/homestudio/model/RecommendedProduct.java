package com.collegeproject.homestudio.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "recommended_products")
public class RecommendedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_id")
    private Integer recId;

    @ManyToOne
    @JoinColumn(name = "budget_id")
    private Budget budget;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}