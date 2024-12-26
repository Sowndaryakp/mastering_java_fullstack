public class Basics
{
    public static void main(String args[])
    {
        // System.out.println("Hello");

        // //Variables
        // System.out.println(8+1);
        // System.out.print(6+1);

        // //Data Types - Primitiv
        // byte b = 127; //127 is last value
        // System.out.println(b);

        // short b = 558;
        // System.out.println(b);
        
        // int num1 = 5;
        // int num2 = 1;
        // int result = num1 + num2;
        // System.out.println(result);

        // long l = 12l;
        // System.out.println(l);

        // float f = 7.9f;
        // System.out.println(f);

        // double d = 78.9;
        // System.out.println(d);

        // char c ='s';
        // System.out.println(c);

        // boolean b = true;
        // System.out.println(b);

        // //Literals
        // int num1 = 0b101; //binary
        // int num1 = 0x7E; //hexa
        // System.out.println(num1);

        // double num1 = 12e10;
        // System.out.println(num1);

        // char c = 'a';
        // c++;
        // System.out.println(c);

        // //Type Conversion(implicit) and Casting(explicite)
        // byte b =127;
        // int n = b;

        // int a = 12;
        // byte b = (byte) a;

        // float f = 7.9f;
        // int n = (int) f;
        // System.out.println(n);

        //type promotion
        // byte b1= 3;
        // byte b2=6;
        // int result = b1*b2;
        // System.out.println(result);

        // //Operators
        // //Arithmetic operator
        // int num1 = 2;
        // int num2 = 5;

        // int result = num1 + num2;
        // int result = num1 - num2;
        // int result = num1 * num2;
        // int result = num1 / num2;
        // int result = num1 % num2;
        // System.out.println(result);
        
        // // Unary operator
        // int num = 2;
        // num++; // 3
        // ++num; //3
        // num--; //2
        // --num; //2
        // System.out.println(num);

        // int result = num++; //fetch the value and increment //2
        // int result = ++num; //increment and fetch the value //3
        // int result = num--; //fetch the value and increment //2
        // int result = --num; //increment and fetch the value //3
        // System.out.println(result);

        // //Assignment operator
        // int num1 = 2;
        // num1 += 1;
        // num1 -= 1;
        // num1 *= 1;
        // num1 /= 1;
        // num1 %= 1;
        // System.out.println(num1);

        // //Relational operator
        // int num1 = 6;
        // int num2 = 2;
        // boolean result = num1 < num2;
        // boolean result = num1 > num2;
        // boolean result = num1 <= num2;
        // boolean result = num1 >= num2;
        // boolean result = num1 == num2;
        // boolean result = num1 != num2;
        // System.out.println(result);


        // //Logical operator 
        int x = 2;
        int y = 5;
        int a = 5;
        int b = 6;
        // boolean result = x < y && a < b;
        // boolean result = x > y && a < b;
        //  boolean result = x < y || a < b;
        boolean result = x > y || a < b;
        System.out.println(result);
        // System.out.println(!result);

        // //Ternary operator

        // //Bitwise operator

        // //Shift operator
    }
    
}