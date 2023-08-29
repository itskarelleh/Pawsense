package com.pawsense.pawsensebackend.controllers;

import com.pawsense.pawsensebackend.models.Note;
import com.pawsense.pawsensebackend.payload.request.NoteRequestBody;
import com.pawsense.pawsensebackend.payload.request.UpdateNoteRequestBody;
import com.pawsense.pawsensebackend.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/notes")
public class NoteController {

    @Autowired
    NoteService noteService;

    @PostMapping("/add")
    public ResponseEntity<Note> createNewNoteForPet(@RequestBody NoteRequestBody requestBody) {
        return ResponseEntity.ok().body(noteService.addNewNote(requestBody));
    }

    @PutMapping("/update/{noteId}")
    public ResponseEntity<Note> updateExisitingNote(@RequestBody UpdateNoteRequestBody requestBody) {
        return ResponseEntity.ok().body(noteService.updateNote(requestBody));
    }

}
