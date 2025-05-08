package Array.com.example;
//An array with only one row (like a simple list).
public class ArrayExample {
    public static void main(String[] args){
        double[] lastTransaction = {1200.89, 1223.76, 3432, 57334, 62143.54};

        System.out.println("Last 5 transactions:-");
        for(int i=0; i<lastTransaction.length;i++){
            System.out.println("Transaction "+ (i+1) + ": ₹ " + lastTransaction[i]);
        }
    }
}
