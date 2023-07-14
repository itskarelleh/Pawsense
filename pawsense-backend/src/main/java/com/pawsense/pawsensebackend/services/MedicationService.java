package com.pawsense.pawsensebackend.services;


import com.pawsense.pawsensebackend.models.Medication;
import com.pawsense.pawsensebackend.repositories.MedicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.Optional;

public class MedicationService {

    @Autowired
    MedicationRepository medicationRepository;

    public Medication addNewMedication(Medication medication) {
        return medicationRepository.save(medication);
    }

    public Medication updateMedication(Medication medication) {
        return medicationRepository.save(medication);
    }

    public Optional<Medication> getMedication(Long id) {

        return medicationRepository.findById(id);
    }

    public void deleteMedication(Long id) throws Exception {
        Optional<Medication> medication = medicationRepository.findById(id);

        if(medication.isEmpty()) throw new Exception("Medication could not be deleted because it does not exist");

        medicationRepository.deleteMedication((Optional<Medication>) medication);

        if(medicationRepository.findById(id) != null) throw new Exception("Medication was not able to be deleted.");

    }

}
