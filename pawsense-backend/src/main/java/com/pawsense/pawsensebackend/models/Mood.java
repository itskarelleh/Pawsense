package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "moods")
@Getter @Setter @NoArgsConstructor
public class Mood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", length = 100)
    private String type;

    @Column(name = "details", length = 400)
    private String details;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    @JsonBackReference
    private Pet pet;
    private String userId;

    private LocalDateTime createdAt;

    private LocalDateTime lastUpdatedAt;

    public Mood(String type, String details, Pet pet, String userId, LocalDateTime createdAt, LocalDateTime lastUpdatedAt) {
        this.type = type;
        this.details = details;
        this.pet = pet;
        this.userId = userId;
        this.createdAt = createdAt;
        this.lastUpdatedAt = lastUpdatedAt;
    }
}
