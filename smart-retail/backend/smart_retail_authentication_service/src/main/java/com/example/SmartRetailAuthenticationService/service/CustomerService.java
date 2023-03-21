package com.example.SmartRetailAuthenticationService.service;
import SmartRetailFramework.constants.ErrorCodes;

import com.example.SmartRetailAuthenticationService.dto.*;
import com.example.SmartRetailAuthenticationService.entity.UserProfile;
import com.example.SmartRetailAuthenticationService.entity.Customer;
import com.example.SmartRetailAuthenticationService.exception.domain.EmailExistException;
import com.example.SmartRetailAuthenticationService.exception.domain.EmailNotFoundException;
import com.example.SmartRetailAuthenticationService.exception.domain.GeneralException;
import com.example.SmartRetailAuthenticationService.repository.CustomerRepository;
import com.example.SmartRetailAuthenticationService.repository.UserProfileRepository;
import com.example.SmartRetailAuthenticationService.util.ProfileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.mail.MessagingException;


import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    ProfileUtil profileUtil;

    @Autowired
    UserProfileRepository userProfile_repository;

    @Autowired
    EmailService emailService;

    /**
     * Sign-up API
     * @param customer
     * @return
     * @throws EmailExistException
     */
    public ResponseEntity<Object> register(CustomerRegisterDTO customer ) throws EmailExistException {

        Optional<Customer> find_customer = Optional.ofNullable(customerRepository.findByPhoneNumberOrEmail(customer.getPhoneNumber(),customer.getEmail()));
        Customer new_customer = new Customer();
        if(find_customer.isPresent()){
            throw new EmailExistException(ErrorCodes.USER_ALREADY_EXISTS+" "+customer.getEmail());
        }
        else {


            new_customer.setName(customer.getName());
            new_customer.setEmail(customer.getEmail());
            new_customer.setPhoneNumber(customer.getPhoneNumber());
            String password= customer.getPassword();
            String encryptedPassword =passwordEncoder.encode(password);
            new_customer.setPassword(encryptedPassword);

            customerRepository.save(new_customer);

        }
        System.out.println(new_customer.getUserId());
//        int customerId=  new_customer.getUserId();

        UserProfile profile = new UserProfile();

        profile.setName(customer.getName());
        profile.setGender("");
        profile.setDate_of_birth("");
        profile.setParent_user(customerRepository.getById(new_customer.getUserId()));

        userProfile_repository.save(profile);
        return ResponseHandler.generateResponse("User has been successfully registered!", HttpStatus.OK, new_customer.getUserId());

    }

    /**
     * Customer profile API- Fixed fields display
     * @param response
     * @return
     * @throws Exception
     */
    public CustomerDTO getProfile(ProfileResponseToken response) throws GeneralException {
        String email = profileUtil.getUsernameByToken(response);
        Customer customer= customerRepository.findByEmail(email);
        if (email == null)
        {
            throw new GeneralException("Access denied!");
        }
        CustomerDTO customerDTO= new CustomerDTO(customer.getUserId(), customer.getName(), customer.getEmail(), customer.getPhoneNumber());
        return customerDTO;
    }


//    /**
//     * Personal Information API- Gender, DOB
//     * @param profile_id
//     * @param customerInformationDTO
//     * @return
//     */
//    public UserProfile setCustomerInformation(long profile_id, CustomerInformationDTO customerInformationDTO){
//
//
////        To store it in AllProfilesTable
//        UserProfile profile= userProfile_repository.findById(profile_id).get();
//
//        profile.setGender(customerInformationDTO.getGender());
//        profile.setDate_of_birth(customerInformationDTO.getDateOfBirth());
//        UserProfile answer = userProfile_repository.save(profile);
//
//
//        int parent_id = userProfile_repository.getById(profile_id).getParent_user().getUserId();
//
//        Customer customer= customerRepository.findById(parent_id).get();
//
//
//        customerRepository.save(customer);
//
//
//        return answer;
//    }




    public void sendMail(String email) throws MessagingException {
        Customer customer= customerRepository.findByEmail(email);
        String fname= customer.getName();
        emailService.sendEmail(email,
                "Reset Password Link",
                "Hi"+"\n"+fname+"," + "\n\n" +"Link for resetting your password"+"\n"+"'https://d170ul3ls6wwyw.cloudfront.net/digitailvr/forget-pass'"+ "\n\n"+ "Regards ,"+"\n"+"DigitailVR");
    }


    public String postMail(EmailDTO emailDTO) throws  MessagingException, EmailNotFoundException {
        String email= emailDTO.getEmailID();
        Customer customer= customerRepository.findByEmail(email);
        if (customer == null)
        {
            throw new EmailNotFoundException("given email is not registered!");
        }
        sendMail(email);
        return "Email sent";
    }


//
//    public void resetPassword(Customer customer) {
//        customerRepository.save(customer);
//    }

    public String resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO)
    {
        String email= resetPasswordDTO.getEmail();
        Customer customer= customerRepository.findByEmail(email);
        String password= resetPasswordDTO.getNewPassword();
        String encryptedPassword =passwordEncoder.encode(password);
        customer.setPassword(encryptedPassword);
        customerRepository.save(customer);
        return "Password Updated";
    }

}
