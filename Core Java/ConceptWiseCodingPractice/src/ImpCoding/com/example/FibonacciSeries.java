package ImpCoding.com.example;

public class FibonacciSeries {
    public static void fibonacci(int n){
        int a=0, b=1;
        System.out.print("a: " + a + " b: " + b);
        for(int i=2; i<n; i++){
            int next = a+b;
            System.out.print(" " +next);
            a = b;
            b = next;
        }
    }
    public static void main(String[] args){
        int num = 10;
        fibonacci(num);
    }
}
