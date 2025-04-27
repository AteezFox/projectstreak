package com.example.productapi.controller;

import com.example.productapi.dto.CompanyDTO;
import com.example.productapi.dto.CompanyPatchDTO;
import com.example.productapi.model.Company;
import com.example.productapi.repository.CompanyRepository;
import com.example.productapi.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/streak/api/companies")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @GetMapping("/get")
    public List<CompanyDTO> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/get/{id}")
    public CompanyDTO getCompanyById(@PathVariable Long id){
        return companyService.getCompanyById(id);
    }

    @GetMapping("/get/ceo/{ceoID}")
    public CompanyDTO getCompanyByCEO(@PathVariable Long ceoID){
        return companyService.getByCEOID(ceoID);
    }

    @PostMapping("/add")
    public ResponseEntity<CompanyDTO> addCompany(@RequestBody CompanyDTO companyDTO){
        CompanyDTO created = companyService.createCompany(companyDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @Autowired
    CompanyRepository companyRepository;
    @PatchMapping("/update/{id}")
    public ResponseEntity<Company> patchCompany(@PathVariable Long id, @RequestBody CompanyPatchDTO patchDTO) {
        Optional<Company> optionalCompany = companyRepository.findById(id);

        if (optionalCompany.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Company company = optionalCompany.get();

        if (patchDTO.getName() != null) {
            company.setName(patchDTO.getName());
        }

        companyRepository.save(company);

        return ResponseEntity.ok(company);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id){
        companyService.deleteCompanyById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
