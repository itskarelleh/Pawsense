package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Event;
import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.EventRequestBody;
import com.pawsense.pawsensebackend.repositories.EventRepository;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PetRepository petRepository;


    public Set<Event> getEventsByPetId(Long petId) {

        return eventRepository.findAllByPetId(petId);
    }

    public Set<Event> getEventsCreatedByUser(String userId) {
        return eventRepository.findAllByUserId(userId);
    }

    public Optional<Event> getEvent(Long eventId) {
        return eventRepository.findById(eventId);
    }

    public Event createNewEvent(EventRequestBody requestBody) {

        Pet pet = petRepository.findPetById(requestBody.getPetId());

        if(pet == null) return null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm");

        Event event = new Event(
                requestBody.getTitle(),
                requestBody.getDescription(),
                requestBody.getType(),
                LocalDateTime.parse(requestBody.getStartsAt(), formatter),
                pet, requestBody.getUserId(),
                LocalDateTime.now(), LocalDateTime.now()
        );

        if(requestBody.getEndsAt().length() > 0) {
            event.setEndsAt(LocalDateTime.parse(requestBody.getEndsAt(), formatter));
        }

        pet.addEvent(event);
        petRepository.save(pet);

        return eventRepository.save(event);
    }


    //used for adding event to pet and attendees to event

//    public Event updateEventDetails(Event event) {
//        return eventRepository.save(event);
//    }

//    public void deleteEventById(Long eventId) {
//        eventRepository.deleteById(eventId);
//    }
//
//    public void deleteAllEventsForPet(Long petId) {
//        eventRepository.deleteAllByPetId(petId);
//    }

    //helpers

//    private Event addEventToPet(Long petId, Long eventId) throws ChangeSetPersister.NotFoundException {
//        Pet pet = petRepository.findById(petId).orElseThrow(ChangeSetPersister.NotFoundException::new);
//        Event event = eventRepository.findById(eventId).orElseThrow(ChangeSetPersister.NotFoundException::new);
//
//        pet.getEvents().add(event);
//        event.getAttendees().add(pet);
//
//        petRepository.save(pet);
//        eventRepository.save(event);
//
//        return event;
//    }

}
