package com.example.SmartRetailAuthenticationService.service;
import SmartRetailFramework.exception.domain.UserNotFoundException;
import com.example.SmartRetailAuthenticationService.config.WebSecurityConfig;
import com.example.SmartRetailAuthenticationService.controller.JwtAuthenticationController;
import com.example.SmartRetailAuthenticationService.dto.*;
import com.example.SmartRetailAuthenticationService.entity.Customer;
import com.example.SmartRetailAuthenticationService.entity.UserProfile;
import com.example.SmartRetailAuthenticationService.exception.domain.EmailExistException;
import com.example.SmartRetailAuthenticationService.exception.domain.EmailNotFoundException;
import com.example.SmartRetailAuthenticationService.model.JwtRequest;
import com.example.SmartRetailAuthenticationService.repository.CustomerRepository;
import com.example.SmartRetailAuthenticationService.repository.UserProfileRepository;
import com.example.SmartRetailAuthenticationService.util.JwtTokenUtil;
import com.example.SmartRetailAuthenticationService.util.ProfileUtil;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.junit.jupiter.api.Test;
import javax.mail.MessagingException;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


public class CustomerServiceTest {

    @Mock
    CustomerRepository customerRepository;
    @Mock
    UserProfileRepository userProfileRepository;
    @InjectMocks
    CustomerService customerService;
    @Mock
    EmailService emailService;
    @Mock
    PasswordEncoder passwordEncoder;
    @InjectMocks
    JwtAuthenticationController jwtAuthenticationController;
    @Mock
    JwtTokenUtil jwtTokenUtil;
    @Mock
    UserDetailsService userDetailsService;
    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    JwtUserDetailsService jwtUserDetailsService;
    @Mock
    JavaMailSender mailSender;
    @Mock
    WebSecurityConfig webSecurityConfig;
    @Mock
    ProfileUtil profileUtil;
    @Mock
    UserDetails userDetails;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);}


    @Test
    public void testRegisterReturnEmailExistException() throws EmailExistException {
        Customer customer= new Customer();
        customer.setUserId(1);
        customer.setName("Test7");
        customer.setEmail("unit_test7@gmail.com");
        customer.setPhoneNumber("4334567890");
        customer.setPassword("Password@123");

        CustomerRegisterDTO customerRegisterDTO= new CustomerRegisterDTO(customer.getUserId(), customer.getName(), customer.getEmail(), customer.getPhoneNumber(), customer.getPassword());

        ResponseEntity responseEntity= new ResponseEntity<Object>(HttpStatus.OK);

        UserProfileDTO userProfile= new UserProfileDTO(1,"Test8","1/02/2022","Male",1);
        UserProfile userProfile1= new UserProfile(userProfile.getId(), userProfile.getName(), userProfile.getDate_of_birth(), userProfile.getGender(), customer);

        when(customerRepository.findByPhoneNumberOrEmail(customer.getPhoneNumber(), customer.getEmail())).thenReturn(customer);
        assertThrows(EmailExistException.class,
                () -> customerService.register(customerRegisterDTO),
                () -> "User already exists");
        Mockito.verify(userProfileRepository, Mockito.times(0)).save(Mockito.any());
        Mockito.verify(customerRepository, Mockito.times(1)).findByPhoneNumberOrEmail("4334567890","unit_test7@gmail.com");

    }

    @Test
    public void testRegisterReturnResponse() throws EmailExistException, EmailExistException {
        Customer customer= new Customer();
        customer.setUserId(1);
        customer.setName("Test7");
        customer.setEmail("unit_test7@gmail.com");
        customer.setPhoneNumber("4334567890");
        customer.setPassword("Password@123");

        CustomerRegisterDTO customerRegisterDTO= new CustomerRegisterDTO(customer.getUserId(), customer.getName(), customer.getEmail(), customer.getPhoneNumber(), customer.getPassword());

        ResponseEntity responseEntity= new ResponseEntity<Object>(HttpStatus.OK);

        UserProfileDTO userProfile= new UserProfileDTO(1,"Test8","1/02/2022","Male",1);
        UserProfile userProfile1= new UserProfile(userProfile.getId(), userProfile.getName(), userProfile.getDate_of_birth(), userProfile.getGender(), customer);

        when(customerRepository.findByPhoneNumberOrEmail(customer.getPhoneNumber(), customer.getEmail())).thenReturn(null);
        when(customerRepository.save(customer)).thenReturn(customer);
        when(customerRepository.getById(customer.getUserId())).thenReturn(customer);
        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(customer);
        when(userProfileRepository.save(userProfile1)).thenReturn(userProfile1);

        assertEquals(HttpStatus.OK, customerService.register(customerRegisterDTO).getStatusCode());
        Mockito.verify(userProfileRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(customerRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(customerRepository, Mockito.times(1)).getById(null);
        Mockito.verify(customerRepository, Mockito.times(0)).findByEmail("unit_test7@gmail.com");

    }

    @Test
    public void testSendEmailReturnEmailNotFoundException() throws  EmailNotFoundException{
        Customer customer = Customer.builder().userId(1).email("unit_test7@gmail.com").build();
        EmailDTO emailDTO= new EmailDTO("unit_test7@gmail.com");
        when(customerRepository.existsById(customer.getUserId())).thenReturn(false);
        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(null);
        assertThrows(EmailNotFoundException.class,
                () -> customerService.postMail(emailDTO),
                () -> "User already exists");
        Mockito.verify(customerRepository, Mockito.times(0)).existsById(1);
        Mockito.verify(customerRepository, Mockito.times(1)).findByEmail("unit_test7@gmail.com");


    }
    @Test
    public void testSendEmailReturnResponse() throws EmailNotFoundException, MessagingException {
        Customer customer = Customer.builder().email("unit_test7@gmail.com").build();
        EmailDTO emailDTO= new EmailDTO(customer.getEmail());
        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(customer);
        String result= customerService.postMail(emailDTO);
        assertEquals("Email sent", result);
        Mockito.verify(customerRepository, Mockito.times(0)).save(Mockito.any());
        Mockito.verify(customerRepository, Mockito.times(2)).findByEmail("unit_test7@gmail.com");

    }

    @Test
    public void testResetPasswordReturnResponse(){
        Customer customer = Customer.builder().email("unit_test7@gmail.com").password("Password@123").build();
        ResetPasswordDTO resetPasswordDTO= new ResetPasswordDTO(customer.getEmail(), "Password@1234");
        when(customerRepository.save(customer)).thenReturn(customer);
        when(customerRepository.findByEmail("unit_test7@gmail.com")).thenReturn(customer);
        assertEquals("Password Updated", customerService.resetPassword(resetPasswordDTO));
        Mockito.verify(customerRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(customerRepository, Mockito.times(1)).findByEmail("unit_test7@gmail.com");
    }

    @Test
    public void testLoginReturnResponse() throws UserNotFoundException {
        String password= "Password@123";
        String encryptedPassword =passwordEncoder.encode(password);
        Customer customer = Customer.builder().email("unit_test7@gmail.com").password(encryptedPassword).build();
        String username= customer.getEmail();
        JwtRequest jwtRequest= new JwtRequest(username, "Password@123");
        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(customer);
        String response= String.valueOf(jwtAuthenticationController.createAuthenticationToken(jwtRequest));
        assertNotNull(response);
        Mockito.verify(customerRepository, Mockito.times(0)).save(Mockito.any());
        Mockito.verify(customerRepository, Mockito.times(0)).findByEmail("unit_test7@gmail.com");
    }

}
















