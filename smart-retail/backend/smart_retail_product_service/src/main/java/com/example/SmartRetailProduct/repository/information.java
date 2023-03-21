package com.example.SmartRetailProduct.repository;


import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class information {

    private String name;

    private String description;

    private String category;

    private long price;

//    private List<Variants> variants;




}
