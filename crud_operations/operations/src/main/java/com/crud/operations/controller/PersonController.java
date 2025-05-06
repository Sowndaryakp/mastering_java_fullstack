package com.crud.operations.controller;

import com.crud.operations.model.Person;
import com.crud.operations.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    @Autowired
    PersonRepository repo;

    @PostMapping("/addPerson")
    public void addPerson(@RequestBody Person person){
        repo.save(person);
    }
}
