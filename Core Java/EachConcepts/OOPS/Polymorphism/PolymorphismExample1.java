// SYNTAX:
// Method Overloading (Compile-time Polymorphism)

// class MathUtils {
//     int add(int a, int b) {
//         return a + b;
//     }

//     double add(double a, double b) { // Overloaded method
//         return a + b;
//     }
// }

// Method Overriding (Runtime Polymorphism)

// class Parent {
//     void show() {
//         System.out.println("Parent class method");
//     }
// }

// class Child extends Parent {
//     @Override
//     void show() {
//         System.out.println("Child class method");
//     }
// }

class Payment{
    void pay(double amount){
        System.out.println("Payment of $" + amount + " processed.");
    }
}

class CreditCardPayment extends Payment{
    @Override
    void pay(double amount){
        System.out.println("Paid $" + amount + " using credit card.");
    }
}

class DebitCardPayment extends Payment{
    @Override
    void pay(double amount){
        System.out.println("Paid $" + amount + " using debit card.");
    }
}

public class PolymorphismExample1 {
    public static void main(String[] args) {
        Payment payment;

        payment = new CreditCardPayment();
        payment.pay(1000);

        payment = new DebitCardPayment();
        payment.pay(2000);
    }
    
}
