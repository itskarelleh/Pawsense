package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;

    public List<Pet> getAllPetsByUserId(String userId) {
        return petRepository.findPetsByUserId(userId);
    }

    //get all pet details

    public Pet addNewPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet findPetById(Long id) {
        return petRepository.findPetByPetId(id);
    }

    public Pet updatePetMood(Long petId, String mood){
        Pet pet = petRepository.findPetByPetId(petId);

        pet.setMood(mood);

        return petRepository.save(pet);
    }
    public Pet updatePetDetails(Pet pet) throws Exception {

        return petRepository.save(pet);
    }

    public void deletePet(Pet pet) {
        petRepository.delete(pet);
    }
    //upload pet photo and save to database

}
