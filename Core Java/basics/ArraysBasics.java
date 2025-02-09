class Student{
    int rollNo;
    String name;
    int marks;
}
public class ArraysBasics {
    public static void main(String[] args) {

        // //Single Dimensional Array
        // int nums[] = {5,3,6,7}; 
        // nums[1] = 5;
        // System.out.println(nums[1]);
        //or
        // int nums[] = new int[4];
        // nums[0] = 5;
        // nums[1] = 3;
        // nums[2] = 6;
        // nums[3] = 7;
        

        // for(int i=0;i<4;i++){
        //     System.out.println(nums[i]);
        // }

        // //Multi Dimensional Array
        // int nums[][] = new int[3][4];

        // for(int i=0;i<3;i++){
        //     for(int j=0;j<4;j++){
        //         nums[i][j]= (int) (Math.random() * 10);
        //         // System.out.println(nums[i][j]);
        //     }
        // }
        
        // Normal for loop
        // for(int i=0;i<3;i++){
        //     for(int j=0;j<4;j++){
        //         System.out.print(nums[i][j] + " ");
        //     }
        //     System.out.println();
        // }

        // //Enhanced For loop
        // for(int n[] : nums){
        //     for(int m : n){
        //         System.out.print(m + " ");
        //     }
        //     System.out.println();
        // }

        // // +++++++++++++++++++++++++++++++++++++++++++++++
        // //jagged and 3D Array

        // //Jagged array
        //above same doing for jagged
        //  int nums[][] = new int[3][];
        //  nums[0] = new int[3];
        //  nums[1] = new int[4];
        //  nums[2] = new int[2];

        // for(int i=0;i<nums.length;i++){
        //     for(int j=0;j<nums[i].length;j++){
        //         nums[i][j]= (int) (Math.random() * 10);
        //         // System.out.println(nums[i][j]);
        //     }
        // }

        // for(int n[] : nums){
        //     for(int m : n){
        //         System.out.print(m + " ");
        //     }
        //     System.out.println();
        // }

        // // +++++++++++++++++++++++++++++++++++++++++++++++
        // 3D Array



        // //Drawbacks of Array
        // once we fix the size of array we cant change the size.
        //when we search insert etc it will take lot of time.
        //we cant change data type this is also one drawback.

        // //Array of Objects
        Student s1 = new Student();
        s1.rollNo = 1;
        s1.name = "Sow";
        s1.marks = 20;

        Student s2 = new Student();
        s2.rollNo = 2;
        s2.name = "Sona";
        s2.marks = 30;

        Student s3 = new Student();
        s3.rollNo = 3;
        s3.name = "Ranju";
        s3.marks = 40;

        //System.out.println(s1); //it will print the address value like this Stduent@7sg034
        //System.out.println(s1.rollNo + " : " + s1.name + " : " + s1.marks); //op: 1 : Sow : 20

        Student students[] = new Student[3];
        students[0] = s1;
        students[1] = s2;
        students[2] = s3;

        // for(int i=0; i<students.length;i++){
        //     System.out.println(students[i].rollNo + " : " + students[i].name + " : " + students[i].marks );
        // }

        for(Student stud  : students){
            System.out.println(stud.rollNo + " : " + stud.name + " : " + stud.marks );
        }
    }
    
}
