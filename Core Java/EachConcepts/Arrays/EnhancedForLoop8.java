// SYNTAX:
// for (dataType variable : collectionOrArray) {
//     // Code to execute for each element
// }

// Scenario: A company wants to print all employee names from an array without using an index.

public class EnhancedForLoop8{
    public static void main(String[] args){
        String[] name = {"RANJU", "ANJU", "MANJU"};

        for(String names : name){
            System.out.println(names);
        }
    }
}