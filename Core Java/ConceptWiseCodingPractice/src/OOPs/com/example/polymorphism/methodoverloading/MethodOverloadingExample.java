package OOPs.com.example.polymorphism.methodoverloading;
class Bank{
    void deposit(double balance){
        System.out.println("Deposited: ₹" +balance);
    }

    void deposit(double balance, String accNum){
        System.out.println("Deposited: ₹" +balance +"into account : " +accNum);
    }

    void deposit(double balance, String accNum, String branch){
        System.out.println("Deposited: ₹" +balance +"into account : " +accNum + "branch: " + branch);
    }
}
public class MethodOverloadingExample {
    public static void main(String[] args){
        Bank bank = new Bank();
        bank.deposit(4000);
        bank.deposit(3000, "23638TYB");
        bank.deposit(6000, "6759TO", "Bangalore");
    }
}
