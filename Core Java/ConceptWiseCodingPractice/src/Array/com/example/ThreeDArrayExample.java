package Array.com.example;
//Array of arrays of arrays (like cube/multiple tables).
//Why: Complex scenarios like multiple bank branches → customers → transactions.
//Scenario: Store 2 branches with 2 customers each having deposit and withdrawal.
public class ThreeDArrayExample {
    public static void main(String[] args){
        int[][][] bankData = {
                {{1000, 500}, {2000, 1000}}, //Branch 1
                {{1500, 700}, {2500, 1200}}  //Branch 2
        };

        for(int i=0;i<bankData.length;i++){
            System.out.println("Branch "+(i+1) + " Data:");
            for(int j = 0; j< bankData[i].length; j++){
                System.out.println(" Customer "+ (j+1) + " -Deposit: " + bankData[i][j][0] + ", Withdrawal: " + bankData[i][j][1]);
            }
        }
    }
}
