package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.models.PetBio;
import com.pawsense.pawsensebackend.payload.request.NewPetRequestBody;
import com.pawsense.pawsensebackend.payload.request.PetBioRequestBody;
import com.pawsense.pawsensebackend.payload.response.PetSummaryResponse;
import com.pawsense.pawsensebackend.repositories.EventRepository;
import com.pawsense.pawsensebackend.repositories.MedicationRepository;
import com.pawsense.pawsensebackend.repositories.PetBioRepository;
import com.pawsense.pawsensebackend.repositories.PetRepository;
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
    EventRepository eventRepository;

    @Autowired
    MedicationRepository medicationRepository;

    public List<PetSummaryResponse> getAllPetsByUserId(String userId) {
        List<Pet> pets = petRepository.findPetsByUserId(userId);

        List<PetSummaryResponse> response = new ArrayList<>();

        for (Pet pet : pets) {
            PetSummaryResponse responseSummary = new PetSummaryResponse(pet.getId(), pet.getName(), pet.getType(), pet.getSex(), pet.getAvatar(), pet.getUserId());
            response.add(responseSummary);
        }

        return response;
    }

    public Pet addNewPet(NewPetRequestBody petRequestBody) {

        Pet pet = new Pet(petRequestBody.getName(), petRequestBody.getType(), petRequestBody.getBreed(), petRequestBody.getColor(), petRequestBody.getSex(),
                petRequestBody.getAvatar(), petRequestBody.getUserId(), LocalDateTime.now(), LocalDateTime.now());

        petRepository.save(pet);

        // Create a new pet details object
        PetBio petBio = new PetBio(0.00, "?", "", null,
                null, false, new HashSet<>(),
                new HashSet<>(), LocalDateTime.now(), LocalDateTime.now(), pet);
        petBio.setPet(pet);

        petBioRepository.save(petBio);

        return pet;
    }

    public Pet findPetById(Long id) {
        return petRepository.findPetByPetId(id);
    }

    public PetBio findPetBio(Long id) {
        return petBioRepository.findByPetId(id);
    }

    public PetBio updatePetBio(Long petId, PetBioRequestBody requestBody) throws Exception {
        Pet pet = petRepository.findPetByPetId(petId);

        if(pet == null) return null;

        PetBio petBio = petBioRepository.findByPetId(pet.getId());

        if(pet.getPetBio() == null) {
            petBio = new PetBio();
            petBio.setAddedAt(LocalDateTime.now());
            petBio.setPet(pet);

            pet.setPetBio(petBio);
            petRepository.save(pet);
        }

        petBio.setWeight(requestBody.getWeight());
        petBio.setSize(requestBody.getSize());
        petBio.setBirthDate(requestBody.getBirthDate());
        petBio.setAdoptionDate(requestBody.getAdoptionDate());
        petBio.setFosterPet(requestBody.isFosterPet());
        petBio.setTraits(requestBody.getTraits());
        petBio.setPhotoIds(requestBody.getPhotoIds());
        petBio.setLastUpdatedAt(LocalDateTime.now());

        return petBioRepository.save(petBio);
    }

    public Pet updatePet(Pet pet) {
        return petRepository.save(pet);
    }

    public void deletePet(Pet pet) {
        petRepository.delete(pet);
    }
}
