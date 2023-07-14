<<<<<<< HEAD
package com.pawsense.pawsensebackend.models;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private String type;

    private LocalDate startsAt;

    private LocalDate endsAt;

    @ManyToMany(mappedBy = "events")
    private Set<Pet> attendees = new HashSet<>();

    private String userId;

    private boolean isPublic;

    private Instant createdAt;

    private  Instant lastModifiedAt;

    public Event() {

    }

    public Event(String title, String description, String type, LocalDate startsAt, LocalDate endsAt, Set<Pet> attendees, String userId, boolean isPublic, Instant createdAt, Instant lastModifiedAt) {
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

    public Event(Long id, String title, String description, String type, LocalDate startsAt, LocalDate endsAt, Set<Pet> attendees, String userId, boolean isPublic, Instant createdAt, Instant lastModifiedAt) {
        this.id = id;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(LocalDate startsAt) {
        this.startsAt = startsAt;
    }

    public LocalDate getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(LocalDate endsAt) {
        this.endsAt = endsAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastModifiedAt() {
        return lastModifiedAt;
    }

    public void setLastModifiedAt(Instant lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }
=======
package com.pawsense.pawsensebackend.models;public class Event {
>>>>>>> cd4994410045b91ab88b90744ee7aae9bde1022d
}