package com.pawsense.pawsensebackend.controllers;

import com.pawsense.pawsensebackend.models.Medication;
import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.NewMedicationRequestBody;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import com.pawsense.pawsensebackend.services.MedicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/medications")
public class MedicationController {


    @Autowired
    MedicationService medicationService;

    @Autowired
    PetRepository petRepository;
    //TODO: get all medications for pets by current user

    //TODO: get all medications for pets by organization

    //TODO: get medication by id

    //TODO: get medications for pet by pet id

    @GetMapping("/all/{petId}")
    public ResponseEntity<Set<Medication>> getMedicationsForPet(Long petId) {
        return ResponseEntity.ok().body(medicationService.getAllMedicationsForPetById(petId));
    }

    //TODO: add a new mediation for a pet
    @PostMapping("/add")
    public ResponseEntity<Medication> addNewMedicationForPet(@RequestBody NewMedicationRequestBody medicationRequestBody) throws Exception {
        Pet pet = petRepository.findPetByPetId(Long.parseLong(medicationRequestBody.getPetId()));

        if(pet == null) throw new Exception("Could not add medication because that pet could not be found. Please try again");

        Medication medication = new Medication(medicationRequestBody.getName(), medicationRequestBody.getBrand(),
                medicationRequestBody.getInstructions(), pet, medicationRequestBody.getUserId(),
                Instant.now(), Instant.now());

        return ResponseEntity.ok().body(medicationService.addNewMedication(medication, pet));

    }

    //TODO: update medication for a pet

    //TODO: delete all medications for pets by current user

    //TODO: delete all medications for pets by organization

    //TODO: delete medication by id

    //TODO: delete all medications for pet by pet id
}
