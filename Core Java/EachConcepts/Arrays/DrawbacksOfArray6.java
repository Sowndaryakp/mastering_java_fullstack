// Scenario: A company stores employee IDs in an array but faces 
// issues when a new employee joins or an old one leaves.
import java.util.Arrays;

public class DrawbacksOfArray6{
    public static void main(String[] args){
         // Employee IDs stored in an array (Fixed size)
        int[] employeeIds = {101, 102, 103, 104, 105};

        // Trying to add a new employee (Not possible in arrays)
        int newEmployee = 106;
        employeeIds = Arrays.copyOf(employeeIds, employeeIds.length + 1); // Creating a new array
        employeeIds[employeeIds.length - 1] = newEmployee;

        // Printing the updated array
        System.out.println("Updated Employee IDs: " + Arrays.toString(employeeIds));
    }
}