// Scenario: A company needs a method to process employee salary, but it should work for both full-time and 
// part-time employees with different inputs.
class EmployeeTypesSalary{
    double fullTimeSalary(double monthlySalary){
        return monthlySalary * 12;
    }

    double partTimeSalary(double hourlyWage, double hoursWorked){
        return hourlyWage * hoursWorked;
    }
}
public class MethodOverloading2{
    public static void main(String[] args){
        EmployeeTypesSalary e1 = new EmployeeTypesSalary();

        System.out.println("Full Time Employee Salary: $" + e1.fullTimeSalary(4900));

        System.out.println("Part Time Employee Salary: $" + e1.partTimeSalary(200.0, 120.0));

    }
     
}