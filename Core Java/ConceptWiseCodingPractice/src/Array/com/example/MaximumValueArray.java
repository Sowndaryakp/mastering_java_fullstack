package Array.com.example;

public class MaximumValueArray {
    public static void main(String[] args){
        int[] numbers = {34, 23, 49, 29, 12};
        int max = numbers[0];
        for(int i = 1; i< numbers.length; i++){
            if(numbers[i] > max){
                max = numbers[i];
            }
        }
        System.out.println("Max: " + max);
    }
}
