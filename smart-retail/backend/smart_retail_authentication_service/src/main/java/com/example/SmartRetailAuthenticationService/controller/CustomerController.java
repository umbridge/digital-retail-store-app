package com.example.SmartRetailAuthenticationService.controller;
import com.example.SmartRetailAuthenticationService.dto.*;
import com.example.SmartRetailAuthenticationService.dto.CustomerDTO;
import com.example.SmartRetailAuthenticationService.dto.CustomerInformationDTO;
import com.example.SmartRetailAuthenticationService.dto.ProfileResponseToken;
import com.example.SmartRetailAuthenticationService.entity.UserProfile;
import com.example.SmartRetailAuthenticationService.entity.Customer;
import com.example.SmartRetailAuthenticationService.exception.domain.EmailExistException;
import com.example.SmartRetailAuthenticationService.exception.domain.EmailNotFoundException;
import com.example.SmartRetailAuthenticationService.repository.CustomerRepository;
import com.example.SmartRetailAuthenticationService.service.CustomerService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.mail.MessagingException;

@RestController
@CrossOrigin(origins = "*")
@Api(tags = {"Home controller"})
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    @GetMapping("/")
    public String home() {
        return "Welcome to Authentication Service to check!";
    }


    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody CustomerRegisterDTO customer) throws EmailExistException {
        return customerService.register(customer);
    }

    @GetMapping("/customer/profile")
    public CustomerDTO getProfile(@RequestHeader(value = "Authorization") ProfileResponseToken response) throws Exception {
        return customerService.getProfile(response);
    }


    @PostMapping("/sendEmail")
    public String postMail(@RequestBody EmailDTO emailDTO) throws MessagingException, EmailNotFoundException
    {
        return customerService.postMail(emailDTO);
    }

    @PostMapping("/resetPassword")
    public String resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO)
    {
        return customerService.resetPassword(resetPasswordDTO);

    }

}

