package com.example.testing;

public class Calculator {
    public int add(int i, int j){
        return i+j;
    }

    CalculatorService service;

    public Calculator(CalculatorService service){
        this.service = service;
    }
    public int perform(int i, int j){
        return service.add(i, j)*i;
//        return (i+j)*i; //own stub
    }
}
