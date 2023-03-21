package com.example.SmartRetailAuthenticationService.repository;

import com.example.SmartRetailAuthenticationService.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findByEmail(String email);
    Customer findByPhoneNumber(Long phone_number);
    Customer findByPhoneNumberOrEmail(String phone_number, String email);

    @Query(value = "SELECT i from Customer i WHERE i.email = ?1 ")
    Integer findUserID(String email);

}
