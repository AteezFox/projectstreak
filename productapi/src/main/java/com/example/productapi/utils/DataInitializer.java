package com.example.productapi.utils;

import com.example.productapi.enums.Category;
import com.example.productapi.model.Product;
import com.example.productapi.model.User;
import com.example.productapi.model.Company;
import com.example.productapi.enums.UserType;
import com.example.productapi.repository.ProductRepository;
import com.example.productapi.repository.UserRepository;
import com.example.productapi.repository.CompanyRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final ProductRepository productRepository;

    public DataInitializer(UserRepository userRepository, CompanyRepository companyRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void init() {
        List<User> users = List.of(
                new User("John", "Doe", "john.doe@company.com", "password123", "123-456-7890", "123 Elm Street", UserType.CEO),
                new User("Jane", "Smith", "jane.smith@company.com", "password123", "123-456-7891", "124 Elm Street", UserType.CEO),
                new User("Bob", "Johnson", "bob.johnson@company.com", "password123", "123-456-7892", "125 Elm Street", UserType.CEO),
                new User("Alice", "Brown", "alice.brown@company.com", "password123", "123-456-7893", "126 Elm Street", UserType.CEO),
                new User("Charlie", "Davis", "charlie.davis@company.com", "password123", "123-456-7894", "127 Elm Street", UserType.CEO),
                new User("Courier1", "One", "courier1@example.com", "password123", "123-555-7890", "Courier Address 1", UserType.COURIER),
                new User("Courier2", "Two", "courier2@example.com", "password123", "123-555-7891", "Courier Address 2", UserType.COURIER),
                new User("Courier3", "Three", "courier3@example.com", "password123", "123-555-7892", "Courier Address 3", UserType.COURIER),
                new User("Admin", "User", "admin@example.com", "password123", "123-555-0000", "Admin HQ", UserType.ADMIN)
        );

        userRepository.saveAll(users);

        List<Company> companies = List.of(
                new Company(users.get(0).getId(), "Doe Enterprises"),
                new Company(users.get(1).getId(), "Smith Innovations"),
                new Company(users.get(2).getId(), "Johnson Solutions"),
                new Company(users.get(3).getId(), "Brown Technologies"),
                new Company(users.get(4).getId(), "Davis Ventures")
        );

        companyRepository.saveAll(companies);

        List<Product> products = List.of(
                new Product(companies.get(0).getId(), "Margherita Pizza", "https://cdn.discordapp.com/attachments/1366069139734663238/1366115032143888517/Minimalist_Margherita_Pizza_Design.png", "Classic margherita pizza with fresh basil.", Category.PIZZA, 8.99),
                new Product(companies.get(0).getId(), "Pepperoni Feast", "https://cdn.discordapp.com/attachments/1366069139734663238/1366115032609591466/Minimalist_Pepperoni_Pizza_Icon.png", "Loaded with spicy pepperoni and mozzarella.", Category.PIZZA, 10.99),
                new Product(companies.get(0).getId(), "Veggie Supreme", "https://cdn.discordapp.com/attachments/1366069139734663238/1366115827413159986/BBQ_Chicken_Pizza_Delight.png", "A colorful mix of vegetables on a crispy base.", Category.PIZZA, 9.49),
                new Product(companies.get(0).getId(), "BBQ Chicken Pizza", "https://cdn.discordapp.com/attachments/1366069139734663238/1366115032609591466/Minimalist_Pepperoni_Pizza_Icon.png", "Savory BBQ sauce and grilled chicken.", Category.PIZZA, 11.49),
                new Product(companies.get(0).getId(), "Four Cheese Delight", "https://cdn.discordapp.com/attachments/1366069139734663238/1366115034924843008/Minimalist_Cheese_Pizza_Delights.png", "Melted blend of four rich cheeses.", Category.PIZZA, 10.49),
                new Product(companies.get(1).getId(), "Classic Cheeseburger", "https://media.discordapp.net/attachments/1366069139734663238/1366115035566309446/Minimalist_Cheeseburger_Illustration.png", "Juicy beef patty with melted cheese.", Category.BURGER, 7.99),
                new Product(companies.get(1).getId(), "Bacon Double Burger", "https://media.discordapp.net/attachments/1366069139734663238/1366115827924865117/Double_Bacon_Burger_Delight.png", "Double beef with crispy bacon.", Category.BURGER, 9.99),
                new Product(companies.get(1).getId(), "Veggie Burger", "https://media.discordapp.net/attachments/1366069139734663238/1366115833603948664/Jalapeno_Burger_Delight.png", "Healthy plant-based patty with fresh toppings.", Category.BURGER, 8.49),
                new Product(companies.get(1).getId(), "Spicy Jalapeno Burger", "https://media.discordapp.net/attachments/1366069139734663238/1366115833603948664/Jalapeno_Burger_Delight.png", "Kick of spice with jalapenos and pepper jack.", Category.BURGER, 9.49),
                new Product(companies.get(1).getId(), "Mushroom Swiss Burger", "https://media.discordapp.net/attachments/1366069139734663238/1366115033796575282/Mushroom_Swiss_Burger_Illustration.png", "Earthy mushrooms and Swiss cheese.", Category.BURGER, 8.99),
                new Product(companies.get(2).getId(), "Classic Chicken Gyros", "https://media.discordapp.net/attachments/1366069139734663238/1366115034501222410/Pita_Wrap_with_Fresh_Ingredients.png", "Tender chicken wrapped in soft pita.", Category.GYROS, 7.49),
                new Product(companies.get(2).getId(), "Beef Gyros Deluxe", "https://media.discordapp.net/attachments/1366069139734663238/1366115031581720607/Minimalist_Gyro_Sandwich_Illustration.png", "Succulent beef slices with tzatziki.", Category.GYROS, 8.49),
                new Product(companies.get(2).getId(), "Falafel Gyros", "https://media.discordapp.net/attachments/1366069139734663238/1366115034501222410/Pita_Wrap_with_Fresh_Ingredients.png", "Crispy falafel and fresh veggies.", Category.GYROS, 7.99),
                new Product(companies.get(2).getId(), "Spicy Lamb Gyros", "https://media.discordapp.net/attachments/1366069139734663238/1366115031581720607/Minimalist_Gyro_Sandwich_Illustration.png", "Lamb gyros with a spicy twist.", Category.GYROS, 9.49),
                new Product(companies.get(2).getId(), "Mediterranean Gyros", "https://media.discordapp.net/attachments/1366069139734663238/1366115034501222410/Pita_Wrap_with_Fresh_Ingredients.png", "Light and refreshing gyros option.", Category.GYROS, 8.99),
                new Product(companies.get(3).getId(), "Tropical Mango Juice", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121486338883775/Vibrant_Fast_Food_Cup_Illustration.png", "Refreshing mango juice blend.", Category.JUICE, 4.49),
                new Product(companies.get(3).getId(), "Berry Blast Shake", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121506236534825/Orange_Cup_with_Straw.png", "Creamy shake bursting with berries.", Category.SHAKE, 5.49),
                new Product(companies.get(3).getId(), "Classic Cola", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121486338883775/Vibrant_Fast_Food_Cup_Illustration.png", "All-time favorite fizzy drink.", Category.SODA, 2.49),
                new Product(companies.get(3).getId(), "Chocolate Milkshake", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121506236534825/Orange_Cup_with_Straw.png", "Rich chocolate flavor.", Category.SHAKE, 5.99),
                new Product(companies.get(3).getId(), "Sparkling Orange Soda", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121486338883775/Vibrant_Fast_Food_Cup_Illustration.png", "Citrusy sparkling treat.", Category.SODA, 2.99),
                new Product(companies.get(4).getId(), "Lunch Combo Menu", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121486955315351/Fast_Food_Delight_in_Retro_Style.png", "Burger, fries, and drink combo.", Category.MENU, 11.99),
                new Product(companies.get(4).getId(), "Family Feast Menu", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121506714816633/Delicious_Fast_Food_Trio.png", "A full meal for the whole family.", Category.MENU, 24.99),
                new Product(companies.get(4).getId(), "Kids Menu", "https://cdn.discordapp.com/attachments/1366069139734663238/1366121486955315351/Fast_Food_Delight_in_Retro_Style.png", "Smaller portions for the little ones.", Category.MENU, 7.99)
        );

        productRepository.saveAll(products);
    }
}
