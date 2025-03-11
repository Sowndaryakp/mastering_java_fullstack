// One child class inherits from one parent class.
// Syntax:
// class Parent { }
// class Child extends Parent { }

class Employee2{
    String company = "Publicis Sapient";
}

class Developer2 extends Employee2{
    void display(){
        System.out.println("Company : " + company);
    }
}
public class SingleInheritance2 {
    public static void main(String[] args) {
        Developer2 dev = new Developer2();
        dev.display();
    }
}
