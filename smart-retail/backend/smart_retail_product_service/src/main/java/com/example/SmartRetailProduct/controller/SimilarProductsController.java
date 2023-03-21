package com.example.SmartRetailProduct.controller;


import SmartRetailFramework.dto.ResponseHandler;
import com.example.SmartRetailProduct.model.Variant;
import com.example.SmartRetailProduct.repository.SimilarProducts_repository;
import com.example.SmartRetailProduct.repository.VariantRepository;
import com.example.SmartRetailProduct.service.SimilarProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*")
//Added it to the application.properties file
@RestController
@RequestMapping("/api")
public class SimilarProductsController {

    @Autowired
    VariantRepository variant_repository;

    @Autowired
    SimilarProducts_repository similarProducts_repository;

    @Autowired
    SimilarProductsService similarProducts_service;



    //Basic Filter based on Category and Price
    @GetMapping("/similarProducts/{category}/{color}/{price}/{product_tag}/{id}")
    public ResponseEntity<Object> getSimilarProducts(@PathVariable("category") String category,@PathVariable("color") String color,@PathVariable("price") long price, @PathVariable("product_tag") String product_tag ,@PathVariable("id") long id){
        return similarProducts_service.getSimilarProducts(category, color, price, product_tag, id);

    }
}
