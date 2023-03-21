package com.example.SmartRetailAuthenticationService.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "UserProfile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "date_of_birth")
    private String date_of_birth;

    @Column(name = "gender")
    private String gender;

    @ManyToOne(optional = false, cascade = CascadeType.DETACH)
    @JoinColumn(name = "parent_user_id", nullable = false, referencedColumnName = "userId")
    private Customer parent_user; // foreign key from Customer



    //Manual No Args Constructor
    public UserProfile(){

    }



    //Constructor without The main id, as its self generating.
    public UserProfile(String name, String date_of_birth, String gender, Customer parent_user) {
        this.name = name;
        this.date_of_birth = date_of_birth;
        this.gender = gender;
        this.parent_user = parent_user;
    }


}
