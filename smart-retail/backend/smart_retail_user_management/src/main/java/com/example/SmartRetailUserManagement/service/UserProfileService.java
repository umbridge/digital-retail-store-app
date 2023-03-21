package com.example.SmartRetailUserManagement.service;


import SmartRetailFramework.constants.ErrorCodes;
import SmartRetailFramework.dto.ResponseHandler;
import com.example.SmartRetailUserManagement.dto.CustomerRegisterDTO;
import com.example.SmartRetailUserManagement.dto.UserProfileDTO;
import com.example.SmartRetailUserManagement.entity.Customer;
import com.example.SmartRetailUserManagement.entity.UserProfile;
import com.example.SmartRetailUserManagement.exception.domain.GeneralException;
import com.example.SmartRetailUserManagement.repository.UserProfileRepository;
import com.example.SmartRetailUserManagement.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Service
public class UserProfileService {


    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserProfileRepository userProfileRepository;


    //Adding a profile from a particular User
    public ResponseEntity<Object> addProfile(@RequestBody UserProfileDTO profiles) {



        if(!customerRepository.existsById(profiles.getParent_user_id())){
                return ResponseHandler.generateResponse("Parent User ID does not exist", HttpStatus.NOT_FOUND, profiles);
            }

        Integer id = profiles.getParent_user_id();

        UserProfile _profiles = new UserProfile();
        _profiles.setName(profiles.getName());
        _profiles.setDate_of_birth(profiles.getDate_of_birth());
        _profiles.setGender(profiles.getGender());
        _profiles.setParent_user(customerRepository.getById(id));

         userProfileRepository.save(_profiles);

         profiles.setId(_profiles.getId());

        return ResponseHandler.generateResponse("Profile Created Successfully!", HttpStatus.CREATED, profiles);



    }


    //To delete a particular Profile based on profile id
    public ResponseEntity<Object> deleteProfile(@PathVariable("profile_id") long profile_id) {
        try {
            userProfileRepository.deleteById(profile_id);
            return ResponseHandler.generateResponse("Profile deleted successfully", HttpStatus.OK, "");
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Profile ID does not exist", HttpStatus.NOT_FOUND, "");
        }
    }


    //Get all Profiles by Main_user_id
    public ResponseEntity<Object> getProfilesByMainUserId(@PathVariable("parent_user_id") Integer parent_user_id){
        try{
            if(userProfileRepository.getProfiles(parent_user_id).isEmpty()){
                throw new GeneralException("Main User ID does not exist.");
            }
        }catch (Exception e){
            List<UserProfile> profiles=new ArrayList<>();
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, profiles);
        }
        List<UserProfile> profiles = userProfileRepository.getProfiles(parent_user_id);
        //Sorting the data

        Collections.sort(profiles, (profiles1, t1) -> profiles1.getId() > t1.getId()?1:-1);

        return new ResponseEntity<>(profiles,HttpStatus.OK);
    }


    //Updating the data in a particular profile
    public ResponseEntity<Object> updateProfile(@PathVariable("profile_id") long profile_id, @RequestBody UserProfileDTO profiles) {


        if (userProfileRepository.findById(profile_id).isPresent()) {



            UserProfile TempData = userProfileRepository.findById(profile_id).get();



            if(!(profiles.getName()==null))
                TempData.setName(profiles.getName());
            else
                TempData.setName(TempData.getName());

            if(!(profiles.getGender()==null))
                TempData.setGender(profiles.getGender());
            else
                TempData.setGender(TempData.getGender());

            if(!(profiles.getDate_of_birth()==null))
                TempData.setDate_of_birth(profiles.getDate_of_birth());
            else
                TempData.setDate_of_birth(TempData.getDate_of_birth());

            return new ResponseEntity<>(userProfileRepository.save(TempData), HttpStatus.OK);
        } else {
            return ResponseHandler.generateResponse("Profile ID does not exist", HttpStatus.NOT_FOUND, "");
        }
    }

    public ResponseEntity<Object> getProfileById(@PathVariable("profile_id") long profile_id) {
        Optional<UserProfile> ProfileData = userProfileRepository.findById(profile_id);


        try{
            if(ProfileData.isEmpty()){
                throw new GeneralException("Profile Id doesn't exist");
            }
            //Changed the status message sent to the frontend.
            return new ResponseEntity<>(ProfileData.get(), HttpStatus.OK);
        }catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, "");
        }
    }

//    public String addCustomertoTest(@RequestBody CustomerRegisterDTO profiles){
//
//        Customer customer = new Customer();
//        customer.setName(profiles.getName());
//        customer.setPassword(profiles.getPassword());
//        customer.setPhoneNumber(profiles.getPhoneNumber());
//        customer.setEmail(profiles.getEmail());
//        customerRepository.save(customer);
//
//        return "New Customer added";
//    }
//
//


}
