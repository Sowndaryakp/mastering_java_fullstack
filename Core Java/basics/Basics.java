public class Basics
{
    public static void main(String args[])
    {
        // System.out.println("Hello");

        // //Variables
        // System.out.println(8+1);
        // System.out.print(6+1);

        // //Data Types - Primitive
        // byte(1 byte), short(2), int(4), long(8), float(4), double(8)
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
        //implicit
        // byte b =127;
        // int n = b;

        //explicite
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
        // //Arithmetic operator(+,-,*,/,%)
        // int num1 = 2;
        // int num2 = 5;

        // int result = num1 + num2;
        // int result = num1 - num2;
        // int result = num1 * num2;
        // int result = num1 / num2;
        // int result = num1 % num2;
        // System.out.println(result);
        
        // // Unary operator(++, --)
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

        // //Assignment operator(=,+=,-=,*=,/=,%=)
        // int num1 = 2;
        // num1 += 1;
        // num1 -= 1;
        // num1 *= 1;
        // num1 /= 1;
        // num1 %= 1;
        // System.out.println(num1);

        // //Relational operator(<,>,<=,>=,==,!=)
        // int num1 = 6;
        // int num2 = 2;
        // boolean result = num1 < num2;
        // boolean result = num1 > num2;
        // boolean result = num1 <= num2;
        // boolean result = num1 >= num2;
        // boolean result = num1 == num2;
        // boolean result = num1 != num2;
        // System.out.println(result);


        // //Logical operator(&&,||,!)
        // int x = 2;
        // int y = 5;
        // int a = 5;
        // int b = 6;
        // boolean result = x < y && a < b;
        // boolean result = x > y && a < b;
        //  boolean result = x < y || a < b;
        // boolean result = x > y || a < b;
        // System.out.println(result);
        // System.out.println(!result);

        // //Bitwise operator


        // //Shift operator


        // //Conditional Statement
        // //If else
        // int x=18;

        // if(x>10 && x<20)
        //     System.out.println("hello");
        // else
        //     System.out.println("bye");

        // int x=5;
        // int y=7;
        // int z=6;
        
        // if(x > y){
        //     System.out.println("X value is: " +x);
        // }else if(y>x){
        //     System.out.println("Y value is: " +y);
        // }else{
        //     System.out.println("Nothing");
        // }

        // if(x>y && x>z){
        //     System.out.println("X value is: " +x);
        // }else if(y>x && y>z){ // just use this condition also y>z avoid duplication
        //     System.out.println("Y value is: " +y);
        // }else if(z>x && z>y){
        //     System.out.println("Z value is: " +z);
        // }else{
        //     System.out.println("Nothing");
        // }

        //even or odd
        // int n = 5;

        // if(n%2==0){
        //     System.out.println("Even number");
        // }else{
        //     System.out.println("Odd number");
        // }

        // //Ternary operator
        
        // num1 = 10;
        // num2 = 20;

        // int res=(num1>num2) ? (num1+num2):(num1-num2);
        
        // int n = 4;
        // String result;

        // result = (n%2==0) ? "Even" : "Odd";
        // System.out.println(result);

        // //Switch statement
        // int n =6;

        // switch(n){
        //     case 1:
        //         System.out.println("Monday");
        //         break;
        //     case 2:
        //         System.out.println("Tuesday");
        //         break;
        //     case 3:
        //         System.out.println("Wednesday");
        //         break;
        //     case 4:
        //         System.out.println("Thursday");
        //         break;
        //     case 5:
        //         System.out.println("Friday");
        //         break;
        //     case 6:
        //         System.out.println("Saturday");
        //         break;
        //     case 7:
        //         System.out.println("Sunday");
        //         break;
        //     default:
        //         System.out.println("Enetr valid number");
        // }

        // //BREAK
        // for(int i=0;i<=8;i++){
        //     if(i == 4){
        //         break;
        //     }
        //     System.out.println(i);
        // }

        // //Continue
        // for(int i=0;i<=8;i++){
        //     if(i == 4){
        //         continue;
        //     }
        //     System.out.println(i);
        // }

        // //Loops
        // //While loop
        //  int i = 1; // if i give 5 it will not print anything, if you want to print go to do-while loop

        //  while(i<=4){
        //     System.out.println("Hi " +i);
        //     i++;
        //  }

        //Nested while loop (ex number of days is i, numbers of hours is j)
        //  int i = 1;

        //  while(i<=4){
        //     System.out.println("Hi " +i);

        //     int j=1;
        //     while(j<=3){
        //         System.out.println("Hello " +j);
        //         j++;
        //     }
        //     i++;
        //  }

        // // Do While loop
        //  int i = 1; //if i give 5 it can false also it will print at least one time

        //  do{
        //     System.out.println("Hi " +i);
        //     i++;
        //  }while(i<=4);

        // //For loop
        // for(int i=4;i>=1;i--){
        //     System.out.println("Hi "+ i);
        // }

        // Nested for Loop
        // for(int i=1;i<=5;i++){
        //     System.out.println("DAY "+ i);

        //     for(int j=1;j<=9;j++){
        //         System.out.println("    "+(j+8) + "-" +(j+9));
        //     }
        // }

        //learn differentiate btw loops
        // when we know the start and end go for loop & while loop
 
        // OOPS(Object oriented programming)
        // object - Properties and behaviours
        // class is act as a blueprint of an object
        //who creates object in java is JVM

        //Java is statically typed language means to specify for all the data and which data type

    	//JDK, JRE, JVM
    
    	// Methods
    	
        //Method Overloading

         //Stack And Heap


        
        
    }
    
}
