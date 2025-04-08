package com.crud.unittesting;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class EmployeeRepositoryTests {

    @Autowired
    EmployeeRepository employeeRepository;

    //JUnit test for saveEmployee
    @Test
    public void saveEmployeeTest(){
        Employee employee = Employee.builder()
                .firstName("sow")
                .lastName("shetty")
                .email("sow@gmail.com")
                        .build();

        employeeRepository.save(employee);
        Assertions.assertThat(employee.getId()).isGreaterThan(0);
    }

    @Test
    public void getEmployeeTest(){
        Employee employee = employeeRepository.findById(1L).get();

        Assertions.assertThat(employee.getId()).isEqualTo(1L);

    }

    @Test
    public void getListOfEmployeeTest(){
        List<Employee> employees = employeeRepository.findAll();
        Assertions.assertThat(employees.size()).isGreaterThan(0);

    }

    @Test
    public void updateEmployeeTest(){
        Employee employee = employeeRepository.findById(1L).get();
        employee.setEmail("ram@gmail.com");
        Employee employeeUpdated = employeeRepository.save(employee);
        Assertions.assertThat(employeeUpdated.getEmail()).isEqualTo("ram@gmail.com");

    }

    @Test
    public void deleteEmployeeTest(){

    }
}
