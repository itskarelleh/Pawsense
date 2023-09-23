package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "pets")
@Getter @Setter @NoArgsConstructor
@NamedEntityGraph(name = "pet-with-related-data",
    attributeNodes = {
        @NamedAttributeNode("petStats"),
        @NamedAttributeNode("medications"),
        @NamedAttributeNode("events"),
        @NamedAttributeNode("notes"),
        @NamedAttributeNode("moods")
})
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;
    @Column(name = "breed")
    private String breed;

    @Column(name = "color")
    private String color;

    @Column(name = "sex")
    private String sex;

    @Column(name = "avatar")
    private String avatar;


    @Column(name = "addedAt", columnDefinition = "timestamp with time zone")
    private LocalDateTime addedAt;

    @Column(name = "lastUpdatedAt", columnDefinition = "timestamp with time zone")
    private LocalDateTime lastUpdatedAt;

    private String userId;

    @OneToOne(
            mappedBy = "pet",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @JsonManagedReference
    private PetStats petStats;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.MERGE, orphanRemoval = true)
    @JsonManagedReference
    private Set<Medication> medications = new HashSet<>();

    @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @JsonManagedReference
    private Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "pet", cascade = CascadeType.MERGE, orphanRemoval = true)
    private Set<Note> notes = new HashSet<>();

    @OneToMany(mappedBy = "pet", cascade = CascadeType.MERGE, orphanRemoval = true)
    Set<Mood> moods = new HashSet<>();

    public Pet(String name, String type, String breed, String color, String sex, String avatar, String userId, LocalDateTime addedAt, LocalDateTime lastUpdatedAt) {
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.color = color;
        this.sex = sex;
        this.avatar = avatar;
        this.userId = userId;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public Pet(String name, String type, String sex, String avatar, String userId,
               LocalDateTime addedAt, LocalDateTime lastUpdatedAt, PetStats petStats,
               Set<Medication> medications, Set<Event> events, Set<Note> notes, Set<Mood> moods) {
        this.name = name;
        this.type = type;
        this.sex = sex;
        this.avatar = avatar;
        this.userId = userId;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.petStats = petStats;
        this.medications = medications;
        this.events = events;
        this.notes = notes;
        this.moods = moods;
    }

    public void addMedication(Medication medication) {
        medications.add(medication);
        medication.setPet(this);
    }

    // Convenience method to remove a medication from the pet
    public void removeMedication(Medication medication) {
        medications.remove(medication);
        medication.setPet(null);
    }

    // Convenience method to add an event to the pet
    public void addEvent(Event event) {
        events.add(event);
    }

    // Convenience method to remove an event from the pet
    public void removeEvent(Event event) {
        events.remove(event);
    }

    public void addNote(Note note) {
        notes.add(note);
    }

    // Convenience method to remove an event from the pet
    public void removeNote(Note note) {
        notes.remove(note);
    }


    public void addMood(Mood mood) {
        moods.add(mood);
        mood.setPet(this);
    }

    public void removeMedication(Mood mood) {
        moods.remove(mood);
        mood.setPet(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pet pet = (Pet) o;
        return Objects.equals(id, pet.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", breed='" + breed + '\'' +
                ", color='" + color + '\'' +
                ", sex='" + sex + '\'' +
                ", avatar='" + avatar + '\'' +
                ", addedAt=" + addedAt +
                ", lastUpdatedAt=" + lastUpdatedAt +
                ", userId='" + userId + '\'' +
                ", petStats=" + petStats +
                ", medications=" + medications +
                ", events=" + events +
                ", notes=" + notes +
                ", moods=" + moods +
                '}';
    }
}
