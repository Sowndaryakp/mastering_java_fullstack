// Syntax:
// class ParentClass {
//     // Parent properties and methods
// }

// class ChildClass extends ParentClass {
//     // Child properties and methods
// }

// (Employee & Manager Inheritance)
// Scenario: In an employee management system, a Manager is a specialized 
// type of Employee, so it inherits common properties like name and salary.

class Employee1{
    private String name;
    private double salary;

    public Employee1(String name, double salary){
        this.name = name;
        this.salary = salary;
    }
    void display(){
        System.out.println("Employee Name: "+ name);
        System.out.println("Salary: "+ salary);
    }
}

class Manager1 extends Employee1{
    double bonus;

    public Manager1(String name, double salary, double bonus){
        super(name, salary); // call parent constructor
        this.bonus = bonus;
    }

    void displayDetails(){
        display(); //call parent method
        System.out.println("Bonus: $" + bonus);
    }
}

public class InheritanceExample1 {
    public static void main(String[] args) {
        Manager1 man = new Manager1("Sow", 50000, 25000);
        man.displayDetails();

    }
}
