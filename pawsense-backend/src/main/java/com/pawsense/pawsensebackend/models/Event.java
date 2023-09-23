package com.pawsense.pawsensebackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name="startsAt", columnDefinition = "timestamp", nullable = false)
    private LocalDateTime startsAt;

    @Column(name="endsAt", columnDefinition = "timestamp")
    private LocalDateTime endsAt;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    @JsonBackReference
    private Pet pet;

    @Column(name="user_id", nullable = false)
    private String userId;

    @Column(columnDefinition = "timestamp with time zone")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "timestamp with time zone")
    private  LocalDateTime lastModifiedAt;

    public Event(String title, String description, String type, LocalDateTime startsAt, Pet pet, String userId, LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.startsAt = startsAt;
        this.pet = pet;
        this.userId = userId;
        this.createdAt = createdAt;
        this.lastModifiedAt = lastModifiedAt;
    }

}
