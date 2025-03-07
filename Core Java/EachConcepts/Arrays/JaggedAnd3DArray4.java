// // Jagged Array Declaration
// dataType[][] arrayName = new dataType[rows][]; 

// // Assigning different column sizes
// arrayName[0] = new dataType[size1]; 
// arrayName[1] = new dataType[size2]; 

// Scenario: A company tracks projects assigned to employees. Some employees 
// work on more projects than others, so a jagged array is used.

public class JaggedAnd3DArray4{
    public static void main(String[] args){
        // Creating a jagged array for employee projects
        String[][] employeeProjects = new String[3][];
        employeeProjects[0] = new String[]{"Project A", "Project B"};
        employeeProjects[1] = new String[]{"Project c"};
        employeeProjects[2] = new String[]{"Project D", "Project E"};

        // Displaying employee project data
        for(int i=0; i<employeeProjects.length;i++){
            System.out.print("Employee " + (i + 1) + " projects: ");
            for(String project: employeeProjects[i]){
                System.out.print(project + " ");
            }
            System.out.println();
        }
    }
}