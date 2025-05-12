package Collections.com.example;

import java.util.ArrayList;
import java.util.List;

class BankAccount{
    private String accountHolder;
    private List<String> transactions;

    //constructor
    public BankAccount(String accountHolder){
        this.accountHolder = accountHolder;
        this.transactions = new ArrayList<>();
    }

    public void addTransaction(String transaction){
        transactions.add(transaction);
        System.out.println("Transaction Added: " +transaction);
    }

    // Method to display all transactions
    public void displayTransactions() {
        System.out.println("Transactions for " + accountHolder + ": " + transactions);
    }

}

public class CollectionExample {
    public static void main(String[] args){
        //Creating a bank account for a customer
        BankAccount customer1 = new BankAccount("Sowndarya");

        customer1.addTransaction("Deposited ₹5000 ");
        customer1.addTransaction("Withdrawn ₹2000");
        customer1.addTransaction("Transferred ₹3000");

        // Display all transactions
        customer1.displayTransactions();
    }
}
