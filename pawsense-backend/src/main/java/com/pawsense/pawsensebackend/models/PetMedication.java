package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pet_medications")
@Getter
@Setter
@NoArgsConstructor
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

    public PetMedication(Long id, Pet pet, Medication medication) {
        this.id = id;
        this.pet = pet;
        this.medication = medication;
    }
}
