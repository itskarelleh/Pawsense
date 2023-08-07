package com.pawsense.pawsensebackend.controllers;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.models.PetBio;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.payload.request.PetBioRequestBody;
import com.pawsense.pawsensebackend.payload.response.PetSummaryResponse;
import com.pawsense.pawsensebackend.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/pets")
public class PetController {

    @Autowired
    PetService petService;

    @GetMapping("/current-user/{userId}")
    public ResponseEntity<List<PetSummaryResponse>> getCurrentUserPets(@PathVariable String userId) {
        try {
            List<PetSummaryResponse> res = petService.getAllPetsByUserId(userId);
            return ResponseEntity.ok().body(res);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{petId}")
    public ResponseEntity<Pet> getPetProfileById(@PathVariable String petId) {
        try {
            Pet pet = petService.findPetById(Long.parseLong(petId));
            return ResponseEntity.ok().body(pet);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Pet> addNewPetForCurrentUser(@RequestBody NewPetRequestBody petRequestBody) {
        return ResponseEntity.ok().body(petService.addNewPet(petRequestBody));
    }

    @PutMapping("/update-bio/{petId}")
    public ResponseEntity<?> updatePetBio(@PathVariable String petId, @RequestBody PetBioRequestBody petBioRequestBody) {

        try {
            PetBio petBio = petService.updatePetBio(Long.parseLong(petId), petBioRequestBody);
            return ResponseEntity.ok().body(petBio);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/edit/avatar/{petId}")
    public ResponseEntity<?> updatePetAvatar(@PathVariable String petId, @RequestBody String avatarId) throws Exception {

        Pet foundPet = petService.findPetById(Long.parseLong(petId));

        foundPet.setAvatar(avatarId);

        return ResponseEntity.ok().body(petService.updatePet(foundPet));
    }

    @DeleteMapping("/delete/{petId}")
    public ResponseEntity<?> removePetFromDB(@PathVariable String petId) {
        Pet foundPet = petService.findPetById(Long.valueOf(petId));

        if(foundPet == null) return ResponseEntity.notFound().build();

        petService.deletePet(foundPet);

        return ResponseEntity.ok("Pet has been removed");
    }
}
