package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.models.PetDetails;
import com.pawsense.pawsensebackend.repositories.PetDetailsRepository;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;

    @Autowired
    PetDetailsRepository petDetailsRepository;

    public List<Pet> getAllPetsByUserId(String userId) {
        return petRepository.findPetsByUserId(userId);
    }

    @Transactional
    public Pet addNewPet(Pet pet) {
        // Create a new pet details object
        PetDetails petDetails = new PetDetails(0.00, "?", null, null, false, new HashSet<>(), new HashSet<>(), Instant.now(), Instant.now(), pet);

        pet.setPetDetails(petDetails);
        petDetails.setPet(pet);

        petDetailsRepository.save(petDetails);
        petRepository.save(pet);

        return pet;
    }

    public Pet findPetById(Long id) {
        return petRepository.findPetByPetId(id);
    }

    public PetDetails findPetDetails(Long id) {
        return petDetailsRepository.findByPetId(id);
    }

    public Pet updatePetDetails(Pet pet) throws Exception {
        return petRepository.save(pet);
    }

    public Pet updatePet(Pet pet) {
        return petRepository.save(pet);
    }

    public void deletePet(Pet pet) {
        petRepository.delete(pet);
    }
}
