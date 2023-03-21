package com.example.SmartRetailUserManagement.controller;


import com.example.SmartRetailUserManagement.dto.UserMeasurementDTO;
import com.example.SmartRetailUserManagement.service.UserMeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserMeasurementController {


    @Autowired
    UserMeasurementService userMeasurementService;

    //to get a particular measurement
    @GetMapping("/measurement/{profile_id}")
    public ResponseEntity<Object> getUserMeasurementById(@PathVariable("profile_id") long profile_id) {
        return userMeasurementService.getUserMeasurementById(profile_id);

    }

    //to add a particular measurement
    @PostMapping("/measurement")
    public ResponseEntity<Object> addMeasurement(@RequestBody UserMeasurementDTO measurement) {
        return userMeasurementService.addMeasurement(measurement);

    }

    //Delete a particular Users Measurements
    @DeleteMapping("/measurement/{id}")
    public ResponseEntity<Object> deleteMeasurement(@PathVariable("id") long id) {
        return userMeasurementService.deleteMeasurement(id);

    }

    //Update a particular User measurements
    @PutMapping("/measurement/{profile_id}")
    public ResponseEntity<Object> updateMeasurement(@PathVariable("profile_id") long profile_id, @RequestBody UserMeasurementDTO measurement) {
        return userMeasurementService.updateMeasurement(profile_id, measurement);

    }

    @PutMapping("/measurement/{profile_id}/updateSize")
    public ResponseEntity<Object> updateSizeInMeasurement(@PathVariable("profile_id") long profile_id, @RequestBody UserMeasurementDTO measurement) {
        return userMeasurementService.updateSizeInMeasurement(profile_id, measurement);

    }




}
