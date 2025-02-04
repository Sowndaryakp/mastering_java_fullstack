public class VariablesTypes 
{
    // Instance variable
    String name;
    
    // Static variable
    static String companyName = "TechCorp";
    
    public void displayDetails() {
        // Local variable
        int salary = 50000;
        System.out.println("Name: " + name);
        System.out.println("Company: " + companyName);
        System.out.println("Salary: " + salary);
    }

    public static void main(String[] args) {
        VariablesTypes ba = new VariablesTypes();
        ba.name = "sow";
        ba.displayDetails();
    }
}
