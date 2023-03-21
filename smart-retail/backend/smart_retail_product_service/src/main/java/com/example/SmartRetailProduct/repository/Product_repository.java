package com.example.SmartRetailProduct.repository;


import com.example.SmartRetailProduct.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface Product_repository extends JpaRepository<Product, Long> {

    List<Product> findByid(long id);

    List<Product> deleteByid(long id);






}
