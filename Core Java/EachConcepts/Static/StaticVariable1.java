// SYNTAX:
// class ClassName {
//     static dataType variableName = value; // Static variable
// }

// (Employee Count in a Company)
// Scenario: A company tracks the total number of employees using a static variable.

class Employee1{
    int empId;
    String empName;
    static int empCount = 0;

    Employee1(int i, String n){
        this.empId = i;
        this.empName = n;
        empCount++;
    }

    void display() {
        System.out.println("ID: " + empId + ", Name: " + empName);
    }
}

public class StaticVariable1 {
    public static void main(String[] args) {
        Employee1 e1 = new Employee1(102, "Ranjan");
        Employee1 e2 = new Employee1(103, "Anjan");

        e1.display();
        e2.display();

        System.out.println("Total Employees: " + Employee1.empCount);

    }
}
