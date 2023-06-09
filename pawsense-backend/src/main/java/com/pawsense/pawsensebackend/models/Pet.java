package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String sex;

    private double weight;

    private String size;

    private LocalDate birthDate;

    private LocalDate adoptionDate;

    private String avatar;

    private String userId;

    private String currentStatus;

    private Instant addedAt;

    private Instant lastUpdatedAt;


    public Pet() {

    }

    public Pet(String name, String type, String sex, double weight, LocalDate birthDate, String avatar, String userId, Instant addedAt, Instant lastUpdatedAt) {
        this.name = name;
        this.type = type;
        this.sex = sex;
        this.weight = weight;
        this.birthDate = birthDate;
        this.avatar = avatar;
        this.userId = userId;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public Pet(Long id, String name, String type, String sex, double weight, String size, LocalDate birthDate, LocalDate adoptionDate, String avatar, String userId, String currentStatus, Instant addedAt, Instant lastUpdatedAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.sex = sex;
        this.weight = weight;
        this.size = size;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.avatar = avatar;
        this.userId = userId;
        this.currentStatus = currentStatus;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
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

    public Instant getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(Instant lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public LocalDate getAdoptionDate() {
        return adoptionDate;
    }

    public void setAdoptionDate(LocalDate adoptionDate) {
        this.adoptionDate = adoptionDate;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Instant getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(Instant addedAt) {
        this.addedAt = addedAt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
