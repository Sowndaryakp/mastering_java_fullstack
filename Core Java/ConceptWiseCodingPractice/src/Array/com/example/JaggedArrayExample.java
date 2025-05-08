package Array.com.example;

public class JaggedArrayExample {
    public static void main(String[] args){
//        int[][] transactions = new int[3][];
        int[][] transactions = {
                {1000, 2000},
                {500},
                {700, 800, 900}
        };

        for(int i = 0; i<transactions.length;i++){
            System.out.print("Customer "+ (i+1) + " Transactions: ");
            for(int j=0; j<transactions[i].length;j++){
                System.out.print(transactions[i][j] + " ");
            }
            System.out.println();
        }
    }
}
