// // 1. Declaration & Memory Allocation
// dataType[] arrayName = new dataType[size];

// // 2. Initialization at Declaration
// dataType[] arrayName = {value1, value2, value3};

// // 3. Separate Declaration & Initialization
// dataType[] arrayName = new dataType[size]; 
// arrayName[index] = value; // Assigning values

// Scenario: A company stores daily sales revenue for a week using an array instead of multiple variables.

public class CreationOfArray2{
    public static void main(String[] args){
        //creating an array for daily sales
        double[] sales = new double[3];

        sales[0] = 1200.30;
        sales[1] = 1300.33;
        sales[2] = 2300.29;

         // Displaying sales data
        System.out.println("Sales on Day 1: $" + sales[0]);
        System.out.println("Sales on Day 7: $" + sales[2]);
    }
}