class Human{
    private int age;
    private String name;

    public int getAge(){
        return age;
    }
    // public void setAge(int a){
    //     age = a;
    // } 
    //or
    public void setAge(int age){
        this.age = age;
    }

    public String getName(){
        return name;
    }
    // public void setName(String n){
    //     name = n;
    // }
    //or
    public void setName(String name){
        this.name = name;
    }

}
public class EncapsulationConcepts {
    public static void main(String[] args) {
        Human obj = new Human();
        obj.setName("Sow");
        obj.setAge(22);

        System.out.println(obj.getName() + " : " + obj.getAge());
    }
}
