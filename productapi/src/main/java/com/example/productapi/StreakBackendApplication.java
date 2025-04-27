package com.example.productapi;

import com.example.productapi.utils.DataInitializer;
import com.example.productapi.utils.DatabaseCreator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StreakBackendApplication {

	public static void main(String[] args) {
		DatabaseCreator.init();
		SpringApplication.run(StreakBackendApplication.class, args);
	}

}
