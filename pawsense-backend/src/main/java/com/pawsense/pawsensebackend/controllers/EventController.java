package com.pawsense.pawsensebackend.controllers;

import com.pawsense.pawsensebackend.models.Event;
import com.pawsense.pawsensebackend.payload.request.EventRequestBody;
import com.pawsense.pawsensebackend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Set;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/events")
public class EventController {

    @Autowired
    EventService eventService;

//    @GetMapping("/current-user/{userId}")
//    public ResponseEntity<?> getAllPetEventsForCurrentUser(@PathVariable String userId) {
//        return ResponseEntity.ok().body(eventService.getPetEventsByUserId(userId));
//    }

    @GetMapping("/pet/{petId}")
    public ResponseEntity<Set<Event>> getAllPetEventsForPet(@PathVariable String petId) {
        return ResponseEntity.ok().body(eventService.getEventsByPetId(Long.parseLong(petId)));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<Optional<Event>> getEvent(@PathVariable String eventId) {
            return ResponseEntity.ok().body(eventService.getEvent(Long.parseLong(eventId)));
    }

    @PostMapping("/new")
    public ResponseEntity<Event> postNewEvent(@RequestBody EventRequestBody eventRequestBody) {
        return ResponseEntity.ok().body(eventService.createNewEvent(eventRequestBody));
    }

//    @PostMapping("/archive/{eventId}")
//    public ResponseEntity<Event> archiveEvent(@PathVariable String eventId) {
//
//    }

//    @PutMapping("/update/{eventId}")
//    public ResponseEntity<Event> updateEvent(@RequestBody EventRequestBody eventRequestBody, @PathVariable String eventId) {
//        Optional<Event> event = eventService.getEventByEventId(Long.parseLong(eventId));
//
//        return ResponseEntity.ok().body(eventService.updateEventDetails(event));
//    }

//    @DeleteMapping("/delete/{eventId}")
//    public ResponseEntity<?> deleteEvent(@PathVariable String eventId) {
//        Optional<Event> event = eventService.getEventByEventId(Long.parseLong(eventId));
//
//        if(event == null) return ResponseEntity.notFound().build();
//
//        eventService.deleteEventById(Long.parseLong(eventId));
//
//        return ResponseEntity.ok("Event has been deleted");
//    }
}
