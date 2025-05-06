package com.crud.operations.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

//@Data
@Entity
@Getter
@Setter
@Table(name = "person")
public class Person {
    @Id
    private long id;
    private String name;
}
