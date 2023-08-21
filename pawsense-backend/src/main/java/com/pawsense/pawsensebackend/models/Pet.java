package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "pets")
@NamedEntityGraph(name = "pet-with-related-data",
    attributeNodes = {
        @NamedAttributeNode("petBio"),
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
    private PetBio petBio;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.MERGE, orphanRemoval = true)
    private Set<Medication> medications = new HashSet<>();

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "pet_event",
            joinColumns = @JoinColumn(name = "pet_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id"))
    private Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "pet", cascade = CascadeType.MERGE, orphanRemoval = true)
    private Set<Note> notes = new HashSet<>();

    @OneToMany(mappedBy = "pet", cascade = CascadeType.MERGE, orphanRemoval = true)
    Set<Mood> moods = new HashSet<>();

    public Pet() {

    }

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
               LocalDateTime addedAt, LocalDateTime lastUpdatedAt, PetBio petBio,
               Set<Medication> medications, Set<Event> events, Set<Note> notes, Set<Mood> moods) {
        this.name = name;
        this.type = type;
        this.sex = sex;
        this.avatar = avatar;
        this.userId = userId;
        this.addedAt = addedAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.petBio = petBio;
        this.medications = medications;
        this.events = events;
        this.notes = notes;
        this.moods = moods;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }

    public LocalDateTime getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public PetBio getPetBio() {
        return petBio;
    }

    public void setPetBio(PetBio petBio) {
        this.petBio = petBio;
    }

    public Set<Medication> getMedications() {
        return medications;
    }

    public void setMedications(Set<Medication> medications) {
        this.medications = medications;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<Note> getNotes() {
        return notes;
    }

    public void setNotes(Set<Note> notes) {
        this.notes = notes;
    }

    public Set<Mood> getMoods() {
        return moods;
    }

    public void setMoods(Set<Mood> moods) {
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
                ", petBio=" + petBio +
                ", medications=" + medications +
                ", events=" + events +
                ", notes=" + notes +
                ", moods=" + moods +
                '}';
    }
}
