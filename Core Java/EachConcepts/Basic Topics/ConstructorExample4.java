// SYNTAX:
// class ClassName {
//     // Default constructor
//     public ClassName() {
//         // Initialize object
//     }
    
//     // Parameterized constructor
//     public ClassName(dataType parameter) {
//         // Initialize object with parameter
//     }
// }

// (Employee Object Initialization)
// Scenario: A company creates employee objects
//  using a constructor to initialize attributes like name and ID.

class Employee4{
    private String name;
    private int age;

    public Employee4(String name, int age){
        this.name = name;
        this.age = age;
    }

    void display(){
        System.out.println("Employee Age: " + age + ", Name: " + name);
    }
}

public class ConstructorExample4 {
    public static void main(String[] args) {
        Employee4 emp1 = new Employee4("danu", 45);
        emp1.display();
    }
}
