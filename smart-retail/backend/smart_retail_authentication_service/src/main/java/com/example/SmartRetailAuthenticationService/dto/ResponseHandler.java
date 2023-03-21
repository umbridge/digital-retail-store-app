package com.example.SmartRetailAuthenticationService.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseHandler {
    public ResponseHandler(String s, int i) {
    }

    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        map.put("message", message);
        map.put("userId", responseObj);

        return new ResponseEntity<Object>(map,status);
    }

    private ResponseHandler() {

    }

}
