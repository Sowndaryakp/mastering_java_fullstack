package OOPs.com.example.inheritance;
class CurrentAccount{
    double balance;

    void showBalance(){
        System.out.println("Current Balance is : "+balance);
    }
}

class SavingsAccount extends CurrentAccount{
    void addInterest(){
        balance += balance * 0.5;
        System.out.println("Interest added : "+ balance);
    }
}
public class InheritanceExample {
    public static void main(String[] args){
        SavingsAccount sa = new SavingsAccount();
        sa.showBalance();
        sa.addInterest();
    }
}
