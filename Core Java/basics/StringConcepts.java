public class StringConcepts {
    public static void main(String[] args){
        // String name = new String("Sowndarya"); //or
        // String name = "Sowndarya";
        // System.out.println("Hello " + name);

        // System.out.println(name.charAt(2));
        // System.out.println(name.length());
        // System.out.println(name.concat(" Shetty"));
        // System.out.println(name.equals("Sowndarya"));
        // System.out.println(name.hashCode());

        // //String once we create object we cant change. object will store in the heap memory
        // Mutable string - change, if you change use string builder or string buffer
        // Immutable string - unchange


        // //String Buffer
        StringBuffer sb = new StringBuffer("Sowndarya");
        sb.append(" Shetty");

        // sb.deleteCharAt(0);
        // sb.insert(0, "Java ");
        // System.out.println(sb.capacity());

        // System.out.println( sb.toString());
        sb.setLength(30);

        System.out.println(sb);

        //string buffer and string builder same but one changes is thread safe.
        //String buffer - thread safe, string builder - not
    }

}
