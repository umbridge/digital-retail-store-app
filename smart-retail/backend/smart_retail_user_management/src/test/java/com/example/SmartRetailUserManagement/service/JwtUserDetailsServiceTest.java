package com.example.SmartRetailUserManagement.service;

import com.example.SmartRetailUserManagement.entity.Customer;
import com.example.SmartRetailUserManagement.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


public class JwtUserDetailsServiceTest {
    @Mock
    CustomerRepository customerRepository;

    @InjectMocks
    JwtUserDetailsService jwtUserDetailsService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test: User details when user is present
     */
    @Test
    public void testJwtUserDetailsServiceUserPresent(){
        String email = "unit_test_user7@gmail.com";
        Customer customer = Customer.builder().userId(1001).email(email).password("Password").build();
        when(customerRepository.findByEmail(email)).thenReturn(customer);

        UserDetails checkStatus = jwtUserDetailsService.loadUserByUsername(email);

        assertNotNull(checkStatus);
        Mockito.verify( customerRepository, Mockito.times(1)).findByEmail(email);

    }

    /**
     * Test: User details when user is not present
     * @throws UsernameNotFoundException
     */
    @Test
    public void testJwtUserDetailsServiceUserNotPresent() throws UsernameNotFoundException {
        String email = "unit_test_user7@gmail.com";
        Customer customer = Customer.builder().email("unit_test7@gmail.com").build();
        when(customerRepository.findByEmail(email)).thenReturn(null);
        assertThrows(UsernameNotFoundException.class,
                () -> jwtUserDetailsService.loadUserByUsername(email),
                () -> "User already exists");
    }

}