package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.PetDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PetDetailsRepository extends JpaRepository<PetDetails, Long> {

    PetDetails findByPetId(Long petId);

}
