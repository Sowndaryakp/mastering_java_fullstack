package Interfaces.com.example;

interface Payment{
    void processPayment(double amount);
}

class CreditCard implements Payment{
    public void processPayment(double amount){
        System.out.println("Processing credit card payment of: "+ amount);
    }
}
public class InterfaceExample {
    public static void main(String[] args){
        Payment p = new CreditCard();

        p.processPayment(2000);

    }
}
