// SYNTAX:
// 1. Default Constructor:
// class ClassName {
//     public ClassName() {
//         // Initialize default values
//     }
// }

// 2. Parameterized Constructor:
// class ClassName {
//     public ClassName(dataType parameter) {
//         // Initialize with passed value
//     }
// }

// (Employee5 Object Creation)
// Scenario: A company creates Employee5 objects using default and parameterized constructors to initialize Employee5 information.

class Employee5 {
    private String name;
    private int empId;

    // Default Constructor (sets default values)
    public Employee5() {
        this.name = "Unknown";  // Default name
        this.empId = 0;         // Default empId
    }

    // Parameterized Constructor (sets custom values)
    public Employee5(String name, int empId) {
        this.name = name;
        this.empId = empId;
    }

    void display() {
        System.out.println("Employee5 ID: " + empId + ", Name: " + name);
    }
}

public class TypesOfConstructor5 {
    public static void main(String[] args) {
        // Using default constructor
        Employee5 emp1 = new Employee5();  // Default values
        emp1.display();
        
        // Using parameterized constructor
        Employee5 emp2 = new Employee5("John Doe", 101);  // Custom values
        emp2.display();
    }
}


