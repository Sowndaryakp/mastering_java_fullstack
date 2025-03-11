// SYNTAX:
// class ClassName {
//     static {  
//         // Code inside static block  
//     }  
// }

// (Loading Database Driver Before Connection)
// Scenario: A company loads a database driver using a static block before any connection is made.

class Database3{
    static {
        System.out.println("Database Driver Loaded!");
    }

    static void connectionDB(){
        System.out.println("Database Connected Successfully!");
    }

}

public class StaticBlock3 {
    public static void main(String[] args) {
       Database3.connectionDB(); 
    }
}
