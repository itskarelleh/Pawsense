package com.pawsense.pawsensebackend.payload.response;

import java.time.LocalDate;

public class PetDetailsResponse {

    private Long id;

    private String name;

    private String type;

    private String sex;

    private LocalDate birthDate;

    private LocalDate adoptionDate;

    private double weight;

    private String size;

    private String userId;

    private String avatar;

    public PetDetailsResponse(Long id, String name, String type, String sex, LocalDate birthDate, LocalDate adoptionDate, double weight, String size, String userId, String avatar) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.sex = sex;
        this.birthDate = birthDate;
        this.adoptionDate = adoptionDate;
        this.weight = weight;
        this.size = size;
        this.userId = userId;
        this.avatar = avatar;
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

    public LocalDate getAdoptionDate() {
        return adoptionDate;
    }

    public void setAdoptionDate(LocalDate adoptionDate) {
        this.adoptionDate = adoptionDate;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
