// SYNTAX:
// // 1. Creating a String
// String str = "Hello, Java!"; 

// // 2. String Methods Example
// int length = str.length();         // Get length of the string
// String upper = str.toUpperCase();  // Convert to uppercase
// String sub = str.substring(7, 11); // Extract substring

// Scenario: A web application checks if a username starts with "Admin" using startsWith().

public class StringExample1 {
    public static void main(String[] args) {
        String username = "Admin";

        //check if username starts with "Admin"
        if(username.startsWith("Admin")){
            System.out.println("Welcome, Admin User!");
        } else{
            System.out.println("Welcome, Regular User!");
        }
    }
}
