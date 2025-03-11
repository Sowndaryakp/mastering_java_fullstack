//A child class inherits from another child class, forming a chain.
//Syntax:
// class GrandParent { }
// class Parent extends GrandParent { }
// class Child extends Parent { }

class CEO3{
    String company = "CMTI";
}

class Manager3 extends CEO3{
    String department = "IT";
}

class Employee3 extends Manager3{
    void display(){
        System.out.println("Company: "+company + "; Department: " + department);
    }
}

public class MultilevelInheritance3 {
    public static void main(String[] args) {
        Employee3 emp =new Employee3();
        emp.display();
    }
}
