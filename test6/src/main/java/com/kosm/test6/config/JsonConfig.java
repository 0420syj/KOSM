package com.kosm.test6.config;


import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JsonConfig {
    @Qualifier(value="Object")
    @Bean
    public JSONObject ObecjtType()
    {
     return  new JSONObject();
    }

}