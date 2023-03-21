package com.example.SmartRetailAuthenticationService.service;
import com.example.SmartRetailAuthenticationService.config.WebSecurityConfig;
import com.example.SmartRetailAuthenticationService.entity.Customer;
import com.example.SmartRetailAuthenticationService.repository.CustomerRepository;
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

//@SpringBootTest
public class JwtUserDetailsServiceTest {
    @Mock
    CustomerRepository customerRepository;
    @Mock
    WebSecurityConfig webSecurityConfig;
    @InjectMocks
    JwtUserDetailsService jwtUserDetailsService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);}

    @Test
    public void testJwtUserDetailsServiceReturnResponse(){

        Customer customer = Customer.builder().userId(1001).email("unit_test7@gmail.com").password("Password").build();
        when(customerRepository.findByEmail("unit_test7@gmail.com")).thenReturn(customer);
        UserDetails checkStatus = jwtUserDetailsService.loadUserByUsername("unit_test7@gmail.com");
        assertNotNull(checkStatus);
        Mockito.verify(customerRepository, Mockito.times(1)).findByEmail("unit_test7@gmail.com");
    }

    @Test
    public void testJwtUserDetailsServiceReturnUserNotFoundException() throws UsernameNotFoundException{

        Customer customer = Customer.builder().email("unit_test7@gmail.com").password("Password@123").build();

        when(customerRepository.findByEmail("unit_test7@gmail.com")).thenReturn(null);
        assertThrows(UsernameNotFoundException.class,
                () -> jwtUserDetailsService.loadUserByUsername("unit_test7@gmail.com"),
                () -> "User already exists");
        Mockito.verify(customerRepository, Mockito.times(1)).findByEmail("unit_test7@gmail.com");
    }

}
