class NumberIsPrime1{
    public static boolean isPrime(int num){
        if(num<=1) return false;
        for(int i = 2; i*i<=num;i++){
            if(num % i == 0) return false;
        }
        return true;
    }
    public static void main(String[] args){
       int num = 31;
       System.out.println(num + " is prime: "+ isPrime(num));
    }
}