// Syntax: 
// class Parent {
//     void show() {
//         System.out.println("Parent class method");
//     }
// }

// class Child extends Parent {
//     @Override
//     void show() {
//         System.out.println("Child class method");
//     }
// }

// public class Main {
//     public static void main(String[] args) {
//         Parent ref;  // Parent class reference

//         ref = new Child(); // Assign child object to parent reference
//         ref.show(); // Calls Child's overridden method at runtime
//     }
// }

class Database {
    void connect() {
        System.out.println("Connecting to a generic database...");
    }
}

class MySQLDatabase extends Database {
    @Override
    void connect() {
        System.out.println("Connected to MySQL Database.");
    }
}

class PostgreSQLDatabase extends Database {
    @Override
    void connect() {
        System.out.println("Connected to PostgreSQL Database.");
    }
}

public class DynamicMethodDispatchORRuntimePoly {
    public static void main(String[] args) {
        Database db; // Parent class reference

        db = new MySQLDatabase();  
        db.connect();  // Calls MySQL connection

        db = new PostgreSQLDatabase();
        db.connect();  // Calls PostgreSQL connection
    }
}
