package com.example.SmartRetailUserManagement.dto;

import lombok.*;


@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerInformationDTO {
    private String gender;
    private String dateOfBirth;
}
