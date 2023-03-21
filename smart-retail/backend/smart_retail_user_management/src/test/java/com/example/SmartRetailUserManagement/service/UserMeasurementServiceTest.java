package com.example.SmartRetailUserManagement.service;

import com.example.SmartRetailUserManagement.dto.UserMeasurementDTO;
import com.example.SmartRetailUserManagement.entity.UserMeasurement;
import com.example.SmartRetailUserManagement.entity.UserProfile;
import com.example.SmartRetailUserManagement.repository.UserMeasurementRepository;
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
import static org.mockito.Mockito.when;

class UserMeasurementServiceTest {

    @Mock
    UserMeasurementRepository userMeasurementRepository;

    @Mock
    UserProfileRepository userProfileRepository;

    @InjectMocks
    UserMeasurementService userMeasurementService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test: Get user measurements by ID
     */
    @Test
    void testGetUserMeasurementByIdReturnMeasurement() {
        long profile_id = 10;
        UserMeasurement userData = UserMeasurement.builder().profile_id(new UserProfile()).build();
        Mockito.when(userMeasurementRepository.getByProfileID(profile_id)).thenReturn(Optional.ofNullable(userData));

        var result = userMeasurementService.getUserMeasurementById(profile_id);

//        assertEquals(userData, result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        Mockito.verify( userMeasurementRepository, Mockito.times(1)).getByProfileID(profile_id);
    }

    /**
     * Test: Get user measurements by ID that doesn't exist
     */
    @Test
    void testGetUserMeasurementByIdReturnException() {
        long profile_id = 10;
        UserMeasurement userData = UserMeasurement.builder().profile_id(new UserProfile()).build();
        Mockito.when(userMeasurementRepository.getByProfileID(profile_id)).thenReturn(Optional.ofNullable(userData));

        HttpStatus status = userMeasurementService.getUserMeasurementById(9).getStatusCode();

        assertEquals(HttpStatus.NOT_FOUND, status);
        Mockito.verify( userMeasurementRepository, Mockito.times(0)).getByProfileID(profile_id);
    }

    /**
     * Test: Add user measurements
     */
    @Test
    void testAddMeasurementReturnCreated() {
        UserMeasurementDTO userMeasurementDTO = UserMeasurementDTO.builder().profile_id(10).height(169.5).build();
        UserProfile userProfile = UserProfile.builder().id(10).build();

        Mockito.when(userProfileRepository.findById(10L)).thenReturn(Optional.ofNullable(userProfile));

        HttpStatus status = userMeasurementService.addMeasurement(userMeasurementDTO).getStatusCode();

        assertEquals(HttpStatus.CREATED, status);
        Mockito.verify( userMeasurementRepository, Mockito.times(1)).save(Mockito.any());
    }

    /**
     * Test: Add user measurements by ID that doesn't exist
     */
    @Test
    void testAddMeasurementReturnException() {
        UserMeasurementDTO userMeasurementDTO = UserMeasurementDTO.builder().profile_id(10).height(169.5).build();
        UserProfile userProfile = UserProfile.builder().id(10).build();
        Mockito.when(userProfileRepository.findById(9L)).thenReturn(Optional.ofNullable(userProfile));

        HttpStatus status = userMeasurementService.addMeasurement(userMeasurementDTO).getStatusCode();

        assertEquals(HttpStatus.NOT_FOUND, status);
        Mockito.verify(userMeasurementRepository, Mockito.times(0)).findById(userProfile.getId());
        Mockito.verify( userMeasurementRepository, Mockito.times(0)).save(Mockito.any());
    }

    /**
     * Test: Delete user measurements by ID exist
     */
    @Test
    void testDeleteMeasurement() {
        var result = userMeasurementService.deleteMeasurement(10L);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        Mockito.verify(userMeasurementRepository, Mockito.times(1)).deleteById(10L);
    }

    /**
     * Test: Get user measurements by ID that doesn't exist
     */
    @Test
    void testDeleteMeasurementReturnException() {
        doThrow(new RuntimeException()).when(userMeasurementRepository).deleteById(10L);
        var result = userMeasurementService.deleteMeasurement(10L);

        assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
    }

