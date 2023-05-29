package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalTime;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, String> {


    public List<Pet> findPetsByUserId(String userId);

    @Query("SELECT p FROM Pet p WHERE p.id = :id")
    public String findPetByPetId(String id);

}
