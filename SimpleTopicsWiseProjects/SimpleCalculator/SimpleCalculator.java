import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);

        char choice = 'y';

        while(choice == 'y' || choice == 'Y'){
            System.out.println("Enter first number: ");
            double num1 = scanner.nextDouble();

            System.out.println("Enter second number: ");
            double num2 = scanner.nextDouble();

            System.out.println("Choose operation (+, -, *, /): ");
            char operator = scanner.next().charAt(0);

            double result = 0;
            boolean valid = true;

            if(operator == '+'){
                result = num1 + num2;
            }else if(operator == '-'){
                result = num1 - num2;
            }else if(operator == '*'){
                result = num1 * num2;
            }else if(operator == '/'){
                if(num2 != 0){
                    result = num1 / num2;
                }else{
                    System.out.println("Errod: Cannot divide by zero");
                    valid = false;
                }
            }else{
                System.out.println("Invalid Operator");
                valid = false;
            }

            if(valid){
                System.out.println("Result: "+result);
            }

            System.out.println("Do you want to continue? (y/n): ");
            choice = scanner.next().charAt(0);
        }

        System.out.println("Calculator exited.");
        scanner.close();
    }
}
