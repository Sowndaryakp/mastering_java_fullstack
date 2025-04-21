package OOPs.com.example.abstraction;

abstract class Atm{
    abstract void withdraw(double amount);
    abstract void checkBalance();
}

class HDFCBankAtm extends Atm{
    private double balance = 10000;

    @Override
    void withdraw(double amount){
        if(amount <= balance){
            balance -= amount;
            System.out.println("Withdrawn : " + amount);
        }else{
            System.out.println("Insufficient Balance");
        }
    }

    @Override
    void checkBalance(){
        System.out.println("Available Balance: " + balance);
    }
}
public class AbstractionExample {
    public static void main(String[] args){
        Atm atm = new HDFCBankAtm();
        atm.checkBalance();
        atm.withdraw(2000);
        atm.checkBalance();
    }
}
