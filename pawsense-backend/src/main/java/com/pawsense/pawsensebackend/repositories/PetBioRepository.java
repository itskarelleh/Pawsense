package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.PetBio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetBioRepository extends JpaRepository<PetBio, Long> {

    PetBio findByPetId(Long petId);

}
