package com.example.SmartRetailProduct.dto;

import com.example.SmartRetailProduct.repository.information;
import lombok.*;

@Data
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private long id;

    private com.example.SmartRetailProduct.repository.information information;

}
