// Syntax:
// Using Wrapper Class for Integer
// int num = 10;
// Integer obj = Integer.valueOf(num);  // Boxing (Manual Conversion to Wrapper Class)
// int newNum = obj.intValue();        // Unboxing (Manual Conversion to Primitive)

import java.util.ArrayList;

public class WrapperClassExample8 {
    public static void main(String[] args) {
        ArrayList<Integer> employeeAges = new ArrayList<>();

        employeeAges.add(23);
        employeeAges.add(26);
        employeeAges.add(25);

        for(Integer age: employeeAges){
            System.out.println("EMployee Age: "+ age);
        }
    }
}
