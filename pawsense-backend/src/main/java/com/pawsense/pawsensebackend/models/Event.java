package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private String type;

    @Column(name="startsAt", columnDefinition = "timestamp")
    private LocalDateTime startsAt;
    @Column(name="endsAt", columnDefinition = "timestamp")
    private LocalDateTime endsAt;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "pet_event",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "pet_id"))
    private Set<Pet> attendees = new HashSet<>();

    @Column(name="user_id")
    private String userId;

    @Column(name = "is_public")
    private boolean isPublic;

    @Column(columnDefinition = "timestamp with time zone")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "timestamp with time zone")
    private  LocalDateTime lastModifiedAt;

    public Event() { }

    public Event(String title, String description, String type, LocalDateTime startsAt, LocalDateTime endsAt, Set<Pet> attendees, String userId, boolean isPublic, LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.attendees = attendees;
        this.userId = userId;
        this.isPublic = isPublic;
        this.createdAt = createdAt;
        this.lastModifiedAt = lastModifiedAt;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(LocalDateTime startsAt) {
        this.startsAt = startsAt;
    }

    public LocalDateTime getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(LocalDateTime endsAt) {
        this.endsAt = endsAt;
    }

    public Set<Pet> getAttendees() {
        return attendees;
    }

    public void setAttendees(Set<Pet> attendees) {
        this.attendees = attendees;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastModifiedAt() {
        return lastModifiedAt;
    }

    public void setLastModifiedAt(LocalDateTime lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }

    // Helper method to add a pet to the attendees collection
    public void addAttendee(Pet pet) {
        attendees.add(pet);
        pet.getEvents().add(this);
    }

    // Helper method to remove a pet from the attendees collection
    public void removeAttendee(Pet pet) {
        attendees.remove(pet);
        pet.getEvents().remove(this);
    }
}
