package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;


    public List<Pet> getAllPetsByUserId(String userId) {
        return petRepository.findPetsByUserId(userId);
    }

    //get all pet details

    public void addNewPet(Pet pet) {
        petRepository.save(pet);
    }

    public Pet findPetById(Long id) {
        return petRepository.findPetByPetId(id);
    }

    public Pet updatePetDetails(Long id) {

        Pet foundPet = petRepository.findPetByPetId(id);

//        if(foundPet == null) {
//            ????
//        }
        return petRepository.save(foundPet);
    }
    //upload pet photo and save to database


}
