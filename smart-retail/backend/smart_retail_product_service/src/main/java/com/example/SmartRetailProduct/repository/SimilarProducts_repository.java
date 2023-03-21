package com.example.SmartRetailProduct.repository;

import com.example.SmartRetailProduct.model.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SimilarProducts_repository extends JpaRepository<Variant, Long> {

    @Query(value = "SELECT s from Variant s where s.category = ?1 AND s.color = ?2 AND s.price > ?3 AND s.product_tag = ?4 AND s.id != ?5 ")
    List<Variant> Basicfilter(String category, String color, long price, String product_tag, long id);


    @Query(value = "SELECT s from Variant s where ?1 < (s.price * 1.5 )")
    List<Variant> PriceFilter(long price);
}
