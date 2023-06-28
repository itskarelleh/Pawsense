package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "pet_event")
public class PetEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;


    public PetEvent() {
    }

    public PetEvent(Long id, Pet pet, Event event) {
        this.id = id;
        this.pet = pet;
        this.event = event;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

}
