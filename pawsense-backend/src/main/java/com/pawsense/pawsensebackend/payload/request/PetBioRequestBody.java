package com.pawsense.pawsensebackend.payload.request;

import java.time.LocalDate;
import java.util.Set;

public class PetBioRequestBody {

    private double weight;

    private String size;

    private String about;
    private LocalDate birthDate;

    private LocalDate adoptionDate;

    private boolean isFosterPet;

    private Set<String> traits;

    private Set<String> photoIds;

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
}
