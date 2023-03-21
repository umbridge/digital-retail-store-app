package com.example.SmartRetailAuthenticationService.repository;

import com.example.SmartRetailAuthenticationService.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query(value = "Select v from UserProfile v where v.parent_user.userId = ?1 ")
    List<UserProfile> getProfiles(Integer profile_id);

}
