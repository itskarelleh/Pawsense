package com.pawsense.pawsensebackend.payload.request;

import java.time.Instant;
import java.util.Set;

public class EventRequestBody {

    private String title;

    private String description;

    private String type;

    private String startsAt;

    private String endsAt;

    private String userId;

//    private Set<Pet> attendees;
    private Set<Long> attendeesIds;

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

    public String getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(String startsAt) {
        this.startsAt = startsAt;
    }

    public String getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(String endsAt) {
        this.endsAt = endsAt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Set<Long> getAttendeesIds() {
        return attendeesIds;
    }

    public void setAttendeesIds(Set<Long> attendeesIds) {
        this.attendeesIds = attendeesIds;
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
