package com.pawsense.pawsensebackend.payload.request;

import com.pawsense.pawsensebackend.models.Pet;

import java.time.Instant;
import java.time.LocalDate;

public class NewPetRequestBody {

    private String name;

    private String type;

    private String sex;

    private String avatar;

    private String userId;

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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String photo) {
        this.avatar = avatar;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
