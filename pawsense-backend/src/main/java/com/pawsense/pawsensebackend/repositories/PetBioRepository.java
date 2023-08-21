package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.PetBio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface PetBioRepository extends JpaRepository<PetBio, Long> {

    PetBio findBioById(Long id);

    @Query("SELECT PetBio p FROM PetBio p WHERE p.pet.id = :petId")
    PetBio findByPetId(Long petId);

}
