class FibonacciSeries4{
    static void fibonacci(int n){
        int a = 0, b = 1;
        System.out.print(a + " " + b + " ");
        for(int i =2; i<n;i++){
            int next  = a + b;
            System.out.print(next + " ");
            a  = b;
            b = next;
        }
    }

    public static void main(String[] args){
        int n = 10;
        fibonacci(n);
    }
}