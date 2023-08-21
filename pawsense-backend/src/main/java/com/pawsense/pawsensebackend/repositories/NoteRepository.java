package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    @Query("SELECT n FROM Note n WHERE n.pet.id = :petId")
    Set<Note> findAllByPetId(@Param("petId") Long petId);
}
