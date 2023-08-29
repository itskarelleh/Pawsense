package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Note;
import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.NoteRequestBody;
import com.pawsense.pawsensebackend.payload.request.UpdateNoteRequestBody;
import com.pawsense.pawsensebackend.repositories.NoteRepository;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    PetRepository petRepository;


    public Note addNewNote(NoteRequestBody requestBody) {

        Pet pet = petRepository.findPetById(Long.parseLong(requestBody.getPetId()));

        if(pet == null) return null;

        Note note = new Note(requestBody.getTitle(), requestBody.getDetails(), requestBody.getUserId(), pet, LocalDateTime.now(), LocalDateTime.now());

        pet.addNote(note);
        petRepository.save(pet);

        return note;
    }

    public Note updateNote(UpdateNoteRequestBody requestBody) {
        Optional<Note> foundNote = noteRepository.findById(Long.parseLong(requestBody.getId()));

        if(foundNote.isEmpty()) return null;

        Note updatedNote = foundNote.get();

        updatedNote.setTitle(requestBody.getTitle());
        updatedNote.setDetails(requestBody.getDetails());
        updatedNote.setLastUpdated(LocalDateTime.now());

        return noteRepository.save(updatedNote);
    }

    public String deleteNote(Long noteId) throws Exception {
        Optional<Note> foundNote = noteRepository.findById(noteId);

        if(foundNote.isEmpty()) throw new Exception("Note cannot be deleted because it does not exist.");

        Note note = foundNote.get();

        noteRepository.delete(note);

        return "Note has been deleted";
    }
}
