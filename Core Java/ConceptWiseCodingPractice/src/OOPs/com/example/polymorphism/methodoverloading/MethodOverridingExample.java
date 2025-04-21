package OOPs.com.example.polymorphism.methodoverloading;

class Account{
    void withdraw(double amount){
        System.out.println("Withdraw processing from generic account $" + amount);
    }
}

class SavingsAccount extends Account{
    @Override
    void withdraw(double amount){
        System.out.println("Withdraw processing from savings account $" + amount);
    }
}

class CurrentAccount extends  Account{
    @Override
    void withdraw(double amount){
        System.out.println("Withdraw processing from current account $" + amount);
    }
}
public class MethodOverridingExample {
    public static void main(String[] args){
        Account savingsAccount = new SavingsAccount();
        Account currentAccount = new CurrentAccount();
        savingsAccount.withdraw(4000);
        currentAccount.withdraw(3000);

    }
}
