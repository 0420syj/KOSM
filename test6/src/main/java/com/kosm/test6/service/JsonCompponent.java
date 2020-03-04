package com.kosm.test6.service;
import java.util.Random;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.context.annotation.Configuration;


@Configuration
public class JsonCompponent implements Cloneable{
private JSONObject jsonObeject=new JSONObject();
private JSONArray jsonArrayList=new JSONArray();
        public JSONObject deepclone() throws CloneNotSupportedException {
                return (JSONObject)jsonObeject.clone();
        }
        public void newinit(){
                jsonArrayList=new JSONArray();
        }
        public void put(String A,String B)
        {
         jsonObeject.put(A,B); 
        }
        public int Size()
        {
         return jsonArrayList.size();
        }
        public String toJsonString()
        {
         return jsonObeject.toJSONString();
        }
        public void add(JSONObject jsonObject)
        {
          jsonArrayList.add(jsonObject);
        }
        public String ArraytoJsonString()
        {
         return jsonArrayList.toJSONString();
        }

}