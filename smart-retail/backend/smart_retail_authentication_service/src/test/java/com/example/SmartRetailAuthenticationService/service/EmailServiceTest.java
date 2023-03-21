package com.example.SmartRetailAuthenticationService.service;


import com.example.SmartRetailAuthenticationService.config.WebSecurityConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class EmailServiceTest {
    @Mock
    private JavaMailSender mailSender;
    @Mock
    public WebSecurityConfig webSecurityConfig;
    @InjectMocks
    EmailService emailService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);}

    @Test
    public void testEmailSenderReturnResponse(){
        SimpleMailMessage message = new SimpleMailMessage();
        String toEmail= "user7@gmail.com";
        String subject= "dummy";
        String body= "dummy body";
        message.setFrom(webSecurityConfig.email);
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        String response= emailService.sendEmail(toEmail,subject,body);
        assertEquals("Email sent!", response);
    }

}
