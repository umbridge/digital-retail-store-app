//package com.example.SmartRetailAuthenticationService;
//import SmartRetailFramework.exception.domain.UserNotFoundException;
//import com.example.SmartRetailAuthenticationService.config.WebSecurityConfig;
//import com.example.SmartRetailAuthenticationService.controller.JwtAuthenticationController;
//import com.example.SmartRetailAuthenticationService.dto.*;
//import com.example.SmartRetailAuthenticationService.entity.Customer;
//import com.example.SmartRetailAuthenticationService.entity.UserProfile;
//import com.example.SmartRetailAuthenticationService.exception.domain.EmailExistException;
//import com.example.SmartRetailAuthenticationService.exception.domain.EmailNotFoundException;
//import com.example.SmartRetailAuthenticationService.model.JwtRequest;
//import com.example.SmartRetailAuthenticationService.repository.CustomerRepository;
//import com.example.SmartRetailAuthenticationService.repository.UserProfileRepository;
//import com.example.SmartRetailAuthenticationService.service.CustomerService;
//import com.example.SmartRetailAuthenticationService.service.EmailService;
//import com.example.SmartRetailAuthenticationService.service.JwtUserDetailsService;
//import com.example.SmartRetailAuthenticationService.util.JwtTokenUtil;
//import com.example.SmartRetailAuthenticationService.util.ProfileUtil;
//import org.junit.jupiter.api.BeforeEach;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//
//
//import javax.mail.MessagingException;
//
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.when;
//
//public class SmartRetailAuthenticationServiceTests {
//
//    @Mock
//    CustomerRepository customerRepository;
//
//    @Mock
//    UserProfileRepository userProfileRepository;
//
//    @InjectMocks
//    CustomerService customerService;
//
//    @Mock
//    EmailService emailService;
//
//    @Mock
//    PasswordEncoder passwordEncoder;
//    @InjectMocks
//    JwtAuthenticationController jwtAuthenticationController;
//    @Mock
//    JwtTokenUtil jwtTokenUtil;
//    @Mock
//    UserDetailsService userDetailsService;
//    @Mock
//    AuthenticationManager authenticationManager;
//    @Mock
//    JwtUserDetailsService jwtUserDetailsService;
//    @Mock
//    JavaMailSender mailSender;
//    @Mock
//    WebSecurityConfig webSecurityConfig;
//    @Mock
//    ProfileUtil profileUtil;
//    @Mock
//    UserDetails userDetails;
//
//
//    @Test
//    public void testRegister() throws EmailExistException {
//        Customer customer= new Customer();
//        customer.setUserId(1);
//        customer.setName("Test7");
//        customer.setEmail("unit_test7@gmail.com");
//        customer.setPhoneNumber("4334567890");
//        customer.setPassword("Password@123");
//
//        CustomerRegisterDTO customerRegisterDTO= new CustomerRegisterDTO(customer.getUserId(), customer.getName(), customer.getEmail(), customer.getPhoneNumber(), customer.getPassword());
//
//        ResponseEntity responseEntity= new ResponseEntity<Object>(HttpStatus.OK);
//
//        UserProfileDTO userProfile= new UserProfileDTO(1,"Test8","1/02/2022","Male",1);
//        UserProfile userProfile1= new UserProfile(userProfile.getId(), userProfile.getName(), userProfile.getDate_of_birth(), userProfile.getGender(), customer);
//
//
//        when(customerRepository.findByPhoneNumberOrEmail(customer.getPhoneNumber(), customer.getEmail())).thenReturn(customer);
////        assertEquals(HttpStatus.OK, customerService.register(customerRegisterDTO).getStatusCode());
//        assertThrows(EmailExistException.class,
//                () -> customerService.register(customerRegisterDTO),
//                () -> "User already exists");
//        Mockito.verify(userProfileRepository, Mockito.times(0)).save(Mockito.any());
//
//    }
//
//    @Test
//    public void testRegisterWithNoException() throws EmailExistException, EmailExistException {
//        Customer customer= new Customer();
//        customer.setUserId(1);
//        customer.setName("Test7");
//        customer.setEmail("unit_test7@gmail.com");
//        customer.setPhoneNumber("4334567890");
//        customer.setPassword("Password@123");
//
//        CustomerRegisterDTO customerRegisterDTO= new CustomerRegisterDTO(customer.getUserId(), customer.getName(), customer.getEmail(), customer.getPhoneNumber(), customer.getPassword());
//
//        ResponseEntity responseEntity= new ResponseEntity<Object>(HttpStatus.OK);
//
//        UserProfileDTO userProfile= new UserProfileDTO(1,"Test8","1/02/2022","Male",1);
//        UserProfile userProfile1= new UserProfile(userProfile.getId(), userProfile.getName(), userProfile.getDate_of_birth(), userProfile.getGender(), customer);
//
////
//        when(customerRepository.findByPhoneNumberOrEmail(customer.getPhoneNumber(), customer.getEmail())).thenReturn(null);
//        when(customerRepository.save(customer)).thenReturn(customer);
//        when(customerRepository.getById(customer.getUserId())).thenReturn(customer);
//        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(customer);
//        when(userProfileRepository.save(userProfile1)).thenReturn(userProfile1);
//
//        assertEquals(HttpStatus.OK, customerService.register(customerRegisterDTO).getStatusCode());
//        Mockito.verify(userProfileRepository, Mockito.times(1)).save(Mockito.any());
//
//
//    }
//
//    @BeforeEach
//    public void init() {
//        MockitoAnnotations.openMocks(this);}
//
//
//    @Test
//    public void testSendEmailDoesNotExist() throws  EmailNotFoundException{
//        Customer customer = Customer.builder().email("unit_test7@gmail.com").build();
//        EmailDTO emailDTO= new EmailDTO("unit_t7@gmail.com");
//        when(customerRepository.existsById(customer.getUserId())).thenReturn(false);
//        assertThrows(EmailNotFoundException.class,
//                () -> customerService.postMail(emailDTO),
//                () -> "User already exists");
//        Mockito.verify(userProfileRepository, Mockito.times(0)).save(Mockito.any());
//
//
//    }
//    @Test
//    public void testSendEmail() throws EmailNotFoundException, MessagingException {
//        Customer customer = Customer.builder().email("unit_test7@gmail.com").build();
//        EmailDTO emailDTO= new EmailDTO(customer.getEmail());
//        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(customer);
////        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(new Customer(1,"Test7", "unit_test7@gmail.com","4334567890", "Password@123"));
//        String result= customerService.postMail(emailDTO);
//        assertEquals("Email sent", result);
//        Mockito.verify(customerRepository, Mockito.times(0)).save(Mockito.any());
//
//    }
//
//    @Test
//    public void testResetPassword(){
//        Customer customer = Customer.builder().email("unit_test7@gmail.com").password("Password@123").build();
//        ResetPasswordDTO resetPasswordDTO= new ResetPasswordDTO(customer.getEmail(), "Password@1234");
//        when(customerRepository.save(customer)).thenReturn(customer);
//        when(customerRepository.findByEmail("unit_test7@gmail.com")).thenReturn(customer);
//        assertEquals("Password Updated", customerService.resetPassword(resetPasswordDTO));
//        Mockito.verify(customerRepository, Mockito.times(1)).save(Mockito.any());
//
//    }
//
//    @Test
//    public void testLogin() throws UserNotFoundException {
//        String password= "Password@123";
//        String encryptedPassword =passwordEncoder.encode(password);
//        Customer customer = Customer.builder().email("unit_test7@gmail.com").password(encryptedPassword).build();
//        String username= customer.getEmail();
//        JwtRequest jwtRequest= new JwtRequest(username, "Password@123");
//        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(customer);
//        String response= String.valueOf(jwtAuthenticationController.createAuthenticationToken(jwtRequest));
//        assertNotNull(response);
//        Mockito.verify(customerRepository, Mockito.times(0)).save(Mockito.any());
//    }
//
////    @Test
////    public void testLoginWithException() throws UserNotFoundException, BadCredentialsException {
////        String password= "Password@123";
////        String encryptedPassword =passwordEncoder.encode(password);
////        Customer customer = Customer.builder().email("unit_test7@gmail.com").password(encryptedPassword).build();
//////        customerRepository.save(customer);
////        String username= customer.getEmail();
////        JwtRequest jwtRequest= new JwtRequest("unit_test7@gmail.com", "Password@1293");
////        when(customerRepository.findByEmail(customer.getEmail())).thenReturn(customer);
////        String response= String.valueOf(jwtAuthenticationController.createAuthenticationToken(jwtRequest));
////        assertNull(response);
////    }
//
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

