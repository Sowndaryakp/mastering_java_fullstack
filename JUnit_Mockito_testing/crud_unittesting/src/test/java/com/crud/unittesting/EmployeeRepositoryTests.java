package com.crud.unittesting;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest // Tells Spring Boot to configure only JPA-related components for testing
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Prevents Spring from replacing the real database with an in-memory one
public class EmployeeRepositoryTests {

    @Autowired
    EmployeeRepository employeeRepository; // Injects the EmployeeRepository bean for testing

    // Test case to verify saving an employee
    @Test
    public void saveEmployeeTest() {
        // Creating a new Employee object using the builder pattern
        Employee employee = Employee.builder()
                .firstName("sow")
                .lastName("shetty")
                .email("sow@gmail.com")
                .build();

        // Saving the employee to the database
        Employee savedEmployee = employeeRepository.save(employee);

        // Asserts that the employee's ID is generated and is greater than 0
        Assertions.assertThat(savedEmployee.getId()).isGreaterThan(0);
    }

    // Test case to verify fetching an employee by ID
    @Test
    public void getEmployeeTest() {
        // Create and save a new employee
        Employee employee = Employee.builder()
                .firstName("sow")
                .lastName("shetty")
                .email("sow@gmail.com")
                .build();
        Employee savedEmployee = employeeRepository.save(employee);

        // Try to find the saved employee by ID
        Optional<Employee> foundEmployee = employeeRepository.findById(savedEmployee.getId());

        // Assert that the employee was found
        Assertions.assertThat(foundEmployee).isPresent();
        // Assert that the ID matches
        Assertions.assertThat(foundEmployee.get().getId()).isEqualTo(savedEmployee.getId());
    }

    // Test case to verify listing all employees
    @Test
    public void getListOfEmployeeTest() {
        // Create and save a new employee
        Employee employee = Employee.builder()
                .firstName("sow")
                .lastName("shetty")
                .email("sow@gmail.com")
                .build();
        employeeRepository.save(employee);

        // Fetch all employees from the database
        List<Employee> employees = employeeRepository.findAll();

        // Assert that the list is not empty
        Assertions.assertThat(employees).isNotEmpty();
    }

    // Test case to verify updating an employee's details
    @Test
    public void updateEmployeeTest() {
        // Create and save a new employee
        Employee employee = Employee.builder()
                .firstName("sow")
                .lastName("shetty")
                .email("sow@gmail.com")
                .build();
        Employee savedEmployee = employeeRepository.save(employee);

        // Update the email field
        savedEmployee.setEmail("updated_email@gmail.com");

        // Save the updated employee
        Employee updatedEmployee = employeeRepository.save(savedEmployee);

        // Assert that the email was updated correctly
        Assertions.assertThat(updatedEmployee.getEmail()).isEqualTo("updated_email@gmail.com");
    }

    // Test case to verify deleting an employee
    @Test
    public void deleteEmployeeTest() {
        // Create and save a new employee
        Employee employee = Employee.builder()
                .firstName("sow")
                .lastName("shetty")
                .email("sow@gmail.com")
                .build();
        Employee savedEmployee = employeeRepository.save(employee);

        // Delete the saved employee
        employeeRepository.delete(savedEmployee);

        // Try to find the employee by email
        Optional<Employee> optionalEmployee = employeeRepository.findByEmail("sow@gmail.com");

        // Assert that the employee no longer exists
        Assertions.assertThat(optionalEmployee).isNotPresent();
    }
}
