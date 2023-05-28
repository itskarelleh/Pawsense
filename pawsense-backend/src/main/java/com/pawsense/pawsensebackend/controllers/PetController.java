package com.pawsense.pawsensebackend.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/v1/pets")
public class PetController {

    @GetMapping("/testing")
    public String testRequest() {
        return "Test was a success!";
    }


    //get all pets


    //get all pets by user id

    //get pet by id

    //get all pets by birthdate

    //get pet(s) by name

    //add new pet

    //update existing pet data

    //remove pet

    //archive


}
