package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.Pet;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Set;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    @EntityGraph(value = "pet-with-related-data")
    Pet findPetById(Long id);

    Set<Pet> findPetsByUserId(String userId);

    @Query("SELECT p FROM Pet p WHERE p.id = :id")
    Pet findPetByPetId(Long id);

    @Query("SELECT p FROM Pet p LEFT JOIN FETCH p.petStats WHERE p.id = :id")
    Pet findPetWithPetBioById(@Param("id") Long id);

}
