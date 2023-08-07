package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "pet_medications")
public class PetMedication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "medication_id")
    private Medication medication;

    public PetMedication() {

    }
    public PetMedication(Long id, Pet pet, Medication medication) {
        this.id = id;
        this.pet = pet;
        this.medication = medication;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public Medication getMedication() {
        return medication;
    }

    public void setMedication(Medication medication) {
        this.medication = medication;
    }
}
