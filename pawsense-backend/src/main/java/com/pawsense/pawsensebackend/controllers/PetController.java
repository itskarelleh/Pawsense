package com.pawsense.pawsensebackend.controllers;


import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @GetMapping("/current-user/{id}")
    public ResponseEntity<List<Pet>> getCurrentUserPets(@RequestParam String userId) throws Exception {
        List<Pet> res = petService.getAllPetsByUserId(userId);

        if(res.size() == 0) return (ResponseEntity<List<Pet>>) ResponseEntity.noContent();

        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/add")
    public ResponseEntity<Pet> addNewPetForCurrentUser(@RequestBody NewPetRequestBody newPetRequestBody) {

        Pet createdPet = new Pet(newPetRequestBody.getName(), newPetRequestBody.getType(), newPetRequestBody.getSex(), Instant.now(), newPetRequestBody.getUserId());
        petService.addNewPet(createdPet);

        return ResponseEntity.ok().body(createdPet);
    }
}
