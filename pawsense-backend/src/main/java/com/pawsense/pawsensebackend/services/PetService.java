package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.models.PetBio;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.payload.request.PetBioRequestBody;
import com.pawsense.pawsensebackend.payload.response.PetProfileResponse;
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
    PetBioRepository petBioRepository;

    @Autowired
    MedicationRepository medicationRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    NoteRepository noteRepository;

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

        if (pet.getPetBio() != null) pet.setPetBio(petBioRepository.findBioById(pet.getPetBio().getId()));

        return petRepository.findPetByPetId(id);
    }

    @Transactional
    public Pet findPetProfile(Long id) {

        return petRepository.findPetWithPetBioById(id);
    }

    @Transactional
    public Pet updatePetBio(Long petId, PetBioRequestBody requestBody) {
        Pet pet = petRepository.findPetByPetId(petId);

        if (pet == null) return null;

        PetBio petBio = new PetBio();

        if (pet.getPetBio() == null || petBio == null) {
            petBio = new PetBio(LocalDateTime.now(), LocalDateTime.now(), pet);
        } else {
            petBio = petBioRepository.findByPetId(pet.getId());
        }

        petBio.setWeight(requestBody.getWeight());
        petBio.setAbout(requestBody.getAbout());
        petBio.setSize(requestBody.getSize());
        petBio.setBirthDate(requestBody.getBirthDate());
        petBio.setAdoptionDate(requestBody.getAdoptionDate());
        petBio.setTraits(requestBody.getTraits());
        petBio.setLastUpdatedAt(LocalDateTime.now());

        pet.setPetBio(petBio);

        petBioRepository.save(petBio);

        return petRepository.save(pet);
    }

    public Pet updatePet(Pet pet) {
        return petRepository.save(pet);
    }

    public void deletePet(Pet pet) {
        petRepository.delete(pet);
    }
}
