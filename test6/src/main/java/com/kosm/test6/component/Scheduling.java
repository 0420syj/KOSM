package com.kosm.test6.component;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduling {
    private int i=0;
    @Scheduled(fixedDelay = 20000) // 20초
    public void simplePrintln(){
        i++;
        System.out.println("Scheduleing : "+i);
    } 
}