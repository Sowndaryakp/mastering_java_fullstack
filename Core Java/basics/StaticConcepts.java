class Mobile{
    String brand;
    int price;
    static String name;

    public void display(){
        System.out.println(brand + " : " + price + " : " + name);
    }

    // //static method
    public static void show(Mobile obj){
        //below brand and price are non static so to solve that issue to do below like that
        System.out.println(obj.brand + " : " + obj.price + " : " + name);
    }

    // //static block
    static{
        name = "Phone";
        System.out.println(" in static block"); // it will call first with 1 time 
    }

    //constructor
    public Mobile(){
        brand = "";
        price = 200;
        System.out.println(" in constructor"); //it will call 2 times
    }

}
public class StaticConcepts {
    public static void main(String[] args) {
        //in the psvm why we use static it starting running application method, if im not giving static keyword 
        // i should create object but without having this how to create the object right. so thats why we used static
        Mobile obj1 = new Mobile();
        obj1.brand = "Apple";
        obj1.price = 1500;
        // Mobile.name = "SmartPhone"; // when we use static variable use the classname with dot call the variable name

        Mobile obj2 = new Mobile();
        obj2.brand = "Samsung";
        obj2.price = 1700;
        // Mobile.name = "Smart Phone";

        Mobile.name = "Phone";

        obj1.display();
        obj2.display();

        // calling static method directly without creating on object
        Mobile.show(obj1);

        // //Static Block
        // if not creaing object we can do like this below and in the psvm add throws ClassNotFoundException
        //when the class loaded come static immeditely then object instantiated
        // Class.forName("Mobile");

        
    }
}
