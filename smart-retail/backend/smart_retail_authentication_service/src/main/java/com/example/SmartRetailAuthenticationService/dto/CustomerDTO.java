package com.example.SmartRetailAuthenticationService.dto;


import lombok.*;

import javax.persistence.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
//@Table(name="user")
public class CustomerDTO {
    private Integer userId;
    private String name;
    private String email;
    private String phoneNumber;




}