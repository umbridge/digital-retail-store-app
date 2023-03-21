package com.example.SmartRetailAuthenticationService.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {

    long id;

    String name;

    String date_of_birth;

    String gender;

    Integer parent_user_id;
}
