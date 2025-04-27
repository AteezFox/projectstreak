package com.example.productapi.service;

import com.example.productapi.converter.CompanyConverter;
import com.example.productapi.dto.CompanyDTO;
import com.example.productapi.model.Company;
import com.example.productapi.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<CompanyDTO> getAllCompanies() {
        return companyRepository.findAll().stream().map(CompanyConverter::toDTO).collect(Collectors.toList());
    }

    public CompanyDTO getCompanyById(Long companyId) {
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new RuntimeException("Company not found"));
        return CompanyConverter.toDTO(company);
    }

    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        Company company = CompanyConverter.toEntity(companyDTO);
        Company savedCompany = companyRepository.save(company);
        return CompanyConverter.toDTO(savedCompany);
    }


    public CompanyDTO getByCEOID(Long ceoID) {
        Company company = companyRepository.findByUserId(ceoID).orElseThrow(() -> new RuntimeException("Company not found"));
        return CompanyConverter.toDTO(company);
    }

    public void deleteCompanyById(Long companyId) {
        if(!companyRepository.existsById(companyId)) {
            throw new RuntimeException("Company not found");
        }
        companyRepository.deleteById(companyId);
    }

   @Autowired
   ProductService productService;
    public void deleteCompanyByUserId(Long userId) {
        if(!companyRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        Company toDelete = companyRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
        productService.deleteProductsByCompanyId(toDelete.getId());
        companyRepository.delete(toDelete);

    }


}
