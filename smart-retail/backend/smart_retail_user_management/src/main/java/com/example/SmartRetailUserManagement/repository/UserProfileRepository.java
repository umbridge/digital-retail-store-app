package com.example.SmartRetailUserManagement.repository;

import com.example.SmartRetailUserManagement.entity.UserMeasurement;
import com.example.SmartRetailUserManagement.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query(value = "Select v from UserProfile v where v.parent_user.userId = ?1 ")
    List<UserProfile> getProfiles(Integer profile_id);

    @Query(value = "Select v from UserProfile v where v.id = ?1")
    UserProfile findByid(long id);


}
