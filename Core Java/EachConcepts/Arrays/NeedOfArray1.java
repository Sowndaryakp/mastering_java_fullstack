// Scenario: A company stores employee salaries for quick calculations instead of using multiple variables.

public class NeedOfArray1{
    public static void main(String[] args){
        int[] salaries = {5000, 6000, 9000};

        int totalSalary = 0;
        for(int i = 0; i<salaries.length;i++){
            totalSalary += salaries[i];
        }

        System.out.println("Total Salary: " + totalSalary);
    }
}