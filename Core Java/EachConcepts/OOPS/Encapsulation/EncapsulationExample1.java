// SYNTAX:
// class ClassName {
//     // Private variables (data hiding)
//     private dataType variableName;

//     // Getter method (accessor)
//     public dataType getVariableName() {
//         return variableName;
//     }

//     // Setter method (mutator)
//     public void setVariableName(dataType value) {
//         this.variableName = value;
//     }
// }

// (Employee Salary Management)
// Scenario: A company wants to encapsulate employee salary by hiding the 
// salary and providing controlled access via getter and setter methods.

class Employee1{
    private double salary;

    public double getSalary(){
        return salary;
    }

    public void setSalary(double salary){
        if(salary>0){
            this.salary = salary;
        }else {
            System.out.println("Invalid Salary!");
        }
    }
}



public class EncapsulationExample1 {
    public static void main(String[] args) {
        Employee1 e1 = new Employee1();

        e1.setSalary(4000);
        System.out.println("Employee Salary: " + e1.getSalary());

        e1.setSalary(-1000);//invalid salary

    }
}
