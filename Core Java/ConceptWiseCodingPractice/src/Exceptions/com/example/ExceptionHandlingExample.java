package Exceptions.com.example;
// Banking Applications (e.g., Handling invalid transactions)
class Bank{
    private double balance = 5000;
    void withdraw(double amount){
        try{
            if(amount > balance){
                throw new ArithmeticException("Insufficient Balance");
            }
            balance -= amount;
            System.out.println("Withdrawal Successfully! Remaing Balance: "+ balance);
        }catch(ArithmeticException e){
            System.out.println("Error: "+e.getMessage());
        }finally{
            System.out.println("Transaction completed");
        }

    }
}
public class ExceptionHandlingExample {
    public static void main(String[] args){
        Bank bank = new Bank();

        bank.withdraw(3000);
        bank.withdraw(6000);
    }
}
