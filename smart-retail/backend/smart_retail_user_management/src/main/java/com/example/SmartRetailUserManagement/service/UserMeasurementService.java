package com.example.SmartRetailUserManagement.service;


import SmartRetailFramework.dto.ResponseHandler;
import com.example.SmartRetailUserManagement.dto.UserMeasurementDTO;
import com.example.SmartRetailUserManagement.entity.UserMeasurement;
import com.example.SmartRetailUserManagement.exception.domain.GeneralException;
import com.example.SmartRetailUserManagement.repository.UserMeasurementRepository;
import com.example.SmartRetailUserManagement.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;


@Service
public class UserMeasurementService {


    @Autowired
    UserMeasurementRepository measurements_repository;

    @Autowired
    UserProfileRepository userProfileRepository;


    public ResponseEntity<Object> getUserMeasurementById(@PathVariable("profile_id") long profile_id) {
        Optional<UserMeasurement> UserData = measurements_repository.getByProfileID(profile_id);


        try{
            if(UserData.isEmpty()){
                throw new GeneralException("User Id doesn't exist");
            }

            return ResponseHandler.generateResponse("Measurement with Id: "+profile_id, HttpStatus.OK, UserData.get());
        }catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, "");
        }
    }


    public ResponseEntity<Object> addMeasurement(@RequestBody UserMeasurementDTO measurement) {
        UserMeasurement _measurements = new UserMeasurement();
        _measurements.setHeight(measurement.getHeight());
        _measurements.setHeight_param(measurement.getHeight_param());
        _measurements.setShirt_size(measurement.getShirt_size());
        _measurements.setPant_size(measurement.getPant_size());

        try{
            if(userProfileRepository.findById(measurement.getProfile_id()).isEmpty()){
                throw new GeneralException("Profile ID  does not exist!");
            }
            _measurements.setProfile_id(userProfileRepository.getById(measurement.getProfile_id()));


        }catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, "");
        }


        try{

            measurements_repository.save(_measurements);
            measurement.setId(_measurements.getId());
            return ResponseHandler.generateResponse("Profile Created Successfully!", HttpStatus.CREATED, measurement);
        }catch (Exception e){
            return ResponseHandler.generateResponse("Could not create the profile", HttpStatus.NOT_FOUND, "");
        }
    }



    public ResponseEntity<Object> deleteMeasurement(@PathVariable("id") long id) {
        try {
            measurements_repository.deleteById(id);
            return ResponseHandler.generateResponse("Measurement deleted successfully", HttpStatus.OK, "");
        } catch (Exception e) {
            return ResponseHandler.generateResponse("User ID does not exist", HttpStatus.NOT_FOUND, "");
        }
    }


    public ResponseEntity<Object> updateMeasurement(@PathVariable("profile_id") long profile_id, @RequestBody UserMeasurementDTO measurement) {

        Optional<UserMeasurement> UpdateData = measurements_repository.getByProfileID(profile_id);

        if (UpdateData.isPresent()) {
            UserMeasurement _measurement = UpdateData.get();

            _measurement.setProfile_id(userProfileRepository.getById(measurement.getProfile_id()));
            _measurement.setHeight(measurement.getHeight());
            _measurement.setHeight_param(measurement.getHeight_param());
            _measurement.setShirt_size(measurement.getShirt_size());
            _measurement.setPant_size(measurement.getPant_size());

            measurements_repository.save(_measurement);
            measurement.setId(_measurement.getId());
            return new ResponseEntity<>(measurement, HttpStatus.OK);
        } else {
            return ResponseHandler.generateResponse("Profile ID does not exist", HttpStatus.NOT_FOUND, "");
        }
    }


    public ResponseEntity<Object> updateSizeInMeasurement(@PathVariable("profile_id") long profile_id, @RequestBody UserMeasurementDTO measurement) {


        Optional<UserMeasurement> UpdateData = measurements_repository.getByProfileID(profile_id);

        if (UpdateData.isPresent()) {
            UserMeasurement _measurement = UpdateData.get();

            _measurement.setProfile_id(userProfileRepository.getById(profile_id));
            _measurement.setHeight(_measurement.getHeight());
            _measurement.setHeight_param(_measurement.getHeight_param());
            _measurement.setShirt_size(measurement.getShirt_size());
            _measurement.setPant_size(_measurement.getPant_size());

            measurements_repository.save(_measurement);
            measurement.setId(_measurement.getId());
            return new ResponseEntity<>(measurement.getShirt_size(), HttpStatus.OK);
        } else {
            return ResponseHandler.generateResponse("Profile ID does not exist", HttpStatus.NOT_FOUND, "");
        }
    }








}
