package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "weight_history")
public class WeightHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "weight")
    private double weight;

    @Column(name = "update_date")
    private LocalDate updateDate;

    @ManyToOne
    @JoinColumn(name = "pet_stats_id")
    private PetStats petStats;

    public WeightHistory(double weight, LocalDate updateDate, PetStats petStats) {
        this.weight = weight;
        this.updateDate = updateDate;
        this.petStats = petStats;
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

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public PetStats getPetStats() {
        return petStats;
    }

    public void setPetStats(PetStats petStats) {
        this.petStats = petStats;
    }
}
