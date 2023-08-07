package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "medications")
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use GenerationType.IDENTITY for PostgreSQL
    private Long id;

    @Column(nullable = false) // Add nullable=false to ensure the column is not nullable
    private String name;

    private String brand;

    @Column(length = 4000) // Adjust the length as needed for instructions
    private String instructions;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Column(nullable = false) // enforce non-nullability
    private String createdBy;

    @Column(nullable = false, columnDefinition = "timestamp with time zone") // enforce non-nullability
    private LocalDateTime createdAt;

    @Column(nullable = false, columnDefinition = "timestamp with time zone") // enforce non-nullability
    private LocalDateTime lastModifiedAt;

    public Medication() { }

    public Medication(String name, String brand, String instructions,
                      Pet pet, String createdBy, LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        this.name = name;
        this.brand = brand;
        this.instructions = instructions;
        this.pet = pet;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.lastModifiedAt = lastModifiedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastModifiedAt() {
        return lastModifiedAt;
    }

    public void setLastModifiedAt(LocalDateTime lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }
}
