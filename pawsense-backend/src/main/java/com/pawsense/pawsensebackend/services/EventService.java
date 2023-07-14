package com.pawsense.pawsensebackend.services;

import com.pawsense.pawsensebackend.models.Event;
import com.pawsense.pawsensebackend.models.Pet;
import com.pawsense.pawsensebackend.payload.request.EventRequestBody;
import com.pawsense.pawsensebackend.repositories.EventRepository;
import com.pawsense.pawsensebackend.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PetRepository petRepository;

//    public List<Event> getPetEventsByUserId(String userId) {
//        return eventRepository.findAllByUserId(userId);
//    }

    public Set<Event> getEventsByPetId(Long petId) {
        Pet pet = petRepository.findPetByPetId(petId);

        return pet.getEvents();
    }

    public Optional<Event> getEvent(Long eventId) {
        return eventRepository.findById(eventId);
    }

    public Event createNewEvent(EventRequestBody requestBody){

        Set<Long> attendeesIds = requestBody.getAttendeesIds();

        Event event = new Event(requestBody.getTitle(), requestBody.getDescription(), requestBody.getType(),
                requestBody.getStartsAt(), requestBody.getEndsAt(), new HashSet<>(), requestBody.getUserId(),
                requestBody.isPublic(), Instant.now(), Instant.now()
        );

        attendeesIds.forEach((Long id) -> {

            Pet pet = petRepository.findPetByPetId(id);

            pet.getEvents().add(event);

            event.getAttendees().add(pet);

            petRepository.save(pet);
        });

        return eventRepository.save(event);
    }

//    public Event toggleEventPublicity(Event event) {
//        boolean toggle = !event.isPublic();
//        event.setPublic(toggle);
//
//        return eventRepository.save(event);
//    }

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
