package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.models.PetDetails;
import com.pawsense.pawsensebackend.repositories.PetDetailsRepository;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    //get all pet details

    public Pet addNewPet(Pet pet) {
        //create a new pet details object
//        PetDetails petDetails = new PetDetails();
//
//        //save pet to pet details
//        pet.getPetDetails().setPet(pet);
//
//
//        //save petdetails to pet
//        petDetails.getPet().setPetDetails(petDetails);
        //save pet


        return petRepository.save(pet);
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
