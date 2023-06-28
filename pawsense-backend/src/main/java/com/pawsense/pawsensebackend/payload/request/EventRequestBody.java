package com.pawsense.pawsensebackend.payload.request;

import com.pawsense.pawsensebackend.models.Pet;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

public class EventRequestBody {

    private String title;

    private String description;

    private String type;

    private LocalDate startsAt;

    private LocalDate endsAt;


    private String userId;

    private Set<Pet> attendees;

    private boolean isPublic;

    private final Instant createdAt = Instant.now();

    private final Instant lastModifiedAt = Instant.now();

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Set<Pet> getAttendees() {
        return attendees;
    }

    public void setAttendees(Set<Pet> attendees) {
        this.attendees = attendees;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getLastModifiedAt() {
        return lastModifiedAt;
    }
}
