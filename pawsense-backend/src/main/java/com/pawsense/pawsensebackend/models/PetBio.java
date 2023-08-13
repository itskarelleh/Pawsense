package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pet_bios")
public class PetBio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double weight;

    @Column(name = "about", length = 4000)
    private String about;

    private String size;

    private LocalDate birthDate;

    private LocalDate adoptionDate;

    private boolean isFosterPet;

    @ElementCollection // Use ElementCollection for collections
    private Set<String> traits = new HashSet<>();

    @ElementCollection // Use ElementCollection for collections
    private Set<String> photoIds = new HashSet<>();

    @Column(nullable = false)
    private LocalDateTime addedAt;

    @Column(nullable = false)
    private LocalDateTime lastUpdatedAt;

    @OneToOne(mappedBy = "petBio")
    private Pet pet;

    public PetBio() { }

    public PetBio(double weight, String size, String about, LocalDate birthDate, LocalDate adoptionDate,
                  boolean isFosterPet, Set<String> traits, Set<String> photoIds,
                  LocalDateTime addedAt, LocalDateTime lastUpdatedAt, Pet pet) {
        this.weight = weight;
        this.size = size;
        this.about = about;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.isFosterPet = isFosterPet;
        this.traits = traits;
        this.photoIds = photoIds;
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
}
