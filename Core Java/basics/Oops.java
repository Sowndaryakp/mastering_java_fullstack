class Calculator{
    public int add(int n1, int n2){
        // System.out.println("hell");
        // return 0;

        int r = n1 + n2;
        return r;
    }
}

public class Oops {
    public static void main(String args[]){
        // Calculator calc = new Calculator();
        // int result = calc.add();
        // System.out.println(result);

        int num1 = 2;
        int num2 = 6;

        Calculator calc = new Calculator();
        int result = calc.add(num1, num2);
        System.out.println(result);
    }
}
