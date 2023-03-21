package com.example.SmartRetailUserManagement.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
//@Table(name="user")
public class Customer {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Integer userId;

    private String name;
    private String email;
    private String phoneNumber;
    private String password;

    public Customer(Integer userId, String name, String email, String phoneNumber, String password) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}
