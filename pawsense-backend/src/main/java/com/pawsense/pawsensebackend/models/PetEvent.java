package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pet_events")
@Getter
@Setter
@NoArgsConstructor
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

    public PetEvent(Long id, Pet pet, Event event) {
        this.id = id;
        this.pet = pet;
        this.event = event;
    }
}
