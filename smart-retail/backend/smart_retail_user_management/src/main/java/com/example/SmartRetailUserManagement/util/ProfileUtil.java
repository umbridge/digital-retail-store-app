package com.example.SmartRetailUserManagement.util;


import com.example.SmartRetailUserManagement.dto.ProfileResponseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProfileUtil {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public String getUsernameByToken(ProfileResponseToken response){
        String token = response.getToken();
        token = token.substring(7, token.length());
        return this.jwtTokenUtil.getUsernameFromToken(token);
    }
}