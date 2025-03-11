// SYNTAX:
// // Immutable String (String class)
// String s1 = "Hello";
// s1 = s1 + " Java"; // Creates a new object
// System.out.println(s1);

// // Mutable String (StringBuilder) (Faster) (not thread safe) (Single threaded apps)
// StringBuilder sb = new StringBuilder("Hello");
// sb.append(" Java"); // Modifies the same object
// System.out.println(sb);

public class MutableVsImmutable2 {
    public static void main(String[] args) {
        String log = "Log: ";
        log += "User logged in. ";
        log += "User viewed dashboard.";
        System.out.println("Using String: " + log);
    
        StringBuilder logBuilder = new StringBuilder("Log: ");
        logBuilder.append("user logged in.");
        logBuilder.append("User viewed dashboard.");
        System.out.println("Using StringBuilder: " + logBuilder);

    }
}
