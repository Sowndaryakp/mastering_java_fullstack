// Syntax:
// class Parent {
//     void show() {
//         System.out.println("Parent class method");
//     }
// }

// class Child extends Parent {
//     @Override
//     void show() {
//         System.out.println("Child class method");
//     }
// }

// (Employee & Manager Bonus Calculation)
// Scenario:
// In an IT company, all employees get a standard bonus, but managers get 
// an extra bonus. Instead of modifying the base Employee class, we override
//  the calculateBonus() method in the Manager class.

// Parent class
class Employee6{
    double salary = 50000;

    void calculateBonus(){
        System.out.println("Employee Bonus: $"+ (salary * 0.10));
    }
}

//Child class Overriding the method
class Manager6 extends Employee6{
    @Override
    void calculateBonus(){
        System.out.println("Manager Bonus: $"+ (salary * 0.20));
    }
}


public class MethodOverriding6 {
    public static void main(String[] args) {
        Employee6 emp = new Employee6();
        emp.calculateBonus();

        Manager6 man = new Manager6();
        man.calculateBonus();

    }
}
