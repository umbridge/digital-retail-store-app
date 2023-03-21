package com.example.SmartRetailUserManagement.repository;


import com.example.SmartRetailUserManagement.entity.UserMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface UserMeasurementRepository extends JpaRepository<UserMeasurement, Long> {

    @Query(value = "Select v from UserMeasurement v where v.id = ?1")
    UserMeasurement findByid(long id);

    List<UserMeasurement> deleteByid(long id);

    @Query(value = "Select v from UserMeasurement v where v.profile_id.id = ?1 ")
    Optional<UserMeasurement> getByProfileID(long profile_id);

}
