// SYNTAX:
// class ClassName {
//     static void methodName() {
//         // Method body
//     }
// }

//calling a static method
// ClassName.methodName(); // No object needed

// (Database Connection Helper Method)
// Scenario: A company needs a common method to connect to a database, so they use a static method.

class Database2{
    static void connectionDB(){
        System.out.println("Database Connected Successfully!");
    }
}
public class StaticMethod2 {
    public static void main(String[] args) {
        Database2.connectionDB();
    }
}
