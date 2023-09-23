package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "medications")
@Getter @Setter @NoArgsConstructor
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
    @JsonBackReference
    private Pet pet;

    @Column(nullable = false) // enforce non-nullability
    private String createdBy;

    @Column(nullable = false, columnDefinition = "timestamp with time zone") // enforce non-nullability
    private LocalDateTime createdAt;

    @Column(nullable = false, columnDefinition = "timestamp with time zone") // enforce non-nullability
    private LocalDateTime lastModifiedAt;

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

}
