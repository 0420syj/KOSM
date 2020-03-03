package com.kosm.test6.service;
import java.util.Random;

import org.json.simple.JSONObject;
import org.springframework.context.annotation.Configuration;


@Configuration
public class JsonCompponent{
private JSONObject jsonObeject=new JSONObject();

        public void put(String A,String B)
        {
         jsonObeject.put(A,B); 
        }
        public String toJsonString()
        {
         return jsonObeject.toJSONString();
        }
        
}