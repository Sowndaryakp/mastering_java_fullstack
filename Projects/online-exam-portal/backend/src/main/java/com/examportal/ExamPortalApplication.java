package com.examportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.examportal.models")
@EnableJpaRepositories(basePackages = "com.examportal.repositories")
public class ExamPortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(ExamPortalApplication.class, args);
    }
} 