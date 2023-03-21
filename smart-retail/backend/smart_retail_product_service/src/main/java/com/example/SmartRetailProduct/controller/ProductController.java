package com.example.SmartRetailProduct.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.SmartRetailProduct.dto.ProductDTO;
import com.example.SmartRetailProduct.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;



import com.example.SmartRetailProduct.model.Product;
import com.example.SmartRetailProduct.repository.Product_repository;

import SmartRetailFramework.dto.ResponseHandler;

@CrossOrigin(origins = "*")
//Added it to the application.properties file
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    Product_repository product_repository;

    @Autowired
    ProductService product_service;

    //get particular product details based on ID
    @GetMapping("/product/{category}/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable("id") long id) {
        return product_service.getProductById(id);
    }

    @GetMapping("/product/{id}/category")
    public ResponseEntity<Object> getCategory(@PathVariable("id") long id) {
        return product_service.getCategory(id);

    }

    @GetMapping("/products")
    public ResponseEntity<Object> getAllProducts(){
        return product_service.getAllProducts();

    }



    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") long id, @RequestBody ProductDTO product) {
        return product_service.updateProduct(id,product);

    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") long id) {
        return product_service.deleteProduct(id);

    }

    @PostMapping("/product")
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO product) {
        return product_service.addProduct(product);

    }

    @PostMapping("/addMultipleProducts")
    public List<Product> addMultipleProducts(@RequestBody List<Product> listOfProducts){
        return product_service.addMultipleProducts(listOfProducts);

    }

    @DeleteMapping("/deleteAllProducts")
    public String deleteAllProducts(){
        return product_service.deleteAllProducts();

    }


}
