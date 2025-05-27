package Collections.com.example;

import java.util.ArrayList;
import java.util.List;

class BankAccount{
    private String accountHolder;
    private List<String> transactions;

    public BankAccount(String accountHolder){
        this.accountHolder = accountHolder;
        this.transactions = new ArrayList<>();
    }

    public void addTransaction(String transaction){
        transactions.add(transaction);
        System.out.println("Transaction Added: " + transaction);
    }

    public void displayTransactions(){
        System.out.println("Transactions for " + accountHolder + ": " +transactions);
    }
}

class BankApplication{
    public static void main(String[] args){
        BankAccount customer1 = new BankAccount("Sowndarya");

        customer1.addTransaction("Deposited ₹5000");
        customer1.addTransaction("Withdrawn ₹2000");
        customer1.addTransaction("Transferred ₹3000");

        customer1.displayTransactions();

    }
}