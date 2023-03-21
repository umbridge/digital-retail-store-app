package com.example.SmartRetailUserManagement.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "UserMeasurement")
public class UserMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "profile_id", nullable = false, referencedColumnName = "id")
    private UserProfile profile_id; // foreign key from All profiles


    @Column(name = "height")
    private double height;

    @Column(name = "height_param")
    private String height_param;

    @Column(name = "shirt_size")
    private String shirt_size;

    @Column(name = "pant_size")
    private String pant_size;

    public UserMeasurement(){

    }

    public UserMeasurement(UserProfile profile_id, double height, String height_param, String shirt_size, String pant_size) {
        this.profile_id = profile_id;
        this.height = height;
        this.height_param = height_param;
        this.shirt_size = shirt_size;
        this.pant_size = pant_size;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserProfile getProfile_id() {
        return profile_id;
    }

    public void setProfile_id(UserProfile profile_id) {
        this.profile_id = profile_id;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public String getHeight_param() {
        return height_param;
    }

    public void setHeight_param(String height_param) {
        this.height_param = height_param;
    }

    public String getShirt_size() {
        return shirt_size;
    }

    public void setShirt_size(String shirt_size) {
        this.shirt_size = shirt_size;
    }

    public String getPant_size() {
        return pant_size;
    }

    public void setPant_size(String pant_size) {
        this.pant_size = pant_size;
    }
}
