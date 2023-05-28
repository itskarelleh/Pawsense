package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;
import org.apache.logging.log4j.CloseableThreadContext;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name="pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String type;

    private String sex;

    private LocalDate birthDate;

    private LocalDate adoptionDate;

    private String[] medications;

    private String currentStatus;

    private Instant addedAt;

    private String userId;

    public Pet(String id, String name, String type, String sex, Instant addedAt, String userId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.sex = sex;
        this.addedAt = addedAt;
        this.userId = userId;
    }

    public Pet(String id, String name, String type, String sex, LocalDate birthDate, LocalDate adoptionDate, String[] medications, String currentStatus, Instant addedAt, String userId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.sex = sex;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.medications = medications;
        this.currentStatus = currentStatus;
        this.addedAt = addedAt;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public LocalDate getAdoptionDate() {
        return adoptionDate;
    }

    public void setAdoptionDate(LocalDate adoptionDate) {
        this.adoptionDate = adoptionDate;
    }

    public String[] getMedications() {
        return medications;
    }

    public void setMedications(String[] medications) {
        this.medications = medications;
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
