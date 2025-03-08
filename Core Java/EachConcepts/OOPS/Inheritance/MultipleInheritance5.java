// MULTIPLE INHERITANCE (Not Supported in Java using Classes, but possible with Interfaces)
// A child class inherits from multiple parent classes using interfaces.

// Syntax (Using Interfaces):
// interface Parent1 { }
// interface Parent2 { }
// class Child implements Parent1, Parent2 { }

interface Frontend{
    void developUI();
}

interface Backend{
    void developAPI();
}

class FullstackDeveloper implements Frontend, Backend {
    public void developUI(){
        System.out.println("Building User Interface...");
    }

    public void developAPI(){
        System.out.println("Developing Backend API...");
    }
}

public class MultipleInheritance5 {
    public static void main(String[] args) {
        FullstackDeveloper dev = new FullstackDeveloper();
        dev.developUI();
        dev.developAPI();
    }
}
