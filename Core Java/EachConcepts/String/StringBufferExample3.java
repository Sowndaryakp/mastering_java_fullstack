// SYNTAX:
// // Using StringBuffer (Thread-Safe) (slower) (multi threaded apps)
// StringBuffer sbf = new StringBuffer("Hello");
// sbf.append(" Java"); 
// System.out.println(sbf); // Output: Hello Java

// (Logging System - Why StringBuffer is Better for Multi-threading?)
// Scenario: A company has multiple threads logging messages. Using StringBuffer ensures data consistency.

class Logger{
    static StringBuffer log = new StringBuffer("Log: \n");

    // Synchronized method to prevent data corruption in multi-threading
    synchronized void addLog(String message){
        log.append(message).append("\n");
    }
}

public class StringBufferExample3 {
    public static void main(String[] args){
        Logger logger = new Logger();

        // Simulating multi-threading using two threads
        Thread t1 = new Thread(() -> logger.addLog("User logged in."));
        Thread t2 = new Thread(() -> logger.addLog("User Updated profile."));

        t1.start();
        t2.start();

        try{
            Thread.sleep(100);
        }catch (InterruptedException e) {

        }
        System.out.println(logger.log);
    }
}
