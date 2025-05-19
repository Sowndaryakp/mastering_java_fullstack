package ImpCoding.com.example;

public class ReverseInteger {
    public static int reverse(int num){
        int rev = 0;
        while(num != 0){
            int digit = num % 10;
            rev = rev * 10 + digit;
            num /=10;
        }
        return rev;
    }
    public static void main(String[] args){
        int num = 1234;
        System.out.println("Reverse Integer: "+ reverse(num));
    }

}
