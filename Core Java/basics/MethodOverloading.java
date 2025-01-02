 class Calculator{
    public int add(int n1, int n2){
        return n1 + n2;
    }
    public int add(int n1, int n2, int n3){
        return n1 + n2 + n3;
    }
}
public class MethodOverloading {
    public static void main(String args[]){
        Calculator calc = new Calculator();
        int result = calc.add(2,3, 9);
        System.out.println(result);
    }
    
}
