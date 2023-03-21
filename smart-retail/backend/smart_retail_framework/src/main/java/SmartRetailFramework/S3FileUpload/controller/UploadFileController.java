package SmartRetailFramework.S3FileUpload.controller;//package com.example.SmartRetail.S3FileUpload.controller;
//
//
//import java.util.HashMap;
//import java.util.Map;
//
//
//import com.example.SmartRetail.S3FileUpload.service.AWSS3Service;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//
//
//@RestController
//@RequestMapping("/api/file")
//public class UploadFileController {
//
//    @Autowired
//    private AWSS3Service awsS3Service;
//
//    @PostMapping
//    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
//        String publicURL = awsS3Service.uploadFile(file);
//        Map<String, String> response = new HashMap<>();
//        response.put("publicURL", publicURL);
//        return new ResponseEntity<Map<String, String>>(response, HttpStatus.CREATED);
//    }
//}