package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "medications")
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String brand;

    private String instructions;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    private String createdBy;

    private Instant createdAt;

    private Instant lastModifiedAt;

    public Medication() { }

    public Medication(String name, String brand, String instructions,
                      Pet pet, String createdBy, Instant createdAt, Instant lastModifiedAt) {
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastModifiedAt() {
        return lastModifiedAt;
    }

    public void setLastModifiedAt(Instant lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }
}
