package com.example.productapi.controller;

import com.example.productapi.dto.ProductDTO;
import com.example.productapi.dto.ProductPatchDTO;
import com.example.productapi.model.Product;
import com.example.productapi.repository.ProductRepository;
import com.example.productapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/streak/api/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/get")
    public List<ProductDTO> getAllProducts() {
        return productService.getProducts();
    }

    @GetMapping("/get/{size}/{page}")
    public List<ProductDTO> getProductsByPage(@PathVariable Integer size, @PathVariable Integer page) {
        return productService.getProductsPaginated(page, size);
    }

    @GetMapping("/get/{id}")
    public ProductDTO getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/get/company/{id}")
    public List<ProductDTO> getProductsByCompanyId(@PathVariable Long id) {
        return productService.getProductsByCompanyId(id);
    }


    @PostMapping("/add")
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO created = productService.createProduct(productDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /*@PutMapping("/update/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updated = productService.updateProduct(id, productDTO);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }*/

    @Autowired
    ProductRepository productRepository;

    @PatchMapping("/update/{id}")
    public ResponseEntity<Product> patchProduct(@PathVariable Long id, @RequestBody ProductPatchDTO patchDTO) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();

        if (patchDTO.getName() != null) {
            product.setName(patchDTO.getName());
        }
        if (patchDTO.getImage() != null) {
            product.setImage(patchDTO.getImage());
        }
        if (patchDTO.getDescription() != null) {
            product.setDescription(patchDTO.getDescription());
        }
        if (patchDTO.getPrice() != null) {
            product.setPrice(patchDTO.getPrice());
        }

        productRepository.save(product);

        return ResponseEntity.ok(product);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
