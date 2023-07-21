package com.pawsense.pawsensebackend.controllers;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.models.PetDetails;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.services.PetService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/pets")
public class PetController {

    @Autowired
    PetService petService;
    //get all pets

    @GetMapping("/current-user/{userId}")
    public ResponseEntity<List<Pet>> getCurrentUserPets(@PathVariable String userId) {
        List<Pet> res = petService.getAllPetsByUserId(userId);

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/{petId}")
    public ResponseEntity<Pet> getPetById(@PathVariable String petId) {
        Pet pet = petService.findPetById(Long.parseLong(petId));

        return ResponseEntity.ok().body(pet);
    }

    @GetMapping("/details/{petId}")
    public ResponseEntity<PetDetails> getPetDetailsById(@PathVariable String petId) {
        PetDetails petDetails = petService.findPetDetails(Long.parseLong(petId));

        return ResponseEntity.ok().body(petDetails);
    }

    @PostMapping("/add")
    public ResponseEntity<Pet> addNewPetForCurrentUser(@RequestBody NewPetRequestBody petRequestBody) {
        Pet pet = new Pet(petRequestBody.getName(), petRequestBody.getType(), petRequestBody.getSex(),
                petRequestBody.getAvatar(), petRequestBody.getUserId(), Instant.now(), Instant.now());

        return ResponseEntity.ok().body(petService.addNewPet(pet));
    }

    @PutMapping("/edit/{petId}")
    public ResponseEntity<Pet> editExistingPet(@PathVariable String petId, @RequestBody Pet pet) throws Exception {
        Pet foundPet = petService.findPetById(Long.valueOf(petId));

        if(foundPet == null) return ResponseEntity.notFound().build();

        Pet updated = petService.updatePetDetails(foundPet);

        return ResponseEntity.ok().body(updated);
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
