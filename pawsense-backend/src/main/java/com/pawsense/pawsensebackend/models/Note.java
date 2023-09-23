package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
@Getter @Setter @NoArgsConstructor
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", length = 250, nullable = false)
    private String title;

    @Column(name = "details", length = 4000)
    private String details;

    private String userId;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    @JsonBackReference
    private Pet pet;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "lastUpdatedAt")
    private LocalDateTime lastUpdated;

    public Note(String title, String details, String userId, Pet pet,
                LocalDateTime createdAt, LocalDateTime lastUpdated) {
        this.title = title;
        this.details = details;
        this.userId = userId;
        this.pet = pet;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
    }
}
