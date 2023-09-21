package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "pet_stats")
public class PetStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "weight")
    private double weight;

    @Column(name = "size")
    private String size;

    @Column(name="birthDate")
    private LocalDate birthDate;

    @Column(name = "adoptionDate")
    private LocalDate adoptionDate;

    @Column(nullable = false)
    private LocalDateTime addedAt;

    @Column(nullable = false)
    private LocalDateTime lastUpdatedAt;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    @JsonBackReference
    private Pet pet;

    public PetStats() { }

    public PetStats(LocalDateTime addedAt, LocalDateTime lastUpdatedAt, Pet pet) {
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.pet = pet;
    }

    public PetStats(double weight, String size, LocalDate birthDate, LocalDate adoptionDate,
                    LocalDateTime addedAt, LocalDateTime lastUpdatedAt, Pet pet) {
        this.weight = weight;
        this.size = size;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.pet = pet;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public LocalDate getAdoptionDate() {
        return adoptionDate;
    }

    public void setAdoptionDate(LocalDate adoptionDate) {
        this.adoptionDate = adoptionDate;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }

    public LocalDateTime getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PetStats petStats = (PetStats) o;
        return Objects.equals(id, petStats.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "PetStats{" +
                "id=" + id +
                ", weight=" + weight +
                ", size='" + size + '\'' +
                ", birthDate=" + birthDate +
                ", adoptionDate=" + adoptionDate +
                ", addedAt=" + addedAt +
                ", lastUpdatedAt=" + lastUpdatedAt +
                '}';
    }
}
