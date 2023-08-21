package com.pawsense.pawsensebackend.services;


import com.pawsense.pawsensebackend.models.Medication;
import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.repositories.MedicationRepository;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MedicationService {

    @Autowired
    MedicationRepository medicationRepository;

    @Autowired
    PetRepository petRepository;

    public Set<Medication> getMedicationsCreatedByUser(String userId) {
        return medicationRepository.findAllByUserId(userId);
    }

    public Set<Medication> getAllMedicationsForPetById(Long petId) {
        return medicationRepository.findAllByPetId(petId);
    }

    public Medication addNewMedication(Medication medication, Pet pet) {

        pet.getMedications().add(medication);
        petRepository.save(pet);

        return medicationRepository.save(medication);
    }

    public Medication updateMedication(Medication medication) {
        return medicationRepository.save(medication);
    }

    public Optional<Medication> getMedication(Long id) {

        return medicationRepository.findById(id);
    }

//    public void deleteMedication(Long id) throws Exception {
//        Optional<Medication> medication = medicationRepository.findById(id);
//
//        if(medication.isEmpty()) throw new Exception("Medication could not be deleted because it does not exist");
//
//        medicationRepository.deleteMedication((Optional<Medication>) medication);
//
//        if(medicationRepository.findById(id) != null) throw new Exception("Medication was not able to be deleted.");
//
//    }

}
