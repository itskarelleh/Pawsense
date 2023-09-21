package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.models.PetStats;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.payload.request.PetStatsRequestBody;
import com.pawsense.pawsensebackend.payload.request.UpdatePetRequestBody;
import com.pawsense.pawsensebackend.payload.response.PetSummaryResponse;
import com.pawsense.pawsensebackend.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;

    @Autowired
    PetStatsRepository petStatsRepository;

    public Set<PetSummaryResponse> getAllPetsByUserId(String userId) {
        Set<Pet> pets = petRepository.findPetsByUserId(userId);

        Set<PetSummaryResponse> petSummaries = new HashSet<>();

        for (Pet pet : pets) {
            PetSummaryResponse responseSummary = new PetSummaryResponse(pet.getId(), pet.getName(), pet.getType(), pet.getSex(), pet.getAvatar(), pet.getUserId());
            petSummaries.add(responseSummary);
        }

        return petSummaries;
    }

    public Pet addNewPet(NewPetRequestBody petRequestBody) {
        Pet pet = new Pet(petRequestBody.getName(), petRequestBody.getType(), petRequestBody.getBreed(), petRequestBody.getColor(), petRequestBody.getSex(),
                petRequestBody.getAvatar(), petRequestBody.getUserId(), LocalDateTime.now(), LocalDateTime.now());

        petRepository.save(pet);

        return pet;
    }

    public Pet findPetById(Long id) {

        Pet pet = petRepository.findPetByPetId(id);

        if (pet.getPetStats() != null) pet.setPetStats(petStatsRepository.findBioById(pet.getPetStats().getId()));

        return petRepository.findPetByPetId(id);
    }

    @Transactional
    public Pet findPetProfile(Long id) {

        return petRepository.findPetWithPetBioById(id);
    }

    public Pet updatePet(Long petId, UpdatePetRequestBody requestBody) {
        Pet pet = findPetById(petId);

        if(pet == null) return null;

        pet.setName(requestBody.getName());
        pet.setType(requestBody.getType());
        pet.setAvatar(requestBody.getAvatar());
        pet.setBreed(requestBody.getBreed());
        pet.setColor(requestBody.getColor());
        pet.setSex(requestBody.getSex());

        return petRepository.save(pet);
    }

    @Transactional
    public Pet updatePetStats(Long petId, PetStatsRequestBody requestBody) {
        Pet pet = petRepository.findPetByPetId(petId);

        if (pet == null) return null;

        PetStats petStats = new PetStats();

        if (pet.getPetStats() == null) {
            petStats = new PetStats(LocalDateTime.now(), LocalDateTime.now(), pet);
        } else {
            petStats = petStatsRepository.findByPetId(pet.getId());
        }

        petStats.setWeight(requestBody.getWeight());
        petStats.setSize(requestBody.getSize());
        petStats.setBirthDate(requestBody.getBirthDate());
        petStats.setAdoptionDate(requestBody.getAdoptionDate());
        petStats.setLastUpdatedAt(LocalDateTime.now());

        pet.setPetStats(petStats);
        petStatsRepository.save(petStats);

        return petRepository.save(pet);
    }

    public Pet updatePet(Pet pet) {
        return petRepository.save(pet);
    }

    public void deletePet(Pet pet) {
        petRepository.delete(pet);
    }
}
