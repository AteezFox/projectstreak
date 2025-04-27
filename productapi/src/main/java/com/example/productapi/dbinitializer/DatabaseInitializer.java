package com.example.productapi.dbinitializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseInitializer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private DataSource dataSource;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE DATABASE IF NOT EXISTS streakdb");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
