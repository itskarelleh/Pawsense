package com.pawsense.pawsensebackend.payload.response;

import com.pawsense.pawsensebackend.models.*;

import java.time.LocalDate;
import java.util.Set;

public class PetProfileResponse {
   private Pet pet;

   private PetBio petBio;

   public PetProfileResponse(Pet pet, PetBio petBio) {
       this.pet = pet;
       this.petBio = petBio;
   }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public PetBio getPetBio() {
        return petBio;
    }

    public void setPetBio(PetBio petBio) {
        this.petBio = petBio;
    }
}
