package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

public class PetService {

    @Autowired
    PetRepository petRepository;


    public List<Pet> getAllPetsByUserId(String userId) {
        return petRepository.findPetsByUserId(userId);
    }

    //get all pet details


    //upload pet photo and save to database


}
