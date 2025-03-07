// // 1. Declaration of Array of Objects
// ClassName[] arrayName = new ClassName[size];

// // 2. Creating and Initializing Objects
// arrayName[0] = new ClassName(parameters);
// arrayName[1] = new ClassName(parameters);

// // 3. Looping Through Objects
// for(int i = 0; i < arrayName.length; i++) {
//     arrayName[i].method();
// }

// Scenario: A company stores details of multiple 
// employees (ID, name, salary) using an array of objects.

class Employee7{
    int id;
    String name;
    double salary;

    // Constructor
    Employee7(int i, String n, double s){
        this.id = i;
        this.name = n;
        this.salary = s;
    }

    // Method to display employee details
     void display() {
        System.out.println("ID: " + id + ", Name: " + name + ", Salary: $" + salary);
    }
}

public class ArrayOfObjects7{
    public static void main(String[] args){
        // Creating an array of Employee objects
        Employee7[] employees  = new Employee7[3];

        // Initializing objects
        employees[0] = new Employee7(101, "Alice", 50000);
        employees[1] = new Employee7(102, "Bob", 60000);
        employees[2] = new Employee7(103, "Charlie", 55000);

        for(Employee7 e7: employees){
            e7.display();
        }
    }
}