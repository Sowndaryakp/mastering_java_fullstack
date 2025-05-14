package AbstractClass.com.example;

abstract class Loan{
    abstract void interestRate();

    void loanApproval(){
        System.out.println("Loan approved as per bank policy");
    }
}

class HomeLoan extends Loan {
    @Override
    void interestRate() {
        System.out.println("Home Loan interest : 7% per anum");
    }
}

class PersonalLoan extends Loan {
    @Override
    void interestRate(){
        System.out.println("Personal Loan interest rate : 14% per anum");
    }
}

public class AbstractClass {
    public static void main(String[] args){
        Loan personalLoan = new PersonalLoan();
        Loan homeLoan = new HomeLoan();

        personalLoan.interestRate();
        personalLoan.loanApproval();

        homeLoan.interestRate();
        homeLoan.loanApproval();
    }

}
