package Array.com.example;
//An array of arrays — looks like a table or matrix (rows × columns).
//Why: To represent tabular data like bank transactions for multiple customers
//Scenario: Store transaction amount (Deposit, Withdrawal) for 3 customers.
public class TwoDArrayExample {
    public static void main(String[] args){
        int[][] transactions = {
                {1000, 500},
                {2000, 1500},
                {3000, 2500}
        };

        System.out.println("Customer transactions");
        for(int i=0;i<transactions.length;i++){
            System.out.println("Customer " + (i+1) + " -Deposit " + transactions[i][0] + ", Withdrawal: " + transactions[i][1]);
        }
    }
}
