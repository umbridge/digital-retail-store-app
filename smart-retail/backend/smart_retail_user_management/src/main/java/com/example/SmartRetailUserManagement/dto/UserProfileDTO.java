package com.example.SmartRetailUserManagement.dto;


import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {

    long id;

    String name;

    String date_of_birth;

    String gender;

    Integer parent_user_id;
}
