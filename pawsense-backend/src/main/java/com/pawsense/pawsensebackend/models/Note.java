package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
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
    private Pet pet;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "lastUpdatedAt")
    private LocalDateTime lastUpdated;

    public Note() { }

    public Note(String title, String details, String userId, Pet pet,
                LocalDateTime createdAt, LocalDateTime lastUpdated) {
        this.title = title;
        this.details = details;
        this.userId = userId;
        this.pet = pet;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
