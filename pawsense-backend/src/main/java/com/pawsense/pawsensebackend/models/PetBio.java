package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "pet_bios")
public class PetBio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "weight")
    private double weight;

    @Column(name = "about", length = 4000)
    private String about;

    @Column(name = "size")
    private String size;

    @Column(name="birthDate")
    private LocalDate birthDate;

    @Column(name = "adoptionDate")
    private LocalDate adoptionDate;

    @ElementCollection // Use ElementCollection for collections
    private Set<String> traits = new HashSet<>();

    @ElementCollection // Use ElementCollection for collections
    private Set<String> photoIds = new HashSet<>();

    @Column(nullable = false)
    private LocalDateTime addedAt;

    @Column(nullable = false)
    private LocalDateTime lastUpdatedAt;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    @JsonBackReference
    private Pet pet;

    public PetBio() { }

    public PetBio(LocalDateTime addedAt, LocalDateTime lastUpdatedAt, Pet pet) {
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.pet = pet;
    }

    public PetBio(double weight, String size, String about, LocalDate birthDate, LocalDate adoptionDate,
                  Set<String> traits, LocalDateTime addedAt, LocalDateTime lastUpdatedAt, Pet pet) {
        this.weight = weight;
        this.size = size;
        this.about = about;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.traits = traits;
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

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
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

    public Set<String> getTraits() {
        return traits;
    }

    public void setTraits(Set<String> traits) {
        this.traits = traits;
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
        PetBio petBio = (PetBio) o;
        return Objects.equals(id, petBio.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "PetBio{" +
                "id=" + id +
                ", weight=" + weight +
                ", about='" + about + '\'' +
                ", size='" + size + '\'' +
                ", birthDate=" + birthDate +
                ", adoptionDate=" + adoptionDate +
                ", traits=" + traits +
                ", addedAt=" + addedAt +
                ", lastUpdatedAt=" + lastUpdatedAt +
                '}';
    }
}
