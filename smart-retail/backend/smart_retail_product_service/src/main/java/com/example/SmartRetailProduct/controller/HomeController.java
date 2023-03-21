package com.example.SmartRetailProduct.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "*")
@RestController
@Api(tags = {"Home controller"})
public class HomeController {
    @ApiOperation(value = "Home")
    @GetMapping("/")
    public String home()
    {
        return "Product Service is working!";
    }
}
