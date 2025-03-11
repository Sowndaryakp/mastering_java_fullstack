// equals() – Compares two objects for logical equality.

// toString() – Returns a string representation of the object (useful for debugging).

// hashCode() – Generates a unique integer value for the object, used in hash-based collections like HashMap.
// data comparison, logging, and hash-based collections (e.g., HashSet, HashMap, Hashtable).

// Syntax:
// class Person {
//     String name;
//     int age;

//     Person(String name, int age) {
//         this.name = name;
//         this.age = age;
//     }

//     @Override
//     public boolean equals(Object obj) {
//         if (this == obj) return true;
//         if (obj == null || getClass() != obj.getClass()) return false;
//         Person person = (Person) obj;
//         return age == person.age && name.equals(person.name);
//     }

//     @Override
//     public int hashCode() {
//         return Objects.hash(name, age);
//     }

//     @Override
//     public String toString() {
//         return "Person{name='" + name + "', age=" + age + "}";
//     }
// }

import java.util.Objects;

class Employee {
    String name;
    int id;

    Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Employee employee = (Employee) obj;
        return id == employee.id && name.equals(employee.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, id);
    }

    @Override
    public String toString() {
        return "Employee{name='" + name + "', id=" + id + "}";
    }
}


public class EqualsToStringHashcode1 {
    public static void main(String[] args) {
        Employee emp1 = new Employee("John Doe", 101);
        Employee emp2 = new Employee("John Doe", 101);
        
        // Comparing employees
        System.out.println("Are employees equal? " + emp1.equals(emp2));  // Uses equals()
        
        // Logging employee details
        System.out.println(emp1.toString());  // Uses toString()
        
        // HashCode example for HashMap
        System.out.println("Employee hashcode: " + emp1.hashCode());  // Uses hashCode()
    }
}
