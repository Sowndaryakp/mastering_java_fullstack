// SYNTAX:
// // 3D Array Declaration
// dataType[][][] arrayName = new dataType[x][y][z]; 

// // Assigning values
// arrayName[0][0][0] = value;

// Scenario: A company tracks 3 employees’ shift hours over 2 weeks, with each week having 5 working days.

public class ThreeDArray5{
    public static void main(String[] args){
        // 3D Array for Employee Shift Records [Employee][Week][Day]
        int[][][] shifts = {
            {{8, 9, 10, 7}, {9, 9, 7, 8}}, // Employee 1 (2 weeks)
            {{7, 9, 8, 7}, {8, 9, 8, 8}},  // Employee 2 (2 weeks)
            {{8, 9, 9, 7}, {9, 9, 9, 8}}  // Employee 3 (2 weeks)
        };

         // Displaying Employee 1's shifts in Week 2, Day 3
        System.out.println("Employee 1, Week 2, Day 3 Shift: " + shifts[0][1][2] + " hours");
    
    }
}