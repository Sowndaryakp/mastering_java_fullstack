package Exceptions.com.example;

public class CheckedExceptionExapmle {
    public static void taskThatMightBeInterrupted() throws InterruptedException {
        System.out.println("Starting a task...");
        // Simulate a task that takes some time
        Thread.sleep(1000); // This can throw InterruptedException
        System.out.println("Task completed.");
    }

    public static void main(String[] args) {
        try {
            taskThatMightBeInterrupted();
        } catch (InterruptedException e) {
            System.err.println("Task was interrupted!");
            // Optionally, you might want to reset the interrupted status
            Thread.currentThread().interrupt();
        } finally {
            System.out.println("Finally block executed.");
        }
        System.out.println("End of program.");
    }
}
