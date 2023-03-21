package com.example.SmartRetailProduct.controller;


import com.example.SmartRetailProduct.model.Size;
import com.example.SmartRetailProduct.dto.*;

import com.example.SmartRetailProduct.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin(origins = "*")
//@Api(tags = {"Variant Controller"})
@RestController
@RequestMapping("/api")
@Transactional
public class VariantController {




    @Autowired
    VariantService variant_service;

    //Add variants
    @PostMapping("/variant")
    public ResponseEntity<Object> addVariant(@RequestBody VariantDTO variant) {
        return variant_service.addVariant(variant);

    }

    @GetMapping("/product/variant/{product_id}")
    public ResponseEntity<Object> getVariantsByProductId(@PathVariable("product_id") long product_id){
        return variant_service.getVariantsByProductId(product_id);
    }

    @PutMapping("/variant/update/{size_id}")
    public ResponseEntity<Size> updateSize(@PathVariable("size_id") long size_id) {
        return variant_service.updateSize(size_id);

    }

    //to get a particular product based on the variant id
    @GetMapping("/product/getVariant/{variants_id}")
    public ResponseEntity<Object> getVariantsByVariantsId(@PathVariable("variants_id") long variants_id){
        return variant_service.getVariantsByVariantsId(variants_id);

    }


    //Adding a new size to a particular variant
    @PostMapping("/addSize")
    public ResponseEntity<Object> addSize(@RequestBody SizeDTO sizes) {
        return variant_service.addSize(sizes);

    }


    //getting just the product id from the variant id
    @GetMapping("/product/getProductID/{variants_id}")
    public ResponseEntity<Object> getProductIDByVariantsId(@PathVariable("variants_id") long variants_id){
        return variant_service.getProductIDByVariantsId(variants_id);

    }


//    Get all the variants
    @GetMapping("/variants")
    public ResponseEntity<Object> getAllVariants(){
        return variant_service.getAllVariants();

    }

    @PostMapping("/addMultipleVariants")
    public Integer addMultipleVariants(@RequestBody List<VariantDTO> listOfVariants){
        return variant_service.addMultipleProducts(listOfVariants);

    }


    @DeleteMapping("/deleteAllVariants")
    public String deleteAllVariants(){
        return variant_service.deleteAllVariants();

    }


}
