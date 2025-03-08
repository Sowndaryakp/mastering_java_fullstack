// SYNTAX:
// // 1. Declaration & Memory Allocation
// dataType[][] arrayName = new dataType[rows][columns];

// // 2. Initialization at Declaration
// dataType[][] arrayName = { 
//     {value1, value2}, 
//     {value3, value4} 
// };

// // 3. Assigning Values Separately
// arrayName[row][col] = value;

// Scenario: A company stores the attendance of employees for 3 days in
//  a 2D array, where 1 means Present and 0 means Absent.

public class MultiDimensionalArray3{
    public static void main(String[] args){
        // 2D Array for Employee Attendance (Rows: Employees, Columns: Days)
    
        int[][] attendance = {
            {1, 0, 1}, // Employee 1
            {0, 1, 1}, // Employee 2
            {1, 1, 1}  // Employee 3
        };

         // Displaying Attendance Data
        System.out.println("Employee 1, Day 1: " + attendance[0][0]); // 1 (Present)
        System.out.println("Employee 2, Day 2: " + attendance[1][0]); // 0 (Absent)
        System.out.println("Employee 3, Day 3: " + attendance[2][2]); // 1 (Present)
    
    }
}