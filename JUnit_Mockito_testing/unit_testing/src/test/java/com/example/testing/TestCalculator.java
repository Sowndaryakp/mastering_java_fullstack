package com.example.testing;

import org.aspectj.lang.annotation.Before;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class TestCalculator {
//    Calculator c = new Calculator();
    @Test
    public void testAdd(){
        assertEquals(5,c.add(2,3));
    }

    //own stub using that time will pass
//    @Test
//    public void testPerform1(){
//        assertEquals(10,c.perform(2,3));
//    }
    //===========================

    Calculator c = null;
    //one way -> create fake object of some other class dependent
//    CalculatorService service = new CalculatorService() {
//        @Override
//        public int add(int i, int j) {
//            return 0;
//        }
//    };

    //second way -> using mockito create mock objects
    CalculatorService service = mock(CalculatorService.class);
//or

//    @Mock
//    CalculatorService service;
//
//    @Rule
//    public MockitoRule rule = MockitoJUnit.rule();

   @BeforeEach
   public void setUp(){
       c = new Calculator(service);
   }

    @Test
    public void testPerform(){
       when(service.add(2,3)).thenReturn(5);
        assertEquals(10,c.perform(2,3));
        verify(service).add(2,3);
    }




}
