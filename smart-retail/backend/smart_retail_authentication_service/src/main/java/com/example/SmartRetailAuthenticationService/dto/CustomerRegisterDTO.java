package com.example.SmartRetailAuthenticationService.dto;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
//@Table(name="user")
public class CustomerRegisterDTO {
    private Integer userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String password;




}
