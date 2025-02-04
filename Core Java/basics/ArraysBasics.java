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
        int nums[][] = new int[3][4];

        for(int i=0;i<3;i++){
            for(int j=0;j<4;j++){
                nums[i][j]= (int) (Math.random() * 10);
            }
        }
        
        // Normal for loop
        // for(int i=0;i<3;i++){
        //     for(int j=0;j<4;j++){
        //         System.out.print(nums[i][j] + " ");
        //     }
        //     System.out.println();
        // }

        // //Enhanced For loop
        for(int n[] : nums){
            for(int m : n){
                System.out.print(m + " ");
            }
            System.out.println();
        }

    }
    
}
