class ReverseInteger3{
    public static int reverse(int num){
        int rev = 0;
        while(num != 0){
            rev = rev * 10 + num % 10;
            num /= 10;
        }
        return rev;
    }
    public static void main(String[] args){
        int num = 1234;
        System.out.println("Reversed : "+reverse(num));
    }
}