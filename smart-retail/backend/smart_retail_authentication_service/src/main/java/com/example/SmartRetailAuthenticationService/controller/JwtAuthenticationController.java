package com.example.SmartRetailAuthenticationService.controller;


import SmartRetailFramework.exception.domain.UserNotFoundException;
import com.example.SmartRetailAuthenticationService.entity.Customer;
import com.example.SmartRetailAuthenticationService.model.JwtRequest;
import com.example.SmartRetailAuthenticationService.model.JwtResponse;
import com.example.SmartRetailAuthenticationService.repository.CustomerRepository;
import com.example.SmartRetailAuthenticationService.service.JwtUserDetailsService;
import com.example.SmartRetailAuthenticationService.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    CustomerRepository customerRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws UserNotFoundException {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);


        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws UserNotFoundException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }}

