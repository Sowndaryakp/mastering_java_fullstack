package ImpCoding.com.example;

public class VowelsConsonantsCount {
    public static void main(String[] args){
        String str = "Sowndarya";
        int vowels = 0, consonants = 0;

        for(int i = 0; i<str.length(); i++){
            char ch = Character.toLowerCase(str.charAt(i));
            if(ch >= 'a' && ch <= 'z'){
                if(ch=='a' || ch=='e' || ch=='i' || ch=='o' || ch=='u'){
                    vowels++;
                }else{
                    consonants++;
                }
            }
        }
        System.out.println("Vowels count : "+vowels);
        System.out.println("Consonants count: "+consonants);
    }
}
