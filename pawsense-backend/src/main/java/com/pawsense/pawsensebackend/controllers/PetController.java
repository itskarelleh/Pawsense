package com.pawsense.pawsensebackend.controllers;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.payload.request.PetStatsRequestBody;
import com.pawsense.pawsensebackend.payload.request.UpdatePetRequestBody;
import com.pawsense.pawsensebackend.payload.response.PetSummaryResponse;
import com.pawsense.pawsensebackend.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/pets")
public class PetController {

    @Autowired
    PetService petService;

    @GetMapping("/current-user/{userId}")
    public ResponseEntity<Set<PetSummaryResponse>> getCurrentUserPets(@PathVariable String userId) {
        try {
            Set<PetSummaryResponse> res = petService.getAllPetsByUserId(userId);
            return ResponseEntity.ok().body(res);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/profile/{petId}")
    public ResponseEntity<?> getPetProfile(@PathVariable String petId) {
        try {
            return ResponseEntity.ok().body(petService.findPetProfile(Long.parseLong(petId)));
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Pet> addNewPetForCurrentUser(@RequestBody NewPetRequestBody petRequestBody) {
        return ResponseEntity.ok().body(petService.addNewPet(petRequestBody));
    }

    @PutMapping("/update-pet/{petId}")
    public ResponseEntity<?> updatePet(@PathVariable String petId, @RequestBody UpdatePetRequestBody requestBody) {
        return ResponseEntity.ok().body(petService.updatePet(Long.parseLong(petId), requestBody));
    }

    @PutMapping("/update-stats/{petId}")
    public ResponseEntity<?> updatePetStats(@PathVariable String petId, @RequestBody PetStatsRequestBody requestBody) {
        return ResponseEntity.ok().body(petService.updatePetStats(Long.parseLong(petId), requestBody));
    }

    @DeleteMapping("/delete/{petId}")
    public ResponseEntity<?> removePetFromDB(@PathVariable String petId) {
        Pet foundPet = petService.findPetById(Long.valueOf(petId));

        if(foundPet == null) return ResponseEntity.notFound().build();

        petService.deletePet(foundPet);

        return ResponseEntity.ok("Pet has been removed");
    }
}
