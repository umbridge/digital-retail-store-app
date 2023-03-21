package com.example.SmartRetailProduct.repository;

import com.example.SmartRetailProduct.model.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VariantRepository extends JpaRepository<Variant, Long> {


    @Query(value = "Select v from Variant v where v.product_id.id = ?1 ")
    List<Variant> getVariants(long product_id);



}
