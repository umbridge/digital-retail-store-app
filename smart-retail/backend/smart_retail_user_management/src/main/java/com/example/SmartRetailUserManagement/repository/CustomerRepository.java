package com.example.SmartRetailUserManagement.repository;

import com.example.SmartRetailUserManagement.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findByEmail(String email);
    Customer findByPhoneNumber(Long phoneNumber);
    Customer findByPhoneNumberOrEmail(String phoneNumber, String email);

}
