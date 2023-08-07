package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MedicationRepository extends JpaRepository<Medication, Long> {

//    Optional<Medication> delete(Optional<Medication> medication);
    Optional<Medication> findById(Long id);
    @Query("SELECT m FROM Medication m WHERE m.pet.id = :petId")
    List<Medication> findAllByPetId(@Param("petId") Long petId);

    @Query("SELECT m FROM Medication m WHERE m.createdBy = :userId")
    List<Medication> findAllByUserId(@Param("userId") String userId);
}
