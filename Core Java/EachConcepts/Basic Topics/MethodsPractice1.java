// Scenario: A company needs a method to calculate an employee's annual salary.

class Employee1{
    double calculateAnualSalary(double monthlySalary){
        return monthlySalary * 12;
    }
}

public class MethodsPractice1{
    public static void main(String[] args){
        Employee1 emp1 = new Employee1();
        double anualSalary = emp1.calculateAnualSalary(4000);
        System.out.println("Anual Salary: " + anualSalary);
    }
}

// // to compile cmd : javac MethodsPractice1.java
// to run cmd : java MethodsPractice1