package ImpCoding.com.example;

public class RemoveDuplicates {
    public static void main(String[] args){
        String str = "Sowndarya";
        String result = "";

        for(int i=0; i<str.length();i++){
            char current = str.charAt(i);
            boolean isDuplicate = false;

            for(int j=0; j<i; j++){
                if(str.charAt(j) == current){
                    isDuplicate = true;
                    break;
                }
            }
            if(!isDuplicate){
                result += current;
            }
        }

        System.out.println("After removing duplicates: "+result);
    }
}
