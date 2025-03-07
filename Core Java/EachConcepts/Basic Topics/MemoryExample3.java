// Scenario: A company tracks employee details using objects, showing how memory is allocated in stack and heap.

class User3{
    String name; // Stored in Heap
    int id; // Stored in Heap

    User3(String n, int i){
        this.name = n;
        this.id = i;
    }

    void display(){
         System.out.println("User ID: " + id + ", Name: " + name);
    }
}

public class MemoryExample3{
    public static void main(String[] args){
        int localVariable = 100; // Stored in Heap

        //Creating Objects (Objects Stored in Heap, Reference stored in Stack(ex: use1, use2))
        User3 use1 = new User3("Ranju", 1);
        User3 use2 = new User3("Sow", 2);

        use1.display();
        use2.display();
    }
}