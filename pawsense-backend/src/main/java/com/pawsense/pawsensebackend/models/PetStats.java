package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "pet_stats")
@Getter @Setter @NoArgsConstructor
public class PetStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "petStats", cascade = CascadeType.ALL)
    private List<WeightHistory> weightHistory = new ArrayList<>();

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

    public PetStats(LocalDateTime addedAt, LocalDateTime lastUpdatedAt, Pet pet) {
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.pet = pet;
    }

    public PetStats(List<WeightHistory> weightHistory, String size, LocalDate birthDate, LocalDate adoptionDate, LocalDateTime addedAt, LocalDateTime lastUpdatedAt, Pet pet) {
        this.weightHistory = weightHistory;
        this.size = size;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.pet = pet;
    }

    public void addWeightHistory(double weight, LocalDate updateDate) {
        WeightHistory weightHistory = new WeightHistory(weight, updateDate, this);
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
                ", weightHistory=" + weightHistory +
                ", size='" + size + '\'' +
                ", birthDate=" + birthDate +
                ", adoptionDate=" + adoptionDate +
                ", addedAt=" + addedAt +
                ", lastUpdatedAt=" + lastUpdatedAt +
                '}';
    }
}
