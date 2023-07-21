package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    public List<Pet> findPetsByUserId(String userId);

    @Query("SELECT p FROM Pet p WHERE p.id = :id")
    public Pet findPetByPetId(Long id);

}
