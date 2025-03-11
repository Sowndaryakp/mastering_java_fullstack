// SYNTAX:
// class ClassName {
//     private dataType variableName; // Private variable

//     // Getter method
//     public dataType getVariableName() {
//         return variableName;
//     }

//     // Setter method
//     public void setVariableName(dataType value) {
//         this.variableName = value; // or add validation here
//     }
// }

// (Employee Profile Management)
// Scenario: A company wants to manage employee names and ages using 
// getters and setters to ensure the data is accessed and updated safely.

class Employee2{
    private String name;
    private int age;

    public String getName(){
        return name;
    }

    public void setName(String n){
        this.name = n;
    }

    public int getAge(){
        return age;
    }

    public void setAge(int a){
        if(age > 0){
            this.age = a;
        }else{
            System.out.println("Age must be positive");
        }    
    }
}
public class GetterAndSetter2 {
    public static void main(String[] args) {
        Employee2 emp = new Employee2();

        emp.setName("JATH");
        emp.setAge(23);

        System.out.println("Employee Name: "+ emp.getName());
        System.out.println("Employee Age: " + emp.getAge());

        // emp.setAge(-1);
    }
}
