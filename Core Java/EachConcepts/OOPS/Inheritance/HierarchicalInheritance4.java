// Multiple child classes inherit from one parent class.
// Sytanx:
// class Parent { }
// class Child1 extends Parent { }
// class Child2 extends Parent { }

class Employee4{
    String company = "CMTI";
}

class Developer4 extends Employee4{
    void coding(){
        System.out.println("Developer at "+ company);
    }
}

class Tester4 extends Employee4{
    void testing(){
        System.out.println("Tester at "+ company);
    }
}

public class HierarchicalInheritance4 {
    public static void main(String[] args) {
        Developer4 d = new Developer4();
        Tester4 t = new Tester4();

        d.coding();
        t.testing();
    }
}
