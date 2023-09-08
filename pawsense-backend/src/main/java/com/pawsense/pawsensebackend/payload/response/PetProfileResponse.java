package com.pawsense.pawsensebackend.payload.response;

import com.pawsense.pawsensebackend.models.*;

public class PetProfileResponse {
   private Pet pet;

   private PetStats petStats;

   public PetProfileResponse(Pet pet, PetStats petStats) {
       this.pet = pet;
       this.petStats = petStats;
   }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public PetStats getPetBio() {
        return petStats;
    }

    public void setPetBio(PetStats petStats) {
        this.petStats = petStats;
    }
}