    /**
     * Test: Update user measurements by ID
     */
    @Test
    void testUpdateMeasurementReturnSuccess() {
        UserProfile userProfile = UserProfile.builder().id(10).build();
        UserMeasurementDTO userMeasurementDTO = UserMeasurementDTO.builder().profile_id(10L).build();
        Optional<UserMeasurement> userMeasurement = Optional.ofNullable(UserMeasurement.builder().profile_id(userProfile).build());
        UserMeasurement measurement = UserMeasurement.builder().profile_id(userProfile).build();
        when(userMeasurementRepository.getByProfileID(userProfile.getId())).thenReturn(userMeasurement);
        Mockito.when(userProfileRepository.getById(10L)).thenReturn(userProfile);
        Mockito.when(userMeasurementRepository.save(measurement)).thenReturn(measurement);

        HttpStatus status = userMeasurementService.updateMeasurement(userProfile.getId(), userMeasurementDTO).getStatusCode();

        assertEquals(HttpStatus.OK, status);
        Mockito.verify(userMeasurementRepository, Mockito.times(1)).getByProfileID(userProfile.getId());
        Mockito.verify(userMeasurementRepository, Mockito.times(1)).save(Mockito.any());
    }

    /**
     * Test: Update user measurements by ID that doesn't exist
     */
    @Test
    void testUpdateMeasurementReturnException() {
        UserProfile userProfile = UserProfile.builder().id(10L).build();
        UserMeasurementDTO userMeasurementDTO = UserMeasurementDTO.builder().profile_id(10L).build();
        Optional<UserMeasurement> userMeasurement = Optional.ofNullable(UserMeasurement.builder().profile_id(userProfile).build());
        UserMeasurement measurement = UserMeasurement.builder().profile_id(userProfile).build();
        when(userMeasurementRepository.getByProfileID(userProfile.getId())).thenReturn(userMeasurement);
        Mockito.when(userProfileRepository.getById(10L)).thenReturn(userProfile);
        Mockito.when(userMeasurementRepository.save(measurement)).thenReturn(measurement);

        HttpStatus status = userMeasurementService.updateMeasurement(9L, userMeasurementDTO).getStatusCode();

        assertEquals(HttpStatus.NOT_FOUND, status);
        Mockito.verify(userMeasurementRepository, Mockito.times(0)).getByProfileID(userProfile.getId());
        Mockito.verify(userMeasurementRepository, Mockito.times(0)).save(Mockito.any());
    }

    /**
     * Test: Update user measurements by ID
     */
    @Test
    void testUpdateSizeInMeasurementReturnSuccess() {
        UserProfile userProfile = UserProfile.builder().id(10).build();
        UserMeasurementDTO userMeasurementDTO = UserMeasurementDTO.builder().profile_id(10L).build();
        Optional<UserMeasurement> userMeasurement = Optional.ofNullable(UserMeasurement.builder().profile_id(userProfile).build());
        UserMeasurement measurement = UserMeasurement.builder().profile_id(userProfile).build();
        when(userMeasurementRepository.getByProfileID(userProfile.getId())).thenReturn(userMeasurement);
        Mockito.when(userProfileRepository.getById(10L)).thenReturn(userProfile);
        Mockito.when(userMeasurementRepository.save(measurement)).thenReturn(measurement);

        HttpStatus status = userMeasurementService.updateSizeInMeasurement(userProfile.getId(), userMeasurementDTO).getStatusCode();

        assertEquals(HttpStatus.OK, status);
        Mockito.verify(userMeasurementRepository, Mockito.times(1)).getByProfileID(userProfile.getId());
        Mockito.verify(userMeasurementRepository, Mockito.times(1)).save(Mockito.any());
    }

    /**
     * Test: Update user measurements by ID that doesn't exist
     */
    @Test
    void testUpdateSizeInMeasurementReturnException() {
        UserProfile userProfile = UserProfile.builder().id(10L).build();
        UserMeasurementDTO userMeasurementDTO = UserMeasurementDTO.builder().profile_id(10L).build();
        Optional<UserMeasurement> userMeasurement = Optional.ofNullable(UserMeasurement.builder().profile_id(userProfile).build());
        UserMeasurement measurement = UserMeasurement.builder().profile_id(userProfile).build();
        when(userMeasurementRepository.getByProfileID(userProfile.getId())).thenReturn(userMeasurement);
        Mockito.when(userProfileRepository.getById(10L)).thenReturn(userProfile);
        Mockito.when(userMeasurementRepository.save(measurement)).thenReturn(measurement);

        HttpStatus status = userMeasurementService.updateSizeInMeasurement(9L, userMeasurementDTO).getStatusCode();

        assertEquals(HttpStatus.NOT_FOUND, status);
        Mockito.verify(userMeasurementRepository, Mockito.times(0)).getByProfileID(userProfile.getId());
        Mockito.verify(userMeasurementRepository, Mockito.times(0)).save(Mockito.any());
    }

}