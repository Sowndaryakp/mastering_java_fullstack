// Syntax
// class Animal {
//     void sound() {
//         System.out.println("Animal makes a sound");
//     }
// }

// class Dog extends Animal {
//     @Override
//     void sound() {
//         System.out.println("Dog barks");
//     }
// }

// public class TestDowncasting {
//     public static void main(String[] args) {
//         Animal animal = new Dog();  // Upcasting
//         Dog dog = (Dog) animal;  // Downcasting
//         dog.sound();  // Calls Dog's specific method
//     }
// }

class Payment7{
    void processPayment(){
        System.out.println("Processing payment...");
    }
}

class CreditCardPayment7 extends Payment7{
    void processPayment(){
        System.out.println("Processing payment through Credit Card");
    }
}

class DebitCardPayment7 extends Payment7{
    void processPayment(){
        System.out.println("Processing payment through Debit Card");
    }
}

public class UpcastingAndDowncasting7 {
    public static void main(String[] args) {
        Payment7 payment = new CreditCardPayment7(); //Upcasting
        payment.processPayment();  // Calls CreditCardPayment's method (runtime polymorphism)

        CreditCardPayment7 cardPayment = (CreditCardPayment7) payment;
        cardPayment.processPayment();  // Calls CreditCardPayment's method
     }
}
