package com.kosm.test6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import com.kosm.test6.service.JsonCompponent;
import com.kosm.test6.payload.Crawling;

import org.json.simple.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;
@RestController
@RequestMapping("/api/auth")


public class WebCrawler {
    @Autowired
    JsonCompponent JsonObject;
    
    @PostMapping("/webcrawler")
    public  ResponseEntity<?> sayHello(@Valid @RequestBody Crawling CrawlRequest) throws CloneNotSupportedException {
 /*
            Document 클래스 : 연결해서 얻어온 HTML 전체 문서
            Element 클래스  : Documnet의 HTML 요소
            Elements 클래스 : Element가 모인 자료형
        */       
        //String url = "https://www.w3schools.com";
        String url =CrawlRequest.getUrl();

        String title = "div#row tbody tr th strong";
        String summary = "div#row tbody tr td p";
        String date = "div#row tbody tr td span[data-testid]";
        String score = "div#row tbody tr td[nowrap=nowrap]";
        String example="";
        Document doc = null;            
        try {
            doc = Jsoup.connect(url).get(); // -- 1. get방식의 URL에 연결해서 가져온 값을 doc에 담는다.
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }        
        Elements titles = doc.select(title); // -- 2. doc에서 selector의 내용을 가져와 Elemntes 클래스에 담는다.
        Elements summaries = doc.select(summary);
        Elements dates = doc.select(date);
        Elements scores = doc.select(score);
        
        for(int i=0;i<titles.size();i++) {
             // -- 3. Elemntes 길이만큼 반복한다.
            JsonObject.put("title",titles.get(i).text()); 
            JsonObject.put("date",dates.get(i).text()); 
            JsonObject.put("summary",summaries.get(i).text()); 
            JsonObject.put("score",scores.get(i).text()); 
            JsonObject.add(JsonObject.deepclone());
           // System.out.println(JsonObject.toJsonString());
        }
        String jsonInfo = JsonObject.ArraytoJsonString();
      System.out.println(JsonObject.Size());
      JsonObject.newinit();
    //    System.out.println(i);
        return new ResponseEntity<String>(jsonInfo, HttpStatus.OK);
      // return ResponseEntity.ok().body(new ApiResponse(true,titles.text()));

    }
    @PostMapping("/detailcrawler")
    public  ResponseEntity<?> Hello(@Valid @RequestBody Crawling CrawlRequest) throws CloneNotSupportedException {
      JsonObject.newinit();
 /*
            Document 클래스 : 연결해서 얻어온 HTML 전체 문서
            Element 클래스  : Documnet의 HTML 요소
            Elements 클래스 : Element가 모인 자료형
        */       
        //String url = "https://www.w3schools.com";
        String url =CrawlRequest.getUrl();

        String title = "div p[data-testid=vuln-description]";
        String type="div.col-lg-6 input[value]";
        String date = "div#row tbody tr td span[data-testid]";
        String link="tbody > tr > td > [href]";
        String info="div.bs-callout.bs-callout-info";
        String score="span.severityDetail";
        Document doc = null;            
        try {
            doc = Jsoup.connect(url).get(); // -- 1. get방식의 URL에 연결해서 가져온 값을 doc에 담는다.
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }        
        Elements titles = doc.select(title); // -- 2. doc에서 selector의 내용을 가져와 Elemntes 클래스에 담는다.
        Elements types = doc.select(type);
        Elements links = doc.select(link);
        Elements infos = doc.select(info);
        Elements scores = doc.select(score);
        ////
        String A="";
        String B="";
        String C="";
        String D="";
        //
        for(int i=0;i<titles.size();i++) 
        {  A+=(titles.get(i).text()+',');}
     for(int i=0;i<links.size();i++)
        {  B+=(links.get(i).text()+','); }
     for(int i=0;i<scores.size();i++)    
        {  C+=(scores.get(i).text()+',');}
     for(int i=0;i<infos.size();i++)        
       {   D+=(infos.get(i).text()+',');}
       JsonObject.put("type",types.toString()); 
      System.out.println(A);
       JsonObject.put("title",A);
       JsonObject.put("links",B);
       JsonObject.put("scores",C);
       JsonObject.put("infos",D);
       JsonObject.put("date",date);
       JsonObject.add(JsonObject.deepclone());
        String jsonInfo = JsonObject.ArraytoJsonString();
      System.out.println(JsonObject.Size());
      JsonObject.newinit();
    //    System.out.println(i);
        return new ResponseEntity<String>(jsonInfo, HttpStatus.OK);
      // return ResponseEntity.ok().body(new ApiResponse(true,titles.text()));

    }

}