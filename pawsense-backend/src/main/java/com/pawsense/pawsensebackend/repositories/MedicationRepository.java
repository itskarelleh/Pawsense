package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface MedicationRepository extends JpaRepository<Medication, Long> {

//    Optional<Medication> delete(Optional<Medication> medication);
    Optional<Medication> findById(Long id);
    @Query("DELETE FROM Medication m WHERE m = :medication")
    void deleteMedication(@Param("medication") Optional<Medication> medication);

    @Query("SELECT m FROM Medication m WHERE m.pet.id = :petId")
    Set<Medication> findAllByPetId(@Param("petId") Long petId);
}
