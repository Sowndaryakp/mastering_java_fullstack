class Computer{
    public void playMusic(){
        System.out.println("Music Playing...");
    }
    public String getMePen(int cost){
        if(cost >= 10)
            return "Pen";
        else
            return "Nothing";
    }
}

public class Methods { 
    public static void main(String[] args){

        Computer comp = new Computer();

        comp.playMusic();
        // comp.getMePen(2); //if give like will not give anything so below line to do
        String str = comp.getMePen(12);
        System.out.println(str);
    }
}
