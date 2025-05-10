package Exceptions.com.example;

public class UncheckedExceptionExample {
    public static void accessArray(int index) {
        int[] numbers = {1, 2, 3};
        try {
            int value = numbers[index]; // This might throw ArrayIndexOutOfBoundsException
            System.out.println("Value at index " + index + ": " + value);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.err.println("Tried to access an invalid index in the array!");
        } finally {
            System.out.println("Finally block executed for array access.");
        }
        System.out.println("Array access attempt finished.");
    }

    public static void main(String[] args) {
        accessArray(5); // Trying to access an index that doesn't exist
    }
}
