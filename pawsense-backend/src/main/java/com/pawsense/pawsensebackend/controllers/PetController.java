package com.pawsense.pawsensebackend.controllers;


import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.payload.request.PetMoodRequest;
import com.pawsense.pawsensebackend.payload.response.PetDetailsResponse;
import com.pawsense.pawsensebackend.services.PetService;
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

        if(res.size() == 0) return (ResponseEntity<List<Pet>>) ResponseEntity.noContent();

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/{petId}")
    public ResponseEntity<PetDetailsResponse> getPetDetailsById(@PathVariable String petId) {
        Pet foundPet = petService.findPetById(Long.parseLong(petId));

        return ResponseEntity.ok().body(new PetDetailsResponse(foundPet.getId(), foundPet.getName(), foundPet.getType(), foundPet.getSex(), foundPet.getBirthDate(), foundPet.getAdoptionDate(), foundPet.getWeight(), foundPet.getSize(), foundPet.getUserId(), foundPet.getAvatar()));
    }

    @PostMapping("/add")
    public ResponseEntity<Pet> addNewPetForCurrentUser(@RequestBody NewPetRequestBody newPetRequestBody) {
        Pet createdPet = new Pet(newPetRequestBody.getName(), newPetRequestBody.getType(), newPetRequestBody.getSex(), newPetRequestBody.getAvatar(), newPetRequestBody.getUserId(), Instant.now(), Instant.now());

        petService.addNewPet(createdPet);

        return new ResponseEntity<>(createdPet, HttpStatus.CREATED);
    }

    @PutMapping("/update-mood/{petId}")
    public ResponseEntity<Pet> updatePetMood(@PathVariable String petId, @RequestBody PetMoodRequest petMood) {
        Pet pet = petService.updatePetMood(Long.parseLong(petId), petMood.getMood());

        if(pet != null) {
            return new ResponseEntity<>(pet, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

//    @PutMapping("/edit/${petId}")
//    public ResponseEntity<Pet> editExisitingPet(@PathVariable String petId, @RequestBody Pet pet) throws Exception {
//        Pet foundPet = petService.findPetById(Long.valueOf(petId));
//
//        if(foundPet == null) return ResponseEntity.notFound().build();
//
//        Pet updated = petService.updatePetDetails(foundPet);
//
//        return ResponseEntity.ok().body(updated);
//    }
}
