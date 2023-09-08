package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.PetStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface PetStatsRepository extends JpaRepository<PetStats, Long> {

    PetStats findBioById(Long id);

    @Query("SELECT PetStats p FROM PetStats p WHERE p.pet.id = :petId")
    PetStats findByPetId(Long petId);

}
