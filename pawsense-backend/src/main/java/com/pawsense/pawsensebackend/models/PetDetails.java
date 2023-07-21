package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pet_details")
public class PetDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double weight;

    private String size;

    private LocalDate birthDate;

    private LocalDate adoptionDate;

    private boolean isFosterPet;

    @Column(name="traits")
    private Set<String> traits = new HashSet<>();

    @Column(name = "photoIds")
    private Set<String> photoIds = new HashSet<>();

    private Instant addedAt;

    private Instant lastUpdatedAt;

    @OneToOne(mappedBy = "petDetails")
    private Pet pet;

    public PetDetails(double weight, String size, LocalDate birthDate, LocalDate adoptionDate,
                      boolean isFosterPet, Set<String> traits, Set<String> photoIds,
                      Instant addedAt, Instant lastUpdatedAt, Pet pet) {
        this.weight = weight;
        this.size = size;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.isFosterPet = isFosterPet;
        this.traits = traits;
        this.photoIds = photoIds;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.pet = pet;
    }

    public PetDetails() {

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

    public boolean isFosterPet() {
        return isFosterPet;
    }

    public void setFosterPet(boolean fosterPet) {
        isFosterPet = fosterPet;
    }

    public Set<String> getTraits() {
        return traits;
    }

    public void setTraits(Set<String> traits) {
        this.traits = traits;
    }

    public Set<String> getPhotoIds() {
        return photoIds;
    }

    public void setPhotoIds(Set<String> photoIds) {
        this.photoIds = photoIds;
    }

    public Instant getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(Instant addedAt) {
        this.addedAt = addedAt;
    }

    public Instant getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(Instant lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }
}
