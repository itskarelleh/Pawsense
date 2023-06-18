package com.pawsense.pawsensebackend.payload.request;

public class PetMoodRequest {

    private String mood;

    public PetMoodRequest(String mood) {
        this.mood = mood;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }
}
