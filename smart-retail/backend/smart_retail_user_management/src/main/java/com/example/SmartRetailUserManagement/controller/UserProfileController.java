package com.example.SmartRetailUserManagement.controller;

import com.example.SmartRetailUserManagement.dto.UserProfileDTO;
import com.example.SmartRetailUserManagement.entity.UserProfile;
import com.example.SmartRetailUserManagement.service.UserProfileService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@ApiOperation("All profiles API")
public class UserProfileController {


    @Autowired
    UserProfileService userProfileService;

    @GetMapping("/")
    public String home() {
        return "welcome!";
    }


    @ApiOperation(value = "Add a particular Profile", notes = "Adds a profile")
    @PostMapping("/profile")
    public ResponseEntity<Object> addProfile(@RequestBody UserProfileDTO profiles){
        return userProfileService.addProfile(profiles);
    }

    @DeleteMapping("/profile/{profile_id}")
    public ResponseEntity<Object> deleteProfile(@PathVariable("profile_id") long profile_id){
        return userProfileService.deleteProfile(profile_id);

    }


    @GetMapping("/profile/getAllByMainID/{parent_user_id}")
    public ResponseEntity<Object> getProfilesByMainUserId(@PathVariable("parent_user_id") Integer parent_user_id){
        return userProfileService.getProfilesByMainUserId(parent_user_id);
    }

    @PutMapping("/profile/{profile_id}")
    public ResponseEntity<Object> updateProfile(@PathVariable("profile_id") long profile_id, @RequestBody UserProfileDTO profiles){
        return userProfileService.updateProfile(profile_id,profiles);
    }

    @GetMapping("/profile/{profile_id}")
    public ResponseEntity<Object> getProfileById(@PathVariable("profile_id") long profile_id){
        return userProfileService.getProfileById(profile_id);
    }




}
