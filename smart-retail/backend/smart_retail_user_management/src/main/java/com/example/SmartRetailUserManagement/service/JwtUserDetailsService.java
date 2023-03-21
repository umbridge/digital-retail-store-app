package com.example.SmartRetailUserManagement.service;
import com.example.SmartRetailUserManagement.entity.Customer;
import com.example.SmartRetailUserManagement.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(username);

        if(customer!=null) {
            return new User(customer.getEmail(), customer.getPassword(), getAuthorities());
        }
        throw new UsernameNotFoundException("Email id does not exist");
    }

    public Collection<GrantedAuthority> getAuthorities() {
    return new HashSet<GrantedAuthority>();
}


}