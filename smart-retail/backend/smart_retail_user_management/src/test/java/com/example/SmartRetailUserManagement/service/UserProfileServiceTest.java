package com.example.SmartRetailUserManagement.service;

import com.example.SmartRetailUserManagement.dto.UserProfileDTO;
import com.example.SmartRetailUserManagement.entity.UserProfile;
import com.example.SmartRetailUserManagement.repository.CustomerRepository;
import com.example.SmartRetailUserManagement.repository.UserProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doThrow;

public class UserProfileServiceTest {


    @Mock
    CustomerRepository customerRepository;

    @Mock
    UserProfileRepository userProfileRepository;

    @InjectMocks
    UserProfileService userProfileService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }


    /**
     * Test: Add profile when Parent ID doesn't exist
     */
    @Test
    public void testAddProfileParentIdNotExistReturnNotFound() {
        //arrange
        UserProfileDTO userProfileDTO = UserProfileDTO.builder().parent_user_id(1).build();
        Mockito.when(customerRepository.existsById(1)).thenReturn(false);

        //act
        var result = userProfileService.addProfile(userProfileDTO);

        //assert
        assertEquals(404, result.getStatusCodeValue());
        Mockito.verify(userProfileRepository, Mockito.times(0)).save(Mockito.any());
    }

    /**
     * Test: Add profile when Parent ID exists
     */
    @Test
    public void testAddProfileParentIdExistReturnCreated() {
        //arrange
        UserProfileDTO userProfileDTO = UserProfileDTO.builder().parent_user_id(1).build();
        Mockito.when(customerRepository.existsById(1)).thenReturn(true);

        //act
        var result = userProfileService.addProfile(userProfileDTO);

        //assert
        assertEquals(201, result.getStatusCodeValue());
        Mockito.verify(userProfileRepository, Mockito.times(1)).save(Mockito.any());

    }

    /**
     * Test: Delete profile when ID exists
     */
    @Test
    void testDeleteProfileReturnSuccess() {
        long id = 1;

        var result = userProfileService.deleteProfile(id);

        assertEquals(200, result.getStatusCodeValue());
        Mockito.verify(userProfileRepository, Mockito.times(1)).deleteById(id);
    }

    /**
     * Test: Delete profile when ID doesn't exist
     */
    @Test
    void testDeleteProfileReturnException() {
        long id = 1;
        doThrow(new RuntimeException()).when(userProfileRepository).deleteById(id);

        var result = userProfileService.deleteProfile(id);

        assertEquals(404, result.getStatusCodeValue());
    }

    /**
     * Test: Get profile with Parent ID doesn't exist
     */
    @Test
    void testGetProfilesByMainUserWhenIdNotFound() {
        Integer parent_id = 100;
        Mockito.when(userProfileRepository.existsById(1000L)).thenReturn(false);

        //act
        var result = userProfileService.getProfilesByMainUserId(parent_id);

        //assert
        assertEquals(404, result.getStatusCodeValue());
        Mockito.verify(userProfileRepository, Mockito.times(1)).getProfiles(parent_id);
    }

    /**
     * Test: Update profile with Profile ID exist
     */
    @Test
    void testUpdateProfileReturnSuccess() {
        long profile_id = 10;
        UserProfileDTO userProfileDTO = UserProfileDTO.builder().id(profile_id).name("Test").gender("Male").build();
        UserProfile userProfile = UserProfile.builder().id(profile_id).name("Test").gender("Male").build();
        Mockito.when(userProfileRepository.existsById(profile_id)).thenReturn(false);
        Mockito.when(userProfileRepository.findById(profile_id)).thenReturn(Optional.ofNullable(userProfile));
        Mockito.when(userProfileRepository.save(userProfile)).thenReturn(userProfile);

        var result = userProfileService.updateProfile(profile_id, userProfileDTO);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        Mockito.verify(userProfileRepository, Mockito.times(1)).save(Mockito.any());
    }

    /**
     * Test: Update profile when Profile ID doesn't exist
     */
    @Test
    void testUpdateProfileReturnException() {
        long profile_id = 10;
        UserProfileDTO userProfileDTO = UserProfileDTO.builder().id(profile_id).name("Test").gender("Male").build();
        UserProfile userProfile = UserProfile.builder().id(profile_id).name("Test").gender("Male").build();
        Mockito.when(userProfileRepository.existsById(profile_id)).thenReturn(false);
        Mockito.when(userProfileRepository.findById(1L)).thenReturn(null);
        Mockito.when(userProfileRepository.save(userProfile)).thenReturn(userProfile);

        HttpStatus status = userProfileService.updateProfile(profile_id, userProfileDTO).getStatusCode();

        assertEquals(HttpStatus.NOT_FOUND, status);
        Mockito.verify(userProfileRepository, Mockito.times(0)).save(Mockito.any());
    }

    /**
     * Test: Get profile by ID exist
     */
    @Test
    void testGetProfileByIdReturnProfile() {
        long testProfileId = 234;
        Optional<UserProfile> userProfile = Optional.of(UserProfile.builder().id(234).build());
        Mockito.when(userProfileRepository.findById(testProfileId)).thenReturn(userProfile);

        var result = userProfileService.getProfileById(234);

        assertEquals(userProfile, Optional.of(result.getBody()));
        assertEquals(200, result.getStatusCodeValue());
        Mockito.verify(userProfileRepository, Mockito.times(1)).findById(testProfileId);
    }

    /**
     * Test: Get profile by ID doesn't exist
     */
    @Test
    void testGetProfileByIdNotExistReturnNotFound() {
        long testProfileId = 23;
        Optional <UserProfile> userProfile = Optional.of(UserProfile.builder().id(13).build());
        Mockito.when(userProfileRepository.existsById(testProfileId)).thenReturn(false);

        var result = userProfileService.getProfileById(23);

        assertEquals(404, result.getStatusCodeValue());
        Mockito.verify(userProfileRepository, Mockito.times(1)).findById(testProfileId);
    }

}