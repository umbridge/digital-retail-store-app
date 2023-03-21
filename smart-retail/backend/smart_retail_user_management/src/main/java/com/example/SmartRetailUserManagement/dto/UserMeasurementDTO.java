package com.example.SmartRetailUserManagement.dto;


import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserMeasurementDTO {

    long id;

    long profile_id;

    double height;

    String height_param;

    String shirt_size;

    String pant_size;


}
